"use client";
import { useEffect } from "react";
export default function A11yEffects() {
  useEffect(() => {
    const onToggle = (e: Event) => {
      const t = e.target as HTMLDetailsElement;
      if (t?.tagName === "DETAILS") {
        t.querySelector("summary")?.setAttribute(
          "aria-expanded",
          t.open ? "true" : "false"
        );
      }
    };
    document.addEventListener("toggle", onToggle, true);
    return () => document.removeEventListener("toggle", onToggle, true);
  }, []);
  return null;
}
