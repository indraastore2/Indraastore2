// ==========================================
// DATA & STATE
// ==========================================
let isDiscountActive = localStorage.getItem('promoClaimedAt') !== null;
let cart = [];
let currentMainType = "Joki";
let isLoginMode = true;

const jokiData = [
    { name: "100 Level Sea 1", price: "Rp 5k", tag: "Best Seller", cat: "Level", val: 5000 },
    { name: "100 Level Sea 2", price: "Rp 10k", tag: "Best Seller", cat: "Level", val: 10000 },
    { name: "100 Level Sea 3", price: "Rp 15k", tag: "Best Seller", cat: "Level", val: 15000 },
    { name: "150 Mastery Melee/Sword", price: "Rp 3k", tag: "Mastery 0 - 300", cat: "Mastery", val: 3000 },
    { name: "100 Mastery Fruit/Gun", price: "Rp 5k", tag: "Mastery 0 - 300", cat: "Mastery", val: 5000 },
    { name: "150 Mastery Melee/Sword", price: "Rp 5k", tag: "Mastery 300 - 600", cat: "Mastery", val: 5000 },
    { name: "100 Mastery Fruit/Gun", price: "Rp 10k", tag: "Mastery 300 - 600", cat: "Mastery", val: 10000 },
    { name: "1-700", price: "Rp 10k", tag: "Khusus Sea 1", cat: "Paket Level Murah", val: 10000 },
    { name: "700-1500", price: "Rp 20k", tag: "Khusus Sea 2", cat: "Paket Level Murah", val: 20000 },
    { name: "1500-2800", price: "Rp 35k", tag: "Khusus Sea 3", cat: "Paket Level Murah", val: 35000 },
    { name: "1M Belly", price: "Rp 5k", tag: "Best Seller", cat: "Currency", val: 5000 },
    { name: "1K Fragment", price: "Rp 1k", tag: "Buah Buyer", cat: "Currency", val: 1000 },
    { name: "1K Fragment", price: "Rp 2k", tag: "Buah Penjoki", cat: "Currency", val: 2000 },
    { name: "100M Belly", price: "Rp 150k", tag: "Best Seller", cat: "Currency", val: 150000 },
    { name: "100K Fragment", price: "Rp 180k", tag: "Best Seller", cat: "Currency", val: 180000 },
    { name: "1000 Exp Instinct ", price: "Rp 15k", tag: "Best Seller", cat: "Instinct", val: 15000 },
    { name: "Instinct V2 ", price: "Rp 10k", tag: "Best Seller", cat: "Instinct", val: 10000 },
    { name: "Superhuman", price: "Rp 25k", tag: "Wajib Memiliki Dark Step, Electric, Water Kungfu, Dragon Breath", cat: "Fighting Style", val: 25000 },
    { name: "Electric Claw", price: "Rp 5k", tag: "Wajib 400 Mastery Electric, 3M Belly, 5K Fragment", cat: "Fighting Style", val: 5000 },
    { name: "Death Step", price: "Rp 10k", tag: "Wajib 400 Mastery Dark Step", cat: "Fighting Style", val: 10000 },
    { name: "Sharkman Karate", price: "Rp 10k", tag: "Wajib 400 Mastery Water Kungfu, 3M Belly, 5K Fragment", cat: "Fighting Style", val: 10000 },
    { name: "Dragontalon", price: "Rp 20k", tag: "Wajib 400 Mastery Dragon Breath, 3M Belly, 5K Fragment", cat: "Fighting Style", val: 20000 },
    { name: "Godhuman", price: "Rp 15k", tag: "Wajib Memiliki Electric Claw, Death Step, Sharkman Karate, Dragontalon", cat: "Fighting Style", val: 15000 },
    { name: "Sanguine Art", price: "Rp 60k", tag: "Best Seller ", cat: "Fighting Style", val: 60000 },
    { name: "Dark Dagger", price: "Rp 80k", tag: "10X Lawan Rip_indra", cat: "Sword", val: 80000 },
    { name: "Hallow Scythe", price: "Rp 40k", tag: "10X Lawan Soul Reaper ", cat: "Sword", val: 40000 },
    { name: "V2 Dark Blade", price: "Rp 5k", tag: "Mythic", cat: "Sword", val: 5000 },
    { name: "V3 Dark Blade", price: "Rp 50k", tag: "Wajib V3 Race Human, Angel, Shark, Rabbit", cat: "Sword", val: 50000 },
    { name: "True Triple Katana", price: "Rp 20k", tag: "Wajib Memiliki 2M Belly, Shizu,Oroshi,Saishi", cat: "Sword", val: 20000 },
    { name: "Cursed Dual Katana", price: "Rp 20k", tag: "Wajib Level 2200 Keatas + 10K Jika Yama Dan Tushita Belum 350 Mastery", cat: "Sword", val: 20000 },
    { name: "Yama", price: "Rp 15k", tag: "Mythic", cat: "Sword", val: 15000 },
    { name: "Tushita", price: "Rp 15k", tag: "Wajib Level 2200 Keatas", cat: "Sword", val: 15000 },
    { name: "Oroshi", price: "Rp 4k", tag: "Wajib Memiliki 2M Belly", cat: "Sword", val: 4000 },
    { name: "Saishi", price: "Rp 4k", tag: "Wajib Memiliki 2M Belly", cat: "Sword", val: 4000 },
    { name: "Shizu", price: "Rp 4k", tag: "Wajib Memiliki 2M Belly", cat: "Sword", val: 4000 },
    { name: "3 Legendary Sword", price: "Rp 10k", tag: "Oroshi,Saishi,Shizu", cat: "Sword", val: 10000 },
    { name: "Trident Spikey", price: "Rp 20k", tag: "Mythic", cat: "Sword", val: 20000 },
    { name: "Kabucha", price: "Rp 5k", tag: "Mythic", cat: "Sword", val: 5000 },
    { name: "Acidum Rifle", price: "Rp 20k", tag: "Mythic", cat: "Sword", val: 20000 },
    { name: "Skull Guitar", price: "Rp 15k", tag: "Wajib Level 2300 Keatas + 15K Jika Material Belum Ada", cat: "Sword", val: 15000 },
    { name: "Normal", price: "Rp 2k", tag: "Normal", cat: "Haki Resep", val: 2000 },
    { name: "Legend", price: "Rp 5k", tag: "Legend", cat: "Haki Resep", val: 5000 },
    { name: "Normal Raid 1X", price: "Rp 1k", tag: "Buah Dari Buyer", cat: "Raid", val: 1000 },
    { name: "Normal Raid + Fruit 1X", price: "Rp 2k", tag: "Buah Dari Penjoki", cat: "Raid", val: 2000 },
    { name: "Advanced Raid 1X", price: "Rp 5k", tag: "Buah Dari Buyer", cat: "Raid", val: 5000 },
    { name: "Advanced Raid 1X", price: "Rp 8k", tag: "Buah Dari Penjoki", cat: "Raid", val: 8000 },
    { name: "Law Raid", price: "Rp 5k", tag: "Fragment Buyer", cat: "Raid", val: 5000 },
    { name: "Pirate Raid", price: "Rp 10k", tag: "Server 1 Jam", cat: "Raid", val: 10000 },
    { name: "Dough King", price: "Rp 20k", tag: "Mythic", cat: " Boss Raid", val: 20000 },
    { name: "Soul Reaper", price: "Rp 15k", tag: "Mythic", cat: " Boss Raid", val: 15000 },
    { name: "Rip_indra", price: "Rp 15k", tag: "Mythic", cat: " Boss Raid", val: 15000 },
    { name: "DarkBeard", price: "Rp 15k", tag: "Mythic", cat: " Boss Raid", val: 15000 },
    { name: "Tyrant", price: "Rp 10k", tag: "Mythic", cat: " Boss Raid", val: 10000 },
    { name: "Conjured Cocoa x2", price: "Rp 1k", tag: "Mythic", cat: "Material", val: 1000 },
    { name: "Shark Tooth x2", price: "Rp 1k", tag: "Mythic", cat: "Material", val: 1000 },
    { name: "Moonstone x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Fire Feather x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Mystic Droplet x2", price: "Rp 1k", tag: "Mythic", cat: "Material", val: 1000 },
    { name: "Electric Wing x2", price: "Rp 1k", tag: "Mythic", cat: "Material", val: 1000 },
    { name: "Fools Gold x3", price: "Rp 2k", tag: "Mythic", cat: "Material", val: 2000 },
    { name: "Blaze Ember x3", price: "Rp 2k", tag: "Mythic", cat: "Material", val: 2000 },
    { name: "Volt Capsule x3", price: "Rp 2k", tag: "Mythic", cat: "Material", val: 2000 },
    { name: "Mutant Tooth x1", price: "Rp 3k", tag: "Mythic", cat: "Material", val: 3000 },
    { name: "Bones x1000", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Vampire Fang x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Demonic Wisp x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Scrap Metal x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Mini Tush x10", price: "Rp 10k", tag: "Mythic", cat: "Material", val: 10000 },
    { name: "Ectoplasm x100", price: "Rp 3k", tag: "Mythic", cat: "Material", val: 3000 },
    { name: "Dragon Scale x5", price: "Rp 5k", tag: "Mythic", cat: "Material", val: 5000 },
    { name: "Terror Eye x1", price: "Rp 5k", tag: "Mythic", cat: "Material", val: 5000 },
    { name: "Leviathan Scale x10", price: "Rp 30k", tag: "Mythic", cat: "Material", val: 30000 },
    { name: "Legend Scroll", price: "Rp 30k", tag: "Mythic", cat: "Material", val: 30000 },
    { name: "Mythical Scroll", price: "Rp 80k", tag: "Mythic", cat: "Material", val: 80000 },
    { name: "V2 All Race", price: "Rp 3k", tag: "Belly Punya Buyer", cat: "Race", val: 3000 },
    { name: "V3 Race Not Ghoul", price: "Rp 5k", tag: "Belly Punya Buyer", cat: "Race", val: 5000 },
    { name: "V3 Race Ghoul", price: "Rp 15k", tag: "Belly Punya Buyer", cat: "Race", val: 15000 },
    { name: "Unlock Ghoul", price: "Rp 15k", tag: "Boss Cursed Ship ", cat: "Race", val: 15000 },
    { name: "Insert FOD", price: "Rp 10k", tag: "Fish Of Darkness", cat: "Race", val: 10000 },
    { name: "Unlock Cyborg", price: "Rp 10k", tag: "Fragment Punya Buyer + Wajib Sudah Insert FOD", cat: "Race", val: 10000 },
    { name: "Pull Lever/Bluegear", price: "Rp 10k", tag: "Wajib Memiliki Mirror Fractal + Valkyrie Helm", cat: "V4", val: 10000 },
    { name: "1x Trial", price: "Rp 7k", tag: "Via Login", cat: "V4", val: 7000 },
    { name: "1x Trial", price: "Rp 10k", tag: "Via Gendong", cat: "V4", val: 10000 },
    { name: "1x Train", price: "Rp 3k", tag: "Khusus T1-T2", cat: "V4", val: 3000 },
    { name: "FullGear T5", price: "Rp 40k", tag: "Wajib Ada 9.250 Fragment", cat: "V4", val: 40000 },
    { name: "FullGear T10/TrueGear", price: "Rp 50k", tag: "Wajib Ada 26.750 Fragment", cat: "V4", val: 50000 },
    { name: "Train T3->T5", price: "Rp 10k", tag: "Wajib Ada 6.750 Fragment", cat: "V4", val: 10000 },
    { name: "Train T5->T10", price: "Rp 15k", tag: "Wajib Ada 17.500 Fragment", cat: "V4", val: 15000 },
    { name: "Shark Necklace", price: "Rp 10k", tag: "-", cat: "Sea Event", val: 10000 },
    { name: "Terror Jaw", price: "Rp 10k", tag: "-", cat: "Sea Event", val: 10000 },
    { name: "Mnster Magnet", price: "Rp 20k", tag: "Wajib Memiliki Shark Necklace & Terror Jaw", cat: "Sea Event", val: 20000 },
    { name: "Leviathan Crown", price: "Rp 70k", tag: "-", cat: "Sea Event", val: 70000 },
    { name: "Beast Hunter", price: "Rp 70k", tag: "-", cat: "Sea Event", val: 70000 },
    { name: "Leviathan Shield", price: "Rp 80k", tag: "-", cat: "Sea Event", val: 80000 },
    { name: "Remove Cd Bribe", price: "Rp 5k", tag: "-", cat: "Sea Event", val: 5000 },
    { name: "Leviathan Heart TIKI", price: "Rp 30k", tag: "-", cat: "Sea Event", val: 30000 },
    { name: "Freeze Hydra Island", price: "Rp 30k", tag: "-", cat: "Sea Event", val: 30000 },
    { name: "Fox Lamp + Bonus", price: "Rp 40k", tag: "-", cat: "Kitsune Event", val: 40000 },
    { name: "Azure Ember x25", price: "Rp 10k", tag: "-", cat: "Kitsune Event", val: 10000 },
    { name: "1 Belt", price: "Rp 5k", tag: "-", cat: "Dragon Event", val: 5000 },
    { name: "6 Belt", price: "Rp 30k", tag: "-", cat: "Dragon Event", val: 30000 },
    { name: "Red Belt", price: "Rp 15k", tag: "-", cat: "Dragon Event", val: 15000 },
    { name: "Black Belt", price: "Rp 25k", tag: "-", cat: "Dragon Event", val: 25000 },
    { name: "Volcano Magnet", price: "Rp 10k", tag: "-", cat: "Dragon Event", val: 10000 },
    { name: "1 Dragon Egg", price: "Rp 20k", tag: "-", cat: "Dragon Event", val: 20000 },
    { name: "Draco Race", price: "Rp 100k", tag: "-", cat: "Dragon Event", val: 100000 },
    { name: "Fire Flower x1", price: "Rp 5k", tag: "-", cat: "Dragon Event", val: 5000 },
    { name: "V2 Draco", price: "Rp 20k", tag: "-", cat: "Dragon Event", val: 20000 },
    { name: "V3 Draco", price: "Rp 10k", tag: "-", cat: "Dragon Event", val: 10000 },
    { name: "DragonHeart Sword", price: "Rp 30k", tag: "-", cat: "Dragon Event", val: 30000 },
    { name: "DragonStorm Gun", price: "Rp 50k", tag: "-", cat: "Dragon Event", val: 50000 },
    { name: "Freezing Hydra", price: "Rp 30k", tag: "Wajib 500 Mastery DragonHeart + DragonStorm + V3 Race Draco", cat: "Dragon Event", val: 30000 },
    { name: "1x Trial Draco", price: "Rp 25k", tag: "Tanpa Magnet", cat: "Dragon Event", val: 25000 },
    { name: "1x Trial Draco", price: "Rp 20k", tag: "Ada Magnet", cat: "Dragon Event", val: 20000 },
    { name: "Darkcoat", price: "Rp 100k", tag: "10x Lawan DarkBeard", cat: "Accessories", val: 100000 },
    { name: "Pale Scraf", price: "Rp 10k", tag: "Wajib Sea 3", cat: "Accessories", val: 10000 },
    { name: "Muskeeter Hat", price: "Rp 10k", tag: "Wajib Level 1800+", cat: "Accessories", val: 10000 },
    { name: "Pilot Helmet", price: "Rp 5k", tag: "Wajib Sea 3", cat: "Accessories", val: 5000 },
];

const fruitData = [
    { name: "Kitsune", price: "Rp 45k", tag: "Stok Habis", cat: "Mythical", val: 45000 },
    { name: "Tiger", price: "Rp 30k", tag: "Ready", cat: "Mythical", val: 30000 },
    { name: "Dragon", price: "Rp 180k", tag: "Stok Habis", cat: "Mythical", val: 180000 },
    { name: "Yeti", price: "Rp 30k", tag: "Ready", cat: "Mythical", val: 30000 },
    { name: "Gas", price: "Rp 15k", tag: "Ready", cat: "Mythical", val: 15000 },
    { name: "Dough", price: "Rp 10k", tag: "Stok Habis", cat: "Mythical", val: 10000 },
    { name: "T-Rex", price: "Rp 7k", tag: "Stok Habis", cat: "Mythical", val: 7000 },
    { name: "Mammoth", price: "Rp 5k", tag: "Ready", cat: "Mythical", val: 5000 },
    { name: "Spirit", price: "Rp 5k", tag: "Ready", cat: "Mythical", val: 5000 },
    { name: "Control", price: "Rp 20k", tag: "Ready", cat: "Mythical", val: 20000 },
    { name: "Shadow", price: "Rp 4k", tag: "Ready", cat: "Mythical", val: 4000 },
    { name: "Venom", price: "Rp 5k", tag: "Ready", cat: "Mythical", val: 5000 },
    { name: "Gravity", price: "Rp 10k", tag: "Ready", cat: "Mythical", val: 10000 },
    { name: "Pain", price: "Rp 15k", tag: "Ready", cat: "Legendary", val: 15000 },
    { name: "Lightning", price: "Rp 12k", tag: "Ready", cat: "Legendary", val: 12000 },
    { name: "Portal", price: "Rp 5k", tag: "Ready", cat: "Legendary", val: 5000 },
    { name: "Buddha", price: "Rp 5k", tag: "Ready", cat: "Legendary", val: 5000 },
    { name: "Sound", price: "Rp 3k", tag: "Ready", cat: "Legendary", val: 3000 },
    { name: "Phoenix", price: "Rp 1k", tag: "Ready", cat: "Legendary", val: 1000 },
    { name: "Magma", price: "Rp 3k", tag: "Ready", cat: "Rare", val: 3000 }
];

// ==========================================
// ELEMENT SELECTORS
// ==========================================
const container = document.getElementById('joki-package-container');
const mainTabs = document.getElementById('mainTabs');
const subTabs = document.getElementById('subTabs');
const packageModal = document.getElementById('packageModal');
const cartModal = document.getElementById('cartModal');
const confirmModal = document.getElementById('confirmClearModal');

const authModal = document.getElementById('authModal');
const openAuth = document.getElementById('openAuth');
const closeAuth = document.getElementById('closeAuth');
const authSection = document.getElementById('auth-section');
const btnAuthAction = document.getElementById('btnAuthAction');
const toggleAuth = document.getElementById('toggleAuth');
const authTitle = document.getElementById('authTitle');

// ==========================================
// CORE FUNCTIONS (LAYOUT & CART)
// ==========================================
function renderContent(data) {
    container.innerHTML = data.map(item => `
        <div class="pkg-card">
            <div style="background:rgba(56,189,248,0.1); padding:5px 15px; border-radius:50px; display:inline-block; font-size:10px; font-weight:800; color:var(--primary); margin-bottom:10px;">${item.tag}</div>
            <h4>${item.name}</h4>
            <span class="price">${item.price}</span>
            <button class="btn-primary" style="width:100%; font-size:12px;" onclick="addToCart('${item.name}', '${item.price}', ${item.val})">Pilih Produk</button>
        </div>
    `).join('');
}

// Fungsi pembantu untuk cek masa berlaku 15 hari
function getPromoStatus(key) {
    const startTime = localStorage.getItem(key);
    if (!startTime) return { active: false, remaining: 0 };

    const DURASI_15_HARI = 15 * 24 * 60 * 60 * 1000; // dalam Milidetik
    const waktuSekarang = Date.now(); // Waktu nyata saat ini
    const waktuHabis = parseInt(startTime) + DURASI_15_HARI;
    const sisaWaktu = waktuHabis - waktuSekarang;

    if (sisaWaktu <= 0) {
        localStorage.removeItem(key); // Hapus jika sudah basi
        return { active: false, remaining: 0 };
    }
    return { active: true, remaining: sisaWaktu };
}

function startLiveCountdown() {
    setInterval(() => {
    const timerEl = document.getElementById('promo-timer-display');
    if (!timerEl) return;

    const isLoggedIn = localStorage.getItem('userLogin') !== null;
    const key = isLoggedIn ? 'loginPromoStarted' : 'promoClaimedAt';
    const status = getPromoStatus(key);

    if (status.active) {
        const d = Math.floor(status.remaining / (1000 * 60 * 60 * 24));
        const h = Math.floor((status.remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((status.remaining % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((status.remaining % (1000 * 60)) / 1000);

        timerEl.innerHTML = `⏳ Berakhir dlm: ${d} Hari ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    } else {
        timerEl.innerHTML = "❌ Promo Berakhir";
        if(cart.length > 0) updateCartUI(); // Reset harga ke normal
    }
}, 1000);
}

// Jalankan fungsi timer saat halaman dimuat
startLiveCountdown();

function addToCart(name, price, val, type) {
    // 1. Logika memasukkan ke keranjang
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Jika type tidak didefinisikan, default ke Joki agar bisa kena diskon
        cart.push({ name, price, val, type: type || "Joki", quantity: 1 });
    }

    const btn = event.target;
    if (btn && (btn.classList.contains('btn-primary') || btn.classList.contains('btn-package'))) {
        const originalText = btn.innerHTML;
        btn.innerHTML = "✓ Ditambahkan";
        btn.style.backgroundColor = "#22adc5"; // Hijau sukses
        btn.style.pointerEvents = "none"; // Cegah klik ganda cepat

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = ""; 
            btn.style.pointerEvents = "auto";
        }, 800);
    }

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = "scale(1.2) rotate(10deg)";
        setTimeout(() => cartIcon.style.transform = "scale(1) rotate(0deg)", 200);
    }

    updateCartUI();
}

function changeQty(index, delta) {
    cart[index].quantity += delta;
    
    // Jika jumlah kurang dari 1, hapus dari keranjang
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('cart-total');

    if (cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (!cartItemsDiv || !totalDiv) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p style='text-align:center; color:var(--text-dim); margin: 20px 0;'>Keranjang kosong.</p>";
        totalDiv.innerText = "Total: Rp 0";
        return;
    }

    // Render Item
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <span>${item.price}</span>
            </div>
            <div class="qty-control">
                <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');

    // Hitung Diskon
    const isLoggedIn = localStorage.getItem('userLogin') !== null;
    const loginPromo = getPromoStatus('loginPromoStarted');
    const popupPromo = getPromoStatus('promoClaimedAt');
    
    let diskon = 0;
    let label = "";

    if (isLoggedIn && loginPromo.active) {
        diskon = 0.40;
        label = " (Member 40%)";
    } else if (isDiscountActive && popupPromo.active) {
        diskon = 0.30;
        label = " (Promo 30%)";
    }

    let totalMurni = 0;
    let totalFinal = 0;

    cart.forEach(item => {
        let sub = item.val * item.quantity;
        totalMurni += sub;
        // Diskon hanya untuk kategori Joki (cek string Joki pada nama atau properti)
        totalFinal += (item.name.toLowerCase().includes('fruit')) ? sub : sub * (1 - diskon);
    });

    // Wadah Statis untuk Timer agar tidak hilang saat re-render
    if (diskon > 0) {
        totalDiv.innerHTML = `
            <div id="promo-timer-display" style="font-size: 11px; color: #fbbf24; margin-bottom: 5px; font-weight: 800;"></div>
            <span style="text-decoration: line-through; font-size: 0.8em; color: var(--text-dim); opacity: 0.6;">Rp ${totalMurni.toLocaleString('id-ID')}</span><br>
            Total: Rp ${Math.floor(totalFinal).toLocaleString('id-ID')}${label}
        `;
    } else {
        totalDiv.innerHTML = `Total: Rp ${totalMurni.toLocaleString('id-ID')}`;
    }
    
    updatePromoTimer(); // Panggil fungsi timer
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function showConfirmClear() {
    if(cart.length === 0) return;
    confirmModal.style.display = 'block';
}

function closeConfirmClear() {
    confirmModal.style.display = 'none';
}

function executeClearCart() {
    cart = [];
    updateCartUI();
    closeConfirmClear();
}

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    const userSekarang = localStorage.getItem('userLogin') || "Guest";
    const waNomor = "62895321940805";
    const isLoggedIn = localStorage.getItem('userLogin') !== null;
    
    let diskonPersen = 0;
    if (isLoggedIn) diskonPersen = 0.40;
    else if (isDiscountActive) diskonPersen = 0.30;

    let pesanWA = `*Halo Indraa Store, saya ingin order:*\n`;
    pesanWA += `--------------------------------\n`;
    pesanWA += `👤 *Akun:* ${userSekarang}\n\n`;

    let totalSetelahDiskon = 0;
    cart.forEach((item, index) => {
        let itemSubtotal = item.val * item.quantity;
        let itemFinal = itemSubtotal;

        if (item.type === "Joki" && diskonPersen > 0) {
            itemFinal = itemSubtotal * (1 - diskonPersen);
        }

        pesanWA += `${index + 1}. *${item.name}*\n`;
        pesanWA += `   Jumlah: ${item.quantity}x\n`;
        pesanWA += `   Subtotal: Rp ${Math.floor(itemFinal).toLocaleString('id-ID')}\n\n`;
        
        totalSetelahDiskon += itemFinal;
    });

    const totalFinal = Math.floor(totalSetelahDiskon);
    pesanWA += `--------------------------------\n`;
    pesanWA += `💰 *Total Pembayaran:* Rp ${totalFinal.toLocaleString('id-ID')}\n`;
    
    if (isLoggedIn) {
        pesanWA += `_(Promo Member 40% Aktif! 🎉)_\n`;
    } else if (isDiscountActive) {
        pesanWA += `_(Promo Flash Sale 30% Aktif! 🚀)_\n`;
    }
    
    pesanWA += `\nMohon segera diproses ya!`;

    // ... sisanya tetap sama (Firebase push dan window.open)
    const orderData = {
        userEmail: userSekarang,
        items: cart,
        totalPrice: totalFinal,
        status: userSekarang === "ADMIN" ? "Selesai" : "Diproses",
        createdAt: Date.now()
    };
    const refPath = userSekarang !== "Guest" ? 'pending_orders' : 'guest_orders';
    database.ref(refPath).push(orderData);
    window.open(`https://wa.me/${waNomor}?text=${encodeURIComponent(pesanWA)}`, '_blank');
}

// ==========================================
// AUTHENTICATION LOGIC (FIXED)
// ==========================================
if(openAuth) openAuth.onclick = () => authModal.style.display = 'block';
if(closeAuth) closeAuth.onclick = () => authModal.style.display = 'none';

if(toggleAuth) {
    toggleAuth.onclick = () => {
        isLoginMode = !isLoginMode;
        authTitle.innerText = isLoginMode ? "Login Akun" : "Daftar Akun";
        btnAuthAction.innerText = isLoginMode ? "Masuk" : "Daftar";
        toggleAuth.innerHTML = isLoginMode ? 
            'Belum punya akun? <span style="color:var(--primary); font-weight:600;">Daftar</span>' : 
            'Sudah punya akun? <span style="color:var(--primary); font-weight:600;">Login</span>';
    };
}

if(btnAuthAction) {
    btnAuthAction.onclick = () => {
        const email = document.getElementById('authEmail').value;
        const pass = document.getElementById('authPass').value;

        if (!email || !pass) {
            alert("Mohon isi semua data!");
            return;
        }

        if (isLoginMode) {
            if (email === "admin@indraastore.com" && pass === "Kenzstore13") {
                alert("Login Admin Berhasil!");
                localStorage.setItem('userLogin', 'ADMIN');
                location.reload();
                return;
            }

            database.ref('users').orderByChild('email').equalTo(email).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    let userData;
                    snapshot.forEach(child => { userData = child.val(); });
                    if (userData.password === pass) {
                        localStorage.setItem('userLogin', email);
                        alert("Login Berhasil!");
                        location.reload();
                    } else {
                        alert("Password salah!");
                    }
                } else {
                    alert("Email tidak terdaftar!");
                }
            });
        } else {
            database.ref('users').orderByChild('email').equalTo(email).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    alert("Email sudah terdaftar!");
                } else {
                    database.ref('users').push({
                        email: email,
                        password: pass,
                        createdAt: Date.now()
                    }).then(() => {
                        alert("Pendaftaran Berhasil! Silakan Login.");
                        isLoginMode = true;
                        toggleAuth.click();
                    });
                }
            });
        }
    };
}

document.getElementById('btnLogout').onclick = () => {
    localStorage.removeItem('userLogin');
    location.reload();
};

function loadUserHistory(email) {
    const historyList = document.getElementById('history-list');
    database.ref('orders').orderByChild('userEmail').equalTo(email).on('value', (snapshot) => {
        if(snapshot.exists()) {
            historyList.innerHTML = "";
            let orderCount = 0;
            
            snapshot.forEach((child) => {
                const order = child.val();
                if(order.status === "Selesai") orderCount++; // Hitung pesanan selesai

                const date = new Date(order.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'
                });
                historyList.innerHTML += `
                    <div class="history-item">
                        <div class="history-info">
                            <h4>${order.items ? order.items[0].name : "Order"}</h4>
                            <p>${date}</p>
                        </div>
                        <div class="status-badge">Selesai</div>
                    </div>`;
            });

            // LOGIKA PROMO LOYALITAS (10x Order)
            if (orderCount >= 10) {
                const now = Date.now();
                const sevenDays = 7 * 24 * 60 * 60 * 1000;
                // Set promo jika belum ada atau sudah kadaluwarsa
                if (!localStorage.getItem('loyalPromoExpiry') || now > localStorage.getItem('loyalPromoExpiry')) {
                    localStorage.setItem('loyalPromoExpiry', now + sevenDays);
                    alert("🎉 Luar biasa! Anda telah menyelesaikan " + orderCount + " order. Nikmati Promo Loyalitas 10% selama 7 hari ke depan!");
                }
            }
        } else {
            historyList.innerHTML = `<p style="text-align:center; color:var(--text-dim); font-size:12px; margin-top:20px;">Belum ada transaksi.</p>`;
        }
    });
}

// ==========================================
// ADMIN FUNCTIONS
// ==========================================
function loadAdminDashboard() {
    const historyList = document.getElementById('history-list');
    database.ref('pending_orders').on('value', (snapshot) => {
        historyList.innerHTML = "";
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                const order = child.val();
                const orderId = child.key;
                historyList.innerHTML += `
                    <div class="history-item" style="border-left: 4px solid #f1c40f; flex-direction: column; align-items: flex-start; padding: 15px;">
                        <h4 style="color: var(--primary); font-size: 11px;">User: ${order.userEmail}</h4>
                        <p style="color: white; margin: 5px 0; font-size: 13px;">📦 ${order.items.map(i => i.name).join(', ')}</p>
                        <small>Total: Rp ${order.totalPrice.toLocaleString()}</small>
                        <div style="display: flex; gap: 5px; width: 100%; margin-top: 10px;">
                            <button onclick="konfirmasiSelesai('${orderId}')" 
                                    style="flex: 2; background: #22c55e; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-weight: 800;">
                                SELESAI
                            </button>
                            <button onclick="batalkanPesanan('${orderId}')" 
                                    style="flex: 1; background: #ef4444; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-weight: 800;">
                                CANCEL
                            </button>
                        </div>
                    </div>`;
            });
        } else {
            historyList.innerHTML = "<p style='text-align:center; padding: 20px; font-size: 12px;'>Tidak ada antrean.</p>";
        }
    });
}

window.konfirmasiSelesai = function(orderId) {
    if (confirm("Tandai pesanan selesai?")) {
        const ref = database.ref('pending_orders/' + orderId);
        ref.once('value', (snapshot) => {
            const data = snapshot.val();
            database.ref('orders').push({
                ...data,
                status: "Selesai",
                completedAt: Date.now()
            }).then(() => {
                ref.remove();
                alert("Berhasil!");
            });
        });
    }
}

window.batalkanPesanan = function(orderId) {
    if (confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
        database.ref('pending_orders/' + orderId).remove().then(() => {
            alert("Pesanan berhasil dibatalkan.");
        });
    }
}

// ==========================================
// UI NAVIGATION
// ==========================================
function showLayananMenu() {
    document.getElementById('modalTitle').innerText = "Layanan Kami";
    subTabs.innerHTML = "";
    mainTabs.innerHTML = ["Joki", "Fruit"].map(type => `<button class="btn-category ${type === currentMainType ? 'active' : ''}" onclick="setMainType('${type}')">${type}</button>`).join('');
    setMainType(currentMainType);
    packageModal.style.display = 'block';
}

function setMainType(type) {
    currentMainType = type;
    const data = type === "Joki" ? jokiData : fruitData;
    const categories = ["Semua", ...new Set(data.map(item => item.cat))];
    subTabs.innerHTML = categories.map(cat => `<button class="btn-category active-sub" onclick="filterSub('${cat}', this)">${cat}</button>`).join('');
    filterSub("Semua", subTabs.querySelector('.btn-category'));
}

function filterSub(cat, btn) {
    // 1. Hapus kelas 'active' dari SEMUA tombol yang ada di subTabs
    const allButtons = document.querySelectorAll('#subTabs .btn-category');
    allButtons.forEach(b => b.classList.remove('active'));

    // 2. Tambahkan kelas 'active' hanya pada tombol yang baru saja diklik
    if (btn) {
        btn.classList.add('active');
    }

    // 3. Filter data berdasarkan tipe utama (Joki/Fruit)
    const sourceData = currentMainType === "Joki" ? jokiData : fruitData;
    const filtered = cat === "Semua" ? sourceData : sourceData.filter(item => item.cat === cat);
    
    renderContent(filtered);
}

document.getElementById('nav-layanan').onclick = showLayananMenu;
document.getElementById('open-joki-hero').onclick = () => { currentMainType = "Joki"; showLayananMenu(); };
document.getElementById('nav-cart').onclick = () => cartModal.style.display = 'block';
document.getElementById('closeCart').onclick = () => cartModal.style.display = 'none';

document.getElementById('nav-stok-live').onclick = () => {
    document.getElementById('modalTitle').innerText = "Live Stok Bloxfruit";
    mainTabs.innerHTML = ""; subTabs.innerHTML = "";
    container.innerHTML = `<div class="stok-iframe-container"><iframe src="https://www.gamersberg.com/blox-fruits/stock"></iframe></div>`;
    packageModal.style.display = 'block';
};

document.getElementById('closePackage').onclick = () => packageModal.style.display = 'none';
document.getElementById('closePromo').onclick = () => document.getElementById('promoModal').style.display = 'none';
document.getElementById('btn-klaim').onclick = function() {
    // 1. Ambil waktu saat ini HANYA JIKA belum pernah klaim sebelumnya
    if (!localStorage.getItem('promoClaimedAt')) {
        localStorage.setItem('promoClaimedAt', Date.now().toString());
    }
    
    isDiscountActive = true;
    document.getElementById('promoModal').style.display = "none";
    
    // Simpan status modal agar tidak muncul lagi setelah refresh
    localStorage.setItem('modalClosed', 'true');
    
    updateCartUI();
    alert("Promo Berhasil Diaktifkan! Berlaku 15 hari dari sekarang.");
};

// ==========================================
// MUSIC CONTROL
// ==========================================
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.innerText = "🔈";
        musicText.innerText = "Play Theme";
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play();
        musicIcon.innerText = "🔊";
        musicText.innerText = "Now Playing";
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

musicBtn.onclick = toggleMusic;
document.addEventListener('click', function startMusic() {
    if (!isPlaying) toggleMusic();
    document.removeEventListener('click', startMusic);
}, { once: true });

// ==========================================
// TESTIMONI GALLERY
// ==========================================
const testiModal = document.getElementById('testiModal');
const navTesti = document.getElementById('nav-testimoni');
const closeTesti = document.getElementById('closeTesti');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const uploadBox = document.getElementById('triggerUpload');
const fileInput = document.getElementById('fileInput');
const testiGallery = document.getElementById('testi-gallery');
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImg = document.getElementById('fullscreenImg');

if(navTesti) navTesti.onclick = () => { testiModal.style.display = 'block'; };
if(closeTesti) closeTesti.onclick = () => { testiModal.style.display = 'none'; };

database.ref('testimonies').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const newCard = document.createElement('div');
    newCard.className = 'testi-card';
    newCard.innerHTML = `<img src="${data.imageUrl}" alt="Testimoni" style="width:100%; border-radius:15px; cursor:pointer;">`;
    newCard.onclick = () => {
        fullscreenImg.src = data.imageUrl;
        fullscreenOverlay.classList.add('active');
    };
    testiGallery.appendChild(newCard);
});

if(adminLoginBtn) {
    adminLoginBtn.onclick = () => {
        const pass = prompt("Masukkan Password Admin:");
        if (pass === "Kenzstore13") {
            alert("Admin Terverifikasi!");
            uploadBox.style.setProperty('display', 'flex', 'important');
            adminLoginBtn.style.display = 'none';
        }
    };
}

if(uploadBox) uploadBox.onclick = () => fileInput.click();
fileInput.onchange = function() {
    const file = this.files[0];
    if (file) {
        if (file.size > 1024 * 1024) { alert("File Maks 1MB!"); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            database.ref('testimonies').push({ imageUrl: e.target.result, createdAt: Date.now() });
            alert("Terupload!");
        };
        reader.readAsDataURL(file);
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
window.onload = () => {
    setTimeout(() => { document.getElementById('promoModal').style.display = 'block'; }, 2000);
    
    const loggedInUser = localStorage.getItem('userLogin');
    if(loggedInUser) {
        authSection.innerHTML = `<a href="javascript:void(0)" id="openAuth" class="btn-primary" style="padding: 8px 20px;">👤 Akun</a>`;
        document.getElementById('openAuth').onclick = () => authModal.style.display = 'block';
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('user-profile').style.display = 'block';
        
        if (loggedInUser === 'ADMIN') {
            document.getElementById('userNameDisplay').innerText = "Panel Admin";
            loadAdminDashboard();
        } else {
            document.getElementById('userNameDisplay').innerText = "Halo, " + loggedInUser.split('@')[0];
            loadUserHistory(loggedInUser);
        }
    }
};

window.onclick = (e) => { 
    if(e.target.className === 'modal') e.target.style.display = 'none'; 
};

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#nav-list');

// Klik tombol hamburger
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Tutup menu saat salah satu link diklik
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));

// Logika Menu Mobile Tanpa Overlay (Agar fitur bisa diklik lancar)
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            this.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // Klik menu apa saja (Home/Live Stok), menu otomatis tertutup
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ==========================================
// FITUR BACKSONG YOUTUBE DENGAN MUTE/UNMUTE
// ==========================================

var player;
var isMuted = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'vnoHcTMY55k',
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'vnoHcTMY55k'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Mulai putar video
    event.target.playVideo();
    
    const musicBtn = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');

    // Fungsi Toggle Mute
    musicBtn.addEventListener('click', function() {
        if (isMuted) {
            player.unMute();
            player.playVideo(); // Pastikan jalan jika sebelumnya terhenti
            musicIcon.innerText = "🔊";
            isMuted = false;
        } else {
            player.mute();
            musicIcon.innerText = "×";
            isMuted = true;
        }
    });

    // Autoplay Fix: Putar saat ada interaksi pertama user di halaman
    document.addEventListener('click', function() {
        if (!isMuted) {
            player.playVideo();
        }
    }, { once: true });
}

// Load YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// ==========================================
// FIX REVOLUSIONER: BUKA/TUTUP TOKO (STABLE)
// ==========================================

const EMAIL_ADMIN_FINAL = "admin@indraastore.com";

function forceShowAdmin() {
    const pnl = document.getElementById('admin-control');
    if (pnl) {
        // Gunakan flex karena parent-nya ul nav-links
        pnl.style.display = "flex"; 
        pnl.style.visibility = "visible";
        pnl.style.opacity = "1";
        console.log("SISTEM: Panel Admin Aktif.");
    }
}

// Pantau Status Toko Secara Realtime
// Menggunakan variabel 'database' yang sudah didefinisikan di index.html
database.ref('shopStatus').on('value', (snapshot) => {
    const isOpen = snapshot.exists() ? snapshot.val() : true;
    const stText = document.getElementById('status-toko-text');
    const stToggle = document.getElementById('toggle-toko');
    
    // Ambil elemen modal tutup
    const closedModal = document.getElementById('closedModal');
    
    // Pilih semua tombol interaksi kecuali tombol akun
    const btns = document.querySelectorAll('.btn-primary, .btn-category, #btn-klaim, .pkg-card button');

    if (isOpen) {
        // Logika saat BUKA
        if(stText) { stText.innerText = "BUKA"; stText.style.color = "#4ade80"; }
        if(stToggle) stToggle.checked = true;
        if(closedModal) closedModal.style.display = 'none'; // Sembunyikan pop-up tutup
        
        btns.forEach(b => { 
            if(b.id !== 'openAuth') { 
                b.style.pointerEvents = "auto"; 
                b.style.opacity = "1"; 
                b.disabled = false;
            } 
        });
    } else {
        // Logika saat TUTUP
        if(stText) { stText.innerText = "TUTUP"; stText.style.color = "#ef4444"; }
        if(stToggle) stToggle.checked = false;
        
        // Tampilkan pop-up jika bukan Admin
        const loggedInUser = localStorage.getItem('userLogin');
        if(closedModal && loggedInUser !== 'ADMIN') { 
            closedModal.style.display = 'flex'; 
        }

        btns.forEach(b => { 
            if(b.id !== 'openAuth') { 
                b.style.pointerEvents = "none"; 
                b.style.opacity = "0.4"; 
                b.disabled = true;
            } 
        });
    }
});

// Fungsi untuk mengubah status di Firebase
function updateShopStatus(status) {
    database.ref('shopStatus').set(status)
    .then(() => console.log("Status toko berhasil diubah ke: " + status))
    .catch((err) => alert("Gagal mengubah status: " + err.message));
}

// Cek Login Admin & Pasang Event Listener
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('modalClosed') === 'true') {
    document.getElementById('promoModal').style.display = "none";
    }
    const loggedInUser = localStorage.getItem('userLogin');
    
    if (loggedInUser === 'ADMIN') {
        forceShowAdmin();
        
        const toggleBtn = document.getElementById('toggle-toko');
        if(toggleBtn) {
            toggleBtn.onchange = function() {
                updateShopStatus(this.checked);
            };
        }
    }
});

// Fitur Bypass Logo
let countLogo = 0;
const logoEl = document.querySelector('.logo');
if(logoEl) {
    logoEl.addEventListener('click', () => {
        countLogo++;
        if(countLogo === 5) {
            const ask = prompt("Sistem Admin Error? Masukkan kode bypass:");
            if(ask === "buka") { 
                forceShowAdmin();
                // Aktifkan listener toggle saat bypass
                const toggleBtn = document.getElementById('toggle-toko');
                if(toggleBtn) {
                    toggleBtn.onchange = function() { updateShopStatus(this.checked); };
                }
            }
            countLogo = 0;
        }
    });
}