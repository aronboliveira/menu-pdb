"use client";

import { LayoutWatcherProps } from "@/lib/declarations/interfaces";
import { useEffect } from "react";

export function ensureUniformTabBtnSizes(selector = ".tab-btn"): void {
  const all = document.getElementById("tab-all"),
    buttons = [...document.querySelectorAll<HTMLElement>(selector), all].filter(
      Boolean
    ) as Array<HTMLElement>;
  if (buttons.length === 0) return;
  if (buttons.every(b => !b.classList.contains("active")) && all) {
    all.classList.add("active");
    all.dispatchEvent(new Event("click"));
  }
  for (const btn of buttons) {
    btn.style.width = "";
    btn.style.height = "";
  }
  let maxW = 0;
  let maxH = 0;
  for (const btn of buttons) {
    const rect = btn.getBoundingClientRect();
    const visible = rect.width > 0 && rect.height > 0;
    if (!visible) continue;
    const w = btn.clientWidth;
    const h = btn.clientHeight;
    if (w > maxW) maxW = w;
    if (h > maxH) maxH = h;
  }
  for (const btn of buttons) {
    btn.style.width = `${Math.ceil(maxW)}px`;
    btn.style.height = `${Math.ceil(maxH)}px`;
  }
}

export default function LayoutWatcher({
  selector = ".tab-btn",
  intervalMs = 500,
}: LayoutWatcherProps) {
  useEffect(() => {
    if (document.body.getAttribute("data-checking-sizes") === "true") return;
    document.body.setAttribute("data-checking-sizes", "true");
    ensureUniformTabBtnSizes(selector);
    const id = window.setInterval(() => {
      ensureUniformTabBtnSizes(selector);
    }, intervalMs);
    return () => {
      window.clearInterval(id);
      document.body.setAttribute("data-checking-sizes", "false");
    };
  }, [selector, intervalMs]);
  return (
    <span
      id="layout-watcher"
      aria-hidden="true"
      data-role="layout-watcher"
      style={{ display: "none" }}
    />
  );
}
