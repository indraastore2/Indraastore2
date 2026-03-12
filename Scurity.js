document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || 
    (e.ctrlKey && e.key.toLowerCase() === "u")
  ) {
    e.preventDefault();
    window.location.href = "warning.html"; 
  }
});

let devtoolsOpen = false;
const threshold = 160;

setInterval(() => {
  if (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      window.location.href = "warning.html";
    }
  } else {
    devtoolsOpen = false;
  }
}, 500);