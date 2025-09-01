"use client";
import React, {
  useContext,
  useId,
  useRef,
  useEffect,
  JSX,
  useCallback,
} from "react";
import { FilterFieldsetProps, IMenuCtx } from "@/lib/declarations/interfaces";
import { MenuCtx } from "@/lib/contexts/MenuCtx";
import {
  STG_KEY,
  SRC_INI,
  btnSttCls,
  btnCls,
  STG_KEY_ST,
} from "@/lib/data/states";
import TabBtns from "./TabBtns";
import Search from "./Search";
import { ErrorBoundary } from "react-error-boundary";
import GenericError from "./GenericError";
import { closeAccordion, openAccordion } from "@/lib/utils";

export default function FilterFieldset({
  sections,
  activeTabs,
  todosActive,
  onToggleTab,
  onAllClick,
}: FilterFieldsetProps): JSX.Element {
  const fsId = useId().replace(/:/g, ""),
    cls = "tab-btn",
    allId = "tab-all",
    ctx = useContext<IMenuCtx>(MenuCtx),
    searchRef = useRef<HTMLInputElement>(null),
    filterRef = useRef<HTMLInputElement>(null),
    saveRef = useRef<HTMLInputElement>(null),
    updateSectStorage = useCallback((btns: Element[]) => {
      try {
        sessionStorage.setItem(
          STG_KEY_ST,
          JSON.stringify(
            Object.fromEntries(
              btns
                .map(b => [
                  b?.id ?? "null",
                  b?.classList.contains(btnSttCls) ? "0" : "1",
                ])
                .filter(([id]) => id !== "null")
            )
          )
        );
      } catch (e) {
        console.warn(`Failed to update storage: ${e}`);
      }
    }, []),
    openAll = useCallback(() => {
      const btns = document.getElementsByClassName(btnCls);
      for (let i = 0; i < btns.length; i++)
        btns[i] instanceof HTMLButtonElement && openAccordion(btns[i]);
      updateSectStorage(Array.from(btns));
    }, [updateSectStorage]),
    closeAll = useCallback(() => {
      const btns = document.getElementsByClassName(btnCls);
      for (let i = 0; i < btns.length; i++)
        btns[i] instanceof HTMLButtonElement && closeAccordion(btns[i]);
      updateSectStorage(Array.from(btns));
    }, [updateSectStorage]);
  let isFiltering = false,
    setFilter = null,
    isSaving = false,
    setSave = null,
    setQuery = null;
  if (ctx) {
    isFiltering = ctx.isFiltering;
    setFilter = ctx.setFilter;
    isSaving = ctx.isSaving;
    setSave = ctx.setSaving;
    setQuery = ctx.setQuery;
  }
  useEffect(() => {
    if (!searchRef.current) return;
    try {
      const savedData = sessionStorage.getItem(STG_KEY);
      if (!savedData) return;
      const parsedData = JSON.parse(savedData);
      if (setQuery) setQuery(parsedData["search"] || SRC_INI);
      else searchRef.current.value = parsedData["search"] || SRC_INI;
    } catch (e) {
      console.error("Error parsing session storage data:", e);
    }
  }, [searchRef, setQuery]);
  return (
    <form
      className="mb-3 filter-fieldset"
      aria-labelledby={`${fsId}-legend`}
      id={fsId}
    >
      <fieldset
        className="p-3 rounded-3 border"
        aria-describedby={`${fsId}-help`}
      >
        <Search searchRef={searchRef} fsId={fsId} />
        <div id="controlPanel" className="d-flex align-items-center gap-3 mb-3">
          <div
            className="form-check form-switch m-0"
            title="Alterna entre Rolagem (padrão) e Filtragem"
          >
            <ErrorBoundary
              FallbackComponent={() => (
                <GenericError message="Ops! Algo deu errado aqui!" />
              )}
            >
              <input
                ref={filterRef}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`${fsId}-mode`}
                aria-describedby={`${fsId}-mode-help`}
                checked={isFiltering}
                onChange={() => {
                  if (setFilter) {
                    setFilter(!isFiltering);
                    onAllClick();
                  }
                }}
                style={
                  isFiltering
                    ? {
                        backgroundColor: "#db97db",
                        borderColor: "transparent",
                      }
                    : {}
                }
              />
              <label className="form-check-label" htmlFor={`${fsId}-mode`}>
                Modo: <strong>{isFiltering ? "Filtragem" : "Rolagem"}</strong>
              </label>
            </ErrorBoundary>
          </div>
          <div
            className="form-check form-switch m-0"
            title="Alterna entre Salvar ou não as pesquisas"
          >
            <ErrorBoundary
              FallbackComponent={() => (
                <GenericError message="Ops! Algo deu errado aqui!" />
              )}
            >
              <input
                ref={saveRef}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`${fsId}-save`}
                aria-describedby={`${fsId}-save-help`}
                checked={isSaving}
                onChange={() => setSave && setSave(!isSaving)}
                style={
                  isSaving
                    ? {
                        backgroundColor: "#db97db",
                        borderColor: "transparent",
                      }
                    : {}
                }
              />
              <label className="form-check-label" htmlFor={`${fsId}-save`}>
                <strong>Salvar pesquisas</strong>
              </label>
            </ErrorBoundary>
          </div>
        </div>
        <legend id={`${fsId}-legend`} className="h6 fw-bold mb-3">
          <i
            className={`bi ${isFiltering ? "bi-funnel" : "bi-cursor"} me-1`}
            aria-hidden="true"
          />
          {isFiltering ? `Filtragem` : `Navegar por seção`}
        </legend>
        <fieldset id="sectBtns">
          <ErrorBoundary
            FallbackComponent={() => (
              <GenericError message="Ops! Algo deu errado aqui!" />
            )}
          >
            <button
              type="button"
              className="btn-control btn btn-info"
              onPointerUp={openAll}
            >
              Abrir tudo
            </button>
            <button
              type="button"
              className="btn-control btn btn-secondary"
              onPointerUp={closeAll}
            >
              Fechar tudo
            </button>
          </ErrorBoundary>
        </fieldset>
        <div className="tabgrid" role="group" aria-label="Navegar por seção">
          <TabBtns
            allId={allId}
            cls={cls}
            todosActive={todosActive}
            onAllClick={onAllClick}
            onToggleTab={onToggleTab}
            sections={sections}
            activeTabs={activeTabs}
          />
        </div>
        <p id={`${fsId}-help`} className="text-muted mt-2 mb-0">
          <small id="clickTip">
            {isFiltering
              ? `Toque ou Clique nas botões com os nomes das Seções para ver os produtos delas. “Todos” mostra todas!`
              : `Toque ou Clique em um dos nomes das Seções para rolar para a escolhida automaticamente. “Todos” retorna para o topo!`}
          </small>
        </p>
      </fieldset>
    </form>
  );
}
