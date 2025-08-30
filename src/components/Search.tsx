import { ErrorBoundary } from "react-error-boundary";
import GenericError from "./GenericError";
import { JSX, useContext, useEffect, useMemo, useState } from "react";
import { MenuCtx, SRC_INI } from "@/app/page";
import {
  AutoCompleteDropdownItem,
  IMenuCtx,
  SearchProps,
} from "@/lib/declarations/interfaces";
import { PRODUCTS } from "@/lib/data/products";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
export default function Search({ searchRef, fsId }: SearchProps): JSX.Element {
  const ctx = useContext<IMenuCtx>(MenuCtx),
    [open, setOpen] = useState<boolean>(false),
    maxItems = 9,
    listBoxId = `${fsId}-ac`;
  let query = SRC_INI,
    onSearchChange = null;
  if (ctx) {
    query = ctx.query;
    onSearchChange = ctx.setQuery;
  }
  const results: AutoCompleteDropdownItem[] = useMemo(() => {
    if (!query) return [];
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.ownerSect.toLowerCase().includes(query.toLowerCase()) ||
        (p.tags?.length &&
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    )
      .slice(0, maxItems)
      .map(p => ({
        id: p.id,
        name: p.name,
        img: p.img,
        ownerSect: p.ownerSect,
      }));
  }, [query]);
  useEffect(
    () => setOpen(Boolean(query) && results.length > 0),
    [query, results.length]
  );
  function handleSelect(it: AutoCompleteDropdownItem) {
    setOpen(false);
    it.ownerSect &&
      document.getElementById(it.ownerSect)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    document
      .getElementById(it.id)
      ?.animate([{ outline: "2px solid var(--brand)" }, { outline: "0" }], {
        duration: 700,
      });
  }
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericError message="Erro ao carregar busca!" />
      )}
    >
      <search role="search" aria-label="Buscar no cardápio" className="mb-3">
        <div className="position-relative">
          <div className="input-group">
            <span className="input-group-text" id={`${fsId}-searchIcon`}>
              <i className="bi bi-search" aria-hidden="true" />
            </span>
            <input
              ref={searchRef}
              type="search"
              className="form-control"
              placeholder="Busque por palavras-chave"
              aria-describedby={`${fsId}-searchIcon`}
              aria-controls={listBoxId}
              aria-expanded={open}
              role="combobox"
              title="Digite para buscar no cardápio"
              autoComplete="on"
              aria-autocomplete="list"
              value={query}
              onChange={e =>
                onSearchChange && onSearchChange(e.currentTarget.value)
              }
              onFocus={() => results.length && setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 100)}
            />
          </div>
          <AutoCompleteDropdown
            anchorRef={searchRef}
            items={results}
            open={open}
            onSelect={handleSelect}
            listboxId={listBoxId}
            maxItems={maxItems}
          />
        </div>
      </search>
    </ErrorBoundary>
  );
}
