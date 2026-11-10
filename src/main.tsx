import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

/*
 * Deep-link restore for GitHub Pages: public/404.html saved the originally
 * requested path (e.g. /releases/citadel) in sessionStorage and redirected to
 * the app root. Apply it here before the router mounts, so refreshes and
 * shared links on a sub-path deployment resolve to the right page.
 */
const savedPath = sessionStorage.getItem("qrs-spa-path");
if (savedPath) {
  sessionStorage.removeItem("qrs-spa-path");
  const here = window.location.pathname.replace(/index\.html$/, "");
  const base = import.meta.env.BASE_URL;
  if (here === base) {
    history.replaceState(null, "", savedPath);
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
