// You can fetch intern data dynamically here using an ID or URL param
console.log("Verification Page Loaded");
// Optional: Disable right click or copy
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
  if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c')) {
    e.preventDefault();
  }
};
