// Fungsi untuk menampilkan kartu ke HTML
function displayAccounts() {
    const grid = document.getElementById('marketDisplay');
    if (!grid) return;

    grid.innerHTML = accounts.map(acc => `
        <div class="account-card">
            <div class="account-banner">
                <span class="status-badge">READY STOCK</span>
                <img src="${acc.image}" alt="thumb">
            </div>
            <div class="account-details">
                <div class="account-title">${acc.name}</div>
                <div class="specs-list">
                    <span class="spec-item">Lv ${acc.level}</span>
                    <span class="spec-item">${acc.fruit}</span>
                    <span class="spec-item">${acc.sword}</span>
                </div>
                <div class="price-row">
                    <div class="acc-price">${acc.price}</div>
                    <button class="btn-primary" onclick="sendWhatsApp('${acc.id}', '${acc.name}')" style="padding: 10px 20px;">Beli</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 1. KONFIGURASI FIREBASE
const firebaseConfig = {
    databaseURL: "https://indraa-store-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

// Inisialisasi aman: Cek apakah Firebase sudah jalan atau belum
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 2. TAMPILKAN PANEL ADMIN (Jika Login)
function initAdminPanel() {
    // Ambil status login
    const loggedInUser = localStorage.getItem('userLogin'); 
    const trigger = document.getElementById('adminTriggerContainer');
    
    // Pastikan ID 'adminTriggerContainer' ada di HTML
    if (loggedInUser === 'ADMIN' && trigger) {
        trigger.style.display = 'flex'; // Munculkan tombol jika admin
    }
}

function openAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'flex';
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

// 3. FUNGSI POSTING (DIPERBAIKI)
function uploadAccount() {
    try {
        const name = document.getElementById('accName').value.trim();
        const level = document.getElementById('accLevel').value.trim() || "Max";
        const fruit = document.getElementById('accFruit').value.trim() || "-";
        const sword = document.getElementById('accSword').value.trim() || "-";
        const price = document.getElementById('accPrice').value.trim();
        const image = document.getElementById('accImage').value.trim();

        if (!name || !price || !image) {
            alert("❌ Harap isi Nama, Harga, dan Link Foto!");
            return;
        }

        // CARA AMAN: Ambil tombol yang spesifik di dalam modal
        const btn = document.querySelector("#adminModal .btn-primary") || document.querySelector("#adminPanel .btn-primary");
        
        if (btn) {
            btn.innerText = "⏳ Memproses...";
            btn.disabled = true;
        }

        const newPostRef = database.ref('marketAccounts').push();
        newPostRef.set({
            id: "BF-" + Math.floor(1000 + Math.random() * 9000),
            name, level, fruit, sword, price, image,
            createdAt: Date.now()
        })
        .then(() => {
            alert("✅ Sukses! Akun berhasil diposting.");
            closeAdminModal(); // Tutup modal otomatis
            location.reload(); 
        })
        .catch((err) => {
            alert("❌ Gagal simpan: " + err.message);
            if (btn) {
                btn.innerText = "🚀 Posting Akun Sekarang";
                btn.disabled = false;
            }
        });

    } catch (error) {
        console.error("Error Detail:", error);
        alert("Terjadi kesalahan teknis. Cek Console (F12)");
    }
}

// 4. LOAD DATA (Tampil Realtime)
function loadMarketData() {
    const grid = document.getElementById('marketDisplay');
    const isAdmin = localStorage.getItem('userLogin') === 'ADMIN';

    database.ref('marketAccounts').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            grid.innerHTML = "<p style='color:var(--text-dim); text-align:center; width:100%;'>Stok sedang kosong.</p>";
            return;
        }

        let html = "";
        Object.keys(data).forEach(key => {
            const acc = data[key];
            html += `
                <div class="account-card">
                    <div class="account-banner">
                        <span class="status-badge">READY STOCK</span>
                        ${isAdmin ? `<button onclick="deleteAcc('${key}')" class="btn-delete">✕ Hapus</button>` : ''}
                        <img src="${acc.image}" onerror="this.src='https://via.placeholder.com/400x250?text=Gambar+Error'" alt="thumb">
                    </div>
                    <div class="account-details">
                        <div class="account-title">${acc.name}</div>
                        <div class="specs-list">
                            <span class="spec-item">Lv ${acc.level}</span>
                            <span class="spec-item">${acc.fruit}</span>
                            <span class="spec-item">${acc.sword}</span>
                        </div>
                        <div class="price-row">
                            <div class="acc-price">${acc.price}</div>
                            <button class="btn-primary" onclick="addToCart('${acc.id}', '${acc.name}', '${acc.price}')" style="padding: 10px 20px;">
                                🛒 + Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    });
}

function deleteAcc(key) {
    if (confirm("Hapus akun ini?")) database.ref('marketAccounts/' + key).remove();
}

// ==========================================
// FIX: SINKRONISASI KERANJANG INDRAA STORE
// ==========================================

function addToCart(id, name, price) {
    let currentCart = JSON.parse(localStorage.getItem('indraa_cart')) || [];

    // Cek duplikasi berdasarkan nama agar lebih akurat
    const isExist = currentCart.find(item => item.name === "[AKUN] " + name);
    if (isExist) {
        alert("⚠️ Akun ini sudah ada di keranjang!");
        return;
    }

    const numericPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0;

    const itemBaru = {
        id: id,
        name: "[AKUN] " + name,
        price: price,      
        val: numericPrice, 
        quantity: 1,       // WAJIB ADA agar tidak dikali nol
        tag: "Ready Stock",
        cat: "Akun"
    };

    currentCart.push(itemBaru);
    localStorage.setItem('indraa_cart', JSON.stringify(currentCart));
    
    alert(`✅ ${name} berhasil masuk ke keranjang!`);
    
    // Update tampilan badge angka jika fungsinya tersedia
    if (typeof updateCartBadge === "function") {
        updateCartBadge();
    } else if (typeof updateCartUI === "function") {
        updateCartUI();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    const data = JSON.parse(localStorage.getItem('indraa_cart')) || [];
    if (badge) {
        if (data.length > 0) {
            badge.innerText = data.length;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Pastikan angka keranjang muncul saat halaman dibuka
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Inisialisasi saat window load
window.onload = () => {
    initAdminPanel();
    loadMarketData();
};