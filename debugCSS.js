/** @type {HTMLElement | null} */

// biome-ignore lint/style/noVar: <explanation>
var infoBar = document.getElementById("debugCSSInfoBar");

function init() {
	if (!infoBar) return;
	infoBar.innerHTML = "<p>Hold Ctrl Key & hover on any element for detail</p>";
}
/** @param {any} e */
function updateInfoBar(e) {
	if (!e.target) return;
	const n = e.target.id.toString() || "";
	const t = e.target.classList.toString() || "";
	const o = e.target.nodeName.toLowerCase() || "";
	if (!infoBar) return !1;
	infoBar.innerHTML = `<p>Hovered Element Detail(s)= { Element Type: <b> ${o}</b>; Class(es) Applied: <b> ${t}</b>; Element Id: <b> ${n}</b>; }</p>`;
}

/** @param {any} e */
function showInfoBar(e) {
	if (!infoBar) return;
	infoBar.className = "";
	if (e.ctrlKey) infoBar.className = "show";
}
init();
document.addEventListener("mouseover", updateInfoBar, !1);
window.addEventListener("keydown", showInfoBar, !1);
window.addEventListener("keyup", showInfoBar, !1);
