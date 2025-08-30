"use client";
import { MenuCtx } from "@/app/page";
import { IMenuCtx, TabBtnsProps } from "@/lib/declarations/interfaces";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericError from "./GenericError";
import useMount from "@/lib/hooks/useMount";
export default function TabBtns({
  allId,
  cls,
  todosActive,
  onAllClick,
  onToggleTab,
  sections,
  activeTabs,
}: TabBtnsProps) {
  const isMounted = useMount();
  const ctx = useContext<IMenuCtx>(MenuCtx);
  let isFiltering = false;
  if (ctx) isFiltering = ctx.isFiltering;
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericError message="Erro ao carregar botões de abas!" />
      )}
    >
      {" "}
      {!isMounted ? (
        <></>
      ) : (
        <>
          <button
            type="button"
            id={allId}
            className={`nav-link ${todosActive ? "active" : ""}`}
            aria-pressed={todosActive}
            data-to="top"
            title="Mostrar todas as seções"
            onClick={() => {
              isFiltering
                ? onAllClick()
                : window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <i className="bi bi-grid me-1" aria-hidden="true" />
            Todos
          </button>
          {sections.map(s => {
            const isActive = activeTabs.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                className={`${cls} nav-link ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
                aria-controls={`tab-${s.id}`}
                data-to={s.id}
                title={`Mostrar/ocultar seção: ${s.label}`}
                onClick={() => {
                  isFiltering
                    ? onToggleTab(s.id)
                    : document.getElementById(s.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "center",
                      });
                }}
              >
                <span style={{ maxWidth: "90%" }}>
                  <i className={`bi ${s.icon} me-1`} aria-hidden="true" />
                  <span>{s.label}</span>
                </span>
              </button>
            );
          })}
        </>
      )}
    </ErrorBoundary>
  );
}
