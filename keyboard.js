window.addEventListener(
	"keydown",
	async (e) => {
		if (!e.altKey) return;
		if (!e.shiftKey) return;
		if (e.code !== "KeyC") return;
		e.preventDefault();
		await chrome.runtime.sendMessage({ command: "toggle-pin" });
	},
	{
		capture: true,
		passive: false,
		once: false,
	},
);
