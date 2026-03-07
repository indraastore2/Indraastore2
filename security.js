document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", function(e) {

    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        alert("Inspect tidak diizinkan!");
    }

});

let devtoolsOpen = false;
setInterval(function () {

    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            alert("DevTools terdeteksi!");
            location.reload();
        }

    } else {
        devtoolsOpen = false;
    }

}, 1000);

setInterval(function () {
    debugger;
}, 200);

(function () {
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            location.reload();
        }
    });
    console.log(element);
})();
