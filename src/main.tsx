import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.PROD) {
	registerSW({
		immediate: true,
	});
} else if ("serviceWorker" in navigator) {
	navigator.serviceWorker.getRegistrations().then((regs) => {
		regs.forEach((r) => r.unregister());
	});
}

createRoot(document.getElementById("root")!).render(<App />);
