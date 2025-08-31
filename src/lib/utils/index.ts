import { btnCls, btnSttCls, sectCls, STG_KEY_ST } from "../data/states";
import { OwnerSect } from "../declarations/types";

export function closeAccordion(btn: Element): boolean {
  const clp = btn.closest(`.${sectCls}`)?.querySelector(".accordion-collapse");
  if (clp?.isConnected && clp instanceof HTMLElement) {
    btn.classList.add(btnSttCls);
    btn.setAttribute("aria-expanded", "false");
    clp.style.height = `${clp.scrollHeight}px`;
    clp.classList.remove("collapse", "show");
    clp.classList.add("collapsing");
    clp.offsetHeight;
    clp.style.height = "0px";
    setTimeout(() => {
      clp.classList.remove("collapsing");
      clp.classList.add("collapse");
      clp.style.height = "";
    }, 350);
    return true;
  }
  return false;
}
export function openAccordion(btn: Element): boolean {
  const clp = btn.closest(`.${sectCls}`)?.querySelector(".accordion-collapse");
  if (clp?.isConnected && clp instanceof HTMLElement) {
    btn.classList.remove(btnSttCls);
    btn.setAttribute("aria-expanded", "true");
    clp.classList.remove("show");
    clp.classList.add("collapsing");
    clp.style.height = "0px";
    clp.offsetHeight;
    const scrollHeight = clp.scrollHeight;
    clp.style.height = `${scrollHeight}px`;
    setTimeout(() => {
      clp.classList.remove("collapsing");
      clp.classList.add("collapse", "show");
      clp.style.height = "";
    }, 350);
    return true;
  }
  return false;
}
export function enforceAccordionOpening(
  sect: HTMLElement,
  activeTabs: OwnerSect[]
): void {
  const btn = sect.querySelector(`.${btnCls}`),
    isActive = activeTabs.includes(sect.id as OwnerSect);
  btn instanceof HTMLElement && btn.focus();
  btn?.classList.contains(btnSttCls) && btn.classList.remove(btnSttCls);
  setTimeout(() => {
    const btn = document.getElementById(sect.id)?.querySelector(`.${btnCls}`);
    btn instanceof HTMLElement && btn.blur();
  }, 1000);
  try {
    const stg = sessionStorage.getItem(STG_KEY_ST);
    if (!stg) return;
    sessionStorage.setItem(
      STG_KEY_ST,
      JSON.stringify({
        ...JSON.parse(stg),
        [sect.id]: isActive ? "1" : "0",
      })
    );
  } catch (e) {
    console.warn(`Failed to update storage: ${e}`);
  }
}
export function iconAnimateClick(ev: Event | React.MouseEvent): void {
  let tg = ev.currentTarget as HTMLElement;
  const id = tg.id;
  tg.setAttribute("data-animating-click", "true");
  for (const [k, v] of Object.entries({
    transform: "translateY(-1px)",
    background: "darken(transparent, 5%)",
    opacity: 1,
  }))
    (tg.style as any)[k] = v;
  setTimeout(() => {
    if (!tg?.isConnected) tg = document.getElementById(id) as HTMLElement;
    if (!tg?.isConnected) return;
    for (const [k, v] of Object.entries({
      transform: "translateY(0)",
      background: "transparent",
      opacity: 0.5,
    }))
      (tg.style as any)[k] = v;
    tg.removeAttribute("data-animating-click");
  }, 1000);
}
export function iconAnimateMouseEnter(ev: Event | React.MouseEvent): void {
  const tg = ev.currentTarget as HTMLElement;
  if (tg.getAttribute("data-animating-click") === "true") return;
  for (const [k, v] of Object.entries({
    transform: "translateY(-2px)",
    background: "darken(transparent, 5%)",
    opacity: 1,
  }))
    (tg.style as any)[k] = v;
}
export function iconAnimateMouseLeave(ev: Event | React.MouseEvent): void {
  const tg = ev.currentTarget as HTMLElement;
  if (tg.getAttribute("data-animating-click") === "true") return;
  for (const [k, v] of Object.entries({
    transform: "translateY(0)",
    background: "transparent",
    opacity: 0.5,
  }))
    (tg.style as any)[k] = v;
}
export function iconAnimateTouchStart(ev: Event | React.TouchEvent): void {
  const tg = ev.currentTarget as HTMLElement;
  if (tg.getAttribute("data-animating-click") === "true") return;
  for (const [k, v] of Object.entries({
    transform: "translateY(-2px)",
    background: "darken(transparent, 5%)",
    opacity: 1,
  }))
    (tg.style as any)[k] = v;
}
export function iconAnimateTouchEnd(ev: Event | React.TouchEvent): void {
  let tg = ev.currentTarget as HTMLElement;
  const id = tg.id;
  tg.setAttribute("data-animating-click", "true");
  for (const [k, v] of Object.entries({
    transform: "translateY(-1px)",
    background: "darken(transparent, 5%)",
    opacity: 1,
  }))
    (tg.style as any)[k] = v;
  setTimeout(() => {
    if (!tg?.isConnected) tg = document.getElementById(id) as HTMLElement;
    if (!tg?.isConnected) return;
    for (const [k, v] of Object.entries({
      transform: "translateY(0)",
      background: "transparent",
      opacity: 0.5,
    }))
      (tg.style as any)[k] = v;

    tg.removeAttribute("data-animating-click");
  }, 1000);
}
export function iconAnimeTouchCancel(ev: Event | React.TouchEvent): void {
  const tg = ev.currentTarget as HTMLElement;
  if (tg.getAttribute("data-animating-click") === "true") return;
  for (const [k, v] of Object.entries({
    transform: "translateY(0)",
    background: "transparent",
    opacity: 0.5,
  }))
    (tg.style as any)[k] = v;
}
