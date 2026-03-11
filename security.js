(function() {
    const warningPage = "warning.html";

    const triggerAction = () => {
        window.location.replace(warningPage);
    };

    const detectSize = () => {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        
        if (widthDiff || heightDiff) {
            triggerAction();
        }
    };

    // Deteksi Eruda
    const erudaCheck = () => {
        const hasErudaObj = !!window.eruda;
        const hasErudaDom = !!document.getElementById('eruda') || !!document.querySelector('[class*="eruda"]');
        
        if (hasErudaObj || hasErudaDom) {
            triggerAction();
        }
    };

    const setupListeners = () => {
        // Blokir Klik Kanan
        document.addEventListener('contextmenu', e => e.preventDefault());

        // Blokir F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        document.addEventListener('keydown', e => {
            if (
                e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
                (e.ctrlKey && e.keyCode === 85)
            ) {
                e.preventDefault();
                triggerAction();
            }
        });
    };

    // Jalankan pengecekan secara rutin
    const init = () => {
        setupListeners();
        setInterval(() => {
            detectSize();
            erudaCheck();
        }, 2000);
    };

    // Mulai proteksi
    init();
})();