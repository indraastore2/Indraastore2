(function() {
    const warningPage = "warning.html";

    const triggerAction = () => {
        window.location.replace(warningPage);
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
        }, 2000);
    };

    // Mulai proteksi
    init();
})();
