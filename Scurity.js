(function() {
    const triggerAction = (detected) => {
        document.body.style.display = "none";
        console.warn(`[SECURITY] Akses Ditolak: ${detected} terdeteksi.`);
    };

    const restoreAction = () => {
        document.body.style.display = "block";
    };

    const setupListeners = () => {

        document.addEventListener('contextmenu', e => e.preventDefault());


        document.addEventListener('keydown', e => {
            const isInspect = (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()));
            const isViewSource = (e.ctrlKey && e.key.toUpperCase() === "U");
            const isF12 = (e.key === "F12");

            if (isInspect || isViewSource || isF12) {
                e.preventDefault();
                triggerAction("Keyboard Shortcut");
                return false;
            }
        });
    };

    const antiDebugger = () => {
        setInterval(() => {
            (function(a) {
                return (function(a) {
                    return (Function('Function(arguments[0]+"' + a + '")()'))
                })(a)
            })('debugger')('stateObject');
        }, 50);
    };


    const securityCheck = () => {
        const threshold = 160;
        
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        const hasEruda = !!window.eruda || !!document.getElementById('eruda') || !!document.querySelector('[class*="eruda"]');

        if (widthDiff || heightDiff || hasEruda) {
            triggerAction(hasEruda ? "Eruda/Mobile DevTools" : "Side-docked DevTools");
        } else {

            restoreAction();
        }
    };

    const printWarning = () => {
        console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black;");
        console.log("%cFitur ini dilindungi oleh sistem keamanan.", "font-size: 18px; color: orange; font-weight: bold;");
        console.log("Mencoba mengintip kode? Debugger kami akan membuat browser Anda lambat.");
    };

    const init = () => {
        setupListeners();
        antiDebugger();
        printWarning();
        

        setInterval(securityCheck, 500);
    };

    init();

})();
/* undefined */
