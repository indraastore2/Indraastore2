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

(function() {
    setInterval(function() {
        Function('debugger')();
    }, 50);
})();

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
            window.location.reload(); 
        }
        devtools.isOpen = true;
    } else {
        devtools.isOpen = false;
    }
}, 500);

console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold;");
console.log("%cFitur ini dilindungi oleh sistem keamanan Indraa Store.", "font-size: 18px; color: yellow;");
