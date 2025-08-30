import {
  AutoCompleteDropdownItem,
  AutoCompleteDropdownProps,
} from "@/lib/declarations/interfaces";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";
import st from "@/styles/modules/ac-dropdown.module.scss";
import useMount from "@/lib/hooks/useMount";
const AutoCompleteDropdown = ({
  anchorRef,
  items,
  open,
  onSelect,
  listboxId,
  maxItems,
}: AutoCompleteDropdownProps) => {
  const isMounted = useMount(),
    boxRef = useRef<HTMLUListElement>(null),
    highlightedRef = useRef<number>(0),
    itemsRef = useRef<AutoCompleteDropdownItem[]>(items),
    onSelectRef = useRef<(item: AutoCompleteDropdownItem) => any>(onSelect),
    [highlighted, setHighlightedIndex] = useState<number>(0),
    visible = useMemo(
      () => (open && items.length > 0 ? items.slice(0, maxItems) : []),
      [open, maxItems, items]
    ),
    onKeyDown = useCallback(
      (e: any): void => {
        const list = itemsRef.current;
        if (!list.length) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          highlightedRef.current = (highlightedRef.current + 1) % list.length;
          setHighlightedIndex(highlightedRef.current);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          highlightedRef.current =
            (highlightedRef.current - 1 + list.length) % list.length;
          setHighlightedIndex(highlightedRef.current);
        } else if (e.key === "Enter") {
          e.preventDefault();
          onSelectRef.current(list[highlightedRef.current]);
        } else if (e.key === "Escape") anchorRef.current?.blur();
      },
      [anchorRef]
    ),
    onDocClick = useCallback(
      (ev: MouseEvent | React.MouseEvent) => {
        const box = boxRef.current,
          inp = anchorRef.current;
        if (
          !(ev.currentTarget instanceof Node) ||
          !(box instanceof Node && box.isConnected) ||
          !(inp instanceof Node && inp.isConnected)
        )
          return;
        if (box.contains(ev.currentTarget) || inp.contains(ev.currentTarget))
          return;
      },
      [anchorRef, boxRef]
    );
  useEffect(() => {
    const inp = anchorRef.current;
    if (!inp?.isConnected) return;
    for (const [k, v] of Object.entries({
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": listboxId,
      "aria-expanded": (open && visible.length).toString(),
      "aria-haspopup": "listbox",
    }))
      inp.setAttribute(k, v);
  }, [anchorRef, listboxId, open, visible]);
  useEffect(() => {
    const inp = anchorRef.current;
    if (!inp?.isConnected) return;
    if (visible.length)
      inp.setAttribute(
        "aria-activedescendant",
        `${listboxId}-opt-${highlighted}`
      );
    else inp.removeAttribute("aria-activedescendant");
  }, [visible, highlighted, listboxId, anchorRef]);
  useEffect(() => {
    const inp = anchorRef.current;
    if (!inp?.isConnected) return;
    if (inp.getAttribute("listening-keydown") !== "true") {
      inp.addEventListener("keydown", onKeyDown);
      inp.setAttribute("listening-keydown", "true");
    }
    return () => inp.removeEventListener("keydown", onKeyDown);
  }, [anchorRef, onKeyDown]);
  useEffect(() => {
    if (!window || document?.body?.getAttribute("listening-click") === "true")
      return;
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [onDocClick]);
  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      {!isMounted || !open || !visible?.length ? (
        <></>
      ) : (
        <ul
          ref={boxRef}
          id={listboxId}
          role="listbox"
          className={`list-group position-absolute w-100 shadow ac-popover ${st["ac-dropdown-ul"]}`}
        >
          {visible.map((it, i) => {
            return (
              <li
                key={it.id}
                data-id={it.id}
                data-to={it.ownerSect ?? ""}
                title={it.name}
                role="option"
                aria-selected={highlighted === i}
                id={`${listboxId}-opt-${i}`}
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                  highlighted === i ? "active" : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(i)}
                onMouseDown={e => e.preventDefault()}
                onClick={() => onSelect(it)}
              >
                <Image
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  src={it.img || "/menu/image-fail.webp"}
                  alt={it.name}
                  onError={e => {
                    e.currentTarget.src = "/menu/image-fail.webp";
                  }}
                  className={`${st["ac-item-img"]}`}
                />
                <strong className={`text-truncate ${st["ac-item-name"]}`}>
                  <em>{it.name}</em>
                </strong>
              </li>
            );
          })}
        </ul>
      )}
    </ErrorBoundary>
  );
};
export default memo(AutoCompleteDropdown);
