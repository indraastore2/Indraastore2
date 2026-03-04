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

const firebaseConfig = {
    databaseURL: "https://indraa-store-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

function initAdminPanel() {
    const loggedInUser = localStorage.getItem('userLogin'); 
    const trigger = document.getElementById('adminTriggerContainer');
    
    if (loggedInUser === 'ADMIN' && trigger) {
        trigger.style.display = 'flex'; 
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

function uploadAccount() {
    try {
        const name = document.getElementById('accName').value.trim();
        const level = document.getElementById('accLevel').value.trim() || "Max";
        const fruit = document.getElementById('accFruit').value.trim() || "-";
        const sword = document.getElementById('accSword').value.trim() || "-";
        const price = document.getElementById('accPrice').value.trim();
        const image = document.getElementById('accImage').value.trim();
        
        // Ambil input baru
        const gamepass = document.getElementById('accGamepass').value.trim() || "-";
        const perm = document.getElementById('accPerm').value.trim() || "-";

        if (!name || !price || !image) {
            alert("❌ Harap isi Nama, Harga, dan Link Foto!");
            return;
        }

        const btn = document.querySelector("#adminModal .btn-primary") || document.querySelector("#adminPanel .btn-primary");
        if (btn) {
            btn.innerText = "⏳ Memproses...";
            btn.disabled = true;
        }

        const newPostRef = database.ref('marketAccounts').push();
        newPostRef.set({
            id: "BF-" + Math.floor(1000 + Math.random() * 9000),
            name, level, fruit, sword, price, image,
            gamepass, perm, // Simpan ke database
            createdAt: Date.now()
        })
        .then(() => {
            alert("✅ Sukses! Akun berhasil diposting.");
            closeAdminModal();
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
                            
                            ${acc.gamepass && acc.gamepass !== "-" ? `
                                <span class="spec-item" style="border: 1px solid #fbbf24; color: #fbbf24;">🎫 ${acc.gamepass}</span>
                            ` : ''}
                            
                            ${acc.perm && acc.perm !== "-" ? `
                                <span class="spec-item" style="border: 1px solid #f472b6; color: #f472b6;">💎 ${acc.perm}</span>
                            ` : ''}
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

// ===========================
// FIX: SINKRONISASI KERANJANG
// ===========================

function addToCart(id, name, price) {
    let currentCart = JSON.parse(localStorage.getItem('indraa_cart')) || [];

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
        quantity: 1,       
        tag: "Ready Stock",
        cat: "Akun"
    };

    currentCart.push(itemBaru);
    localStorage.setItem('indraa_cart', JSON.stringify(currentCart));
    
    alert(`✅ ${name} berhasil masuk ke keranjang!`);
    
    if (typeof updateCartBadge === "function") updateCartBadge();
    if (typeof renderCart === "function") renderCart();
    if (typeof openCart === "function") openCart(); 
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

document.addEventListener('DOMContentLoaded', updateCartBadge);

window.onload = () => {
    initAdminPanel();
    loadMarketData();
};