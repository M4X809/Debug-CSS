const infoBar = document.getElementById("debugCSSInfoBar");

function init() {
	if (!infoBar) return;
	infoBar.innerHTML = "<p>Hold Ctrl Key & hover on any element for detail</p>"
}

function updateInfoBar(e: any) {
	const n = e.target.id.toString() || "";
	const t = e.target.classList.toString() || "";
	const o = e.target.nodeName.toLowerCase() || "";
	if (!infoBar) return !1;
	infoBar.innerHTML = `<p>Hovered Element Detail(s)= { Element Type: <b> ${o}</b>; Class(es) Applied: <b> ${t}</b>; Element Id: <b> ${n}</b>; }</p>`
}

function showInfoBar(e: any) {
	if (!infoBar) return;
	infoBar.className = '';
	if (e.ctrlKey) {
		infoBar.className = 'show';
	}
}

init();
document.addEventListener('mouseover', updateInfoBar, false);
window.addEventListener('keydown', showInfoBar, false);
window.addEventListener("keyup", showInfoBar, !1);