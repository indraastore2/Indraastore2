// 1. Memblokir Klik Kanan, F12, dan Shortcut Inspect
document.addEventListener('contextmenu', e => e.preventDefault());

document.onkeydown = function(e) {
    if (
        e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
        return false;
    }
};

// 2. Fitur Anti-Debugger (Blokir Developer Tools)
// Jika user membuka DevTools, script ini akan memicu "pause" otomatis yang membuat website tidak bisa digunakan
(function() {
    var counter = 0;
    setInterval(function() {
        (function(a) {
            return (function(a) {
                return (Function('Function(arguments[0]+"' + a + '")()'))
            })(a)
        })('debugger')('stateObject');
        counter++;
    }, 50);
})();

// 3. Deteksi Jika DevTools Terbuka (Mengalihkan Halaman)
const devtools = {
    isOpen: false,
    orientation: undefined
};
const threshold = 160;
setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        if (!devtools.isOpen) {
            // Jika terdeteksi DevTools terbuka, arahkan ke halaman lain atau refresh
            window.location.reload(); 
        }
        devtools.isOpen = true;
    } else {
        devtools.isOpen = false;
    }
}, 500);

// 4. Pesan Peringatan di Console
console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold;");
console.log("%cFitur ini dilindungi oleh sistem keamanan Indraa Store.", "font-size: 18px; color: yellow;");