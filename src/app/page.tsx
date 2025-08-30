"use client";
import { PRODUCTS } from "@/lib/data/products";
import { OwnerSect } from "@/lib/declarations/types";
import { IMenuCtx, TabItem } from "@/lib/declarations/interfaces";
import MainMenu from "@/components/MainMenu";
import FilterFieldset from "@/components/FilterFieldset";
import A11yEffects from "@/components/AllyEffect";
import React, {
  useEffect,
  useMemo,
  useState,
  Suspense,
  createContext,
  useCallback,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import LayoutWatcher from "@/components/LayoutWatcher";
export const sectCls = "prods-sect";
export const btnCls = "accordion-button";
export const btnSttCls = "collapsed";
export const STG_KEY = "pdbMenu";
export const STG_KEY_SV = "pdbMenuSaving";
export const SRC_INI = "";
export const STG_KEY_ST = "pdbMenuSections";
export const MenuCtx = createContext<IMenuCtx>({
  query: null,
  setQuery: null,
  filtered: null,
  setFilter: null,
  isFiltering: false,
  isSaving: false,
  setSaving: null,
} as unknown as IMenuCtx);
function ClientShell({ products }: { products: typeof PRODUCTS }) {
  const router = useRouter(),
    params = useSearchParams(),
    pathname = usePathname(),
    ordered: OwnerSect[] = useMemo(
      () => [
        "caipis",
        "energeticos",
        "gins",
        "latas",
        "longnecks",
        "especiais",
        "combos",
      ],
      []
    ),
    ICON_BY: Record<OwnerSect, string> = useMemo(
      () => ({
        caipis: "bi-cup-straw",
        energeticos: "bi-lightning-charge",
        gins: "bi-arrow-through-heart",
        latas: "bi-snow2",
        longnecks: "bi-stars",
        especiais: "bi-magic",
        combos: "bi-bag-plus",
      }),
      []
    ),
    [query, setQuery] = useState(SRC_INI),
    [activeTabs, setActiveTabs] = useState<OwnerSect[]>([]),
    [todosActive, setTodosActive] = useState<boolean>(true),
    [isFiltering, setFilter] = useState<boolean>(false),
    [isSaving, setSaving] = useState<boolean>(true),
    [areSectsStored, setSectsStore] = useState<boolean>(false),
    [isMounted, setMount] = useState<boolean>(false),
    sections: TabItem[] = useMemo(
      () =>
        ordered.map(id => ({
          id,
          label:
            (id === "caipis" && "Caipirinhas & Vodkas") ||
            (id === "energeticos" && "Energéticos & Copões") ||
            (id === "gins" && "Gins & Shots") ||
            (id === "latas" && "Latas & Garrafas") ||
            (id === "longnecks" && "Long Necks") ||
            (id === "especiais" && "Bebidas Especiais") ||
            "Combos",
          icon: ICON_BY[id],
        })),
      [ICON_BY, ordered]
    ),
    handleToggleTab = (id: OwnerSect) => {
      setActiveTabs(prev => {
        const next = prev.includes(id)
          ? prev.filter(x => x !== id)
          : [...prev, id];
        if (next.length === 0) setTodosActive(true);
        else setTodosActive(false);
        return next;
      });
    },
    handleAllClick = () => {
      setTodosActive(true);
      setActiveTabs([]);
    },
    setParams = useCallback(
      (
        patch: Partial<{ m: string; s: string; q: string }> = {},
        replace: boolean = true
      ) => {
        if (!isSaving) {
          const url = pathname;
          replace
            ? router.replace(url, { scroll: false })
            : router.push(url, { scroll: false });
          return;
        }
        const next = new URLSearchParams(params?.toString() || "");
        for (const [k, v] of Object.entries(patch))
          !v ? next.delete(k) : next.set(k, v);
        if (next.get("m") === "scroll") {
          next.delete("m");
          next.delete("s");
        } else if (next.get("s") === "todos") next.delete("s");
        const qs = next.toString(),
          url = qs ? `${pathname}?${qs}` : pathname;
        replace
          ? router.replace(url, { scroll: false })
          : router.push(url, { scroll: false });
      },
      [router, params, pathname, isSaving]
    );
  useEffect(() => {
    const vParams = new URLSearchParams(location.search),
      mode = vParams.get("m"),
      wasSaving = sessionStorage.getItem(STG_KEY_SV);
    setQuery(vParams.get("q") || SRC_INI);
    setFilter(mode === "filter");
    wasSaving ? setSaving(wasSaving === "true") : setSaving(true);
    setMount(true);
  }, []);
  useEffect(() => {
    const vParams = new URLSearchParams(location.search),
      s = vParams.get("s");
    setTodosActive(s === "todos");
    if (s && s !== "todos")
      setActiveTabs(
        s
          .split("_")
          .filter(x => ordered.includes(x as OwnerSect)) as OwnerSect[]
      );
  }, [isMounted, ordered]);
  useEffect(() => {
    const filtering = !todosActive && activeTabs.length > 0;
    document.body.classList.toggle("filtering", filtering);
  }, [todosActive, activeTabs.length]);
  useEffect(() => {
    const next = new URLSearchParams(params?.toString() || "");
    if (!next) return;
    const sects = next.get("s");
    if (!sects) return;
    const parsedSects = sects.split("_") as OwnerSect[];
    for (let i = 0; i < parsedSects.length; i++) {
      document
        .querySelector(`.tab-btn[data-to="${parsedSects[i]}"]`)
        ?.classList.add("active");
      // handleToggleTab(parsedSects[i]);
    }
  }, [params]);
  useEffect(() => {
    try {
      if (!isSaving) {
        setParams(undefined, true);
        sessionStorage.removeItem(STG_KEY);
        sessionStorage.setItem(STG_KEY_SV, "false");
        return;
      } else {
        setParams(
          {
            m: isFiltering ? "filter" : "scroll",
            s: todosActive
              ? "todos"
              : Array.from(document.querySelectorAll(".tab-btn.active"))
                  .map(b => b.getAttribute("data-to"))
                  .filter(id => id)
                  .join("-"),
            q: query,
          },
          true
        );
        sessionStorage.setItem(
          STG_KEY,
          JSON.stringify({ isSaving, isFiltering, query })
        );
        sessionStorage.setItem(STG_KEY_SV, "true");
      }
    } catch (e) {
      console.error("Error stringifying state for session storage:", e);
    }
  }, [isSaving, isFiltering, query, setParams, todosActive, activeTabs]);
  useEffect(() => {
    try {
      const storagedSections = sessionStorage.getItem(STG_KEY_ST);
      if (
        !storagedSections ||
        !Object.keys(JSON.parse(storagedSections)).length
      )
        sessionStorage.setItem(
          STG_KEY_ST,
          JSON.stringify(
            Object.fromEntries(
              Array.from(document.getElementsByClassName(sectCls))
                .map(s => s.querySelector(`.${btnCls}`))
                .map(b => [
                  b?.id ?? "null",
                  b?.classList.contains(btnSttCls) ? "0" : "1",
                ])
                .filter(([id]) => id !== "null")
            )
          )
        );
      else
        setTimeout(() => {
          for (const [btnId, state] of Object.entries(
            JSON.parse(storagedSections)
          )) {
            const btn = document.getElementById(btnId);
            if (!btn?.isConnected || !btn.clientHeight) continue;
            const clp = btn
              .closest(`.${sectCls}`)
              ?.querySelector(".accordion-collapse");

            if (state === "1") {
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
              }
            } else {
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
              }
            }
          }
        }, 350);
    } catch (e) {
      console.error(
        "Error retrieving state for accordions from session storage:",
        e
      );
    }
    if (sessionStorage.getItem(STG_KEY_ST)) setSectsStore(true);
  }, [isMounted]);
  useEffect(() => {
    setTimeout(() => {
      if (document?.body.getAttribute("listening-sect-changes") === "true")
        return;
      const sc = document.querySelectorAll(`.${btnCls}`);
      for (let i = 0; i < sc.length; i++) {
        const btn = sc[i];
        btn.addEventListener("pointerup", () => {
          try {
            const isOpen = btn.classList.contains(btnSttCls),
              stg = sessionStorage.getItem(STG_KEY_ST);
            if (!stg) return;
            const parsed = JSON.parse(stg);
            if (typeof parsed === "object" && parsed !== null) {
              sessionStorage.setItem(
                STG_KEY_ST,
                JSON.stringify({ ...parsed, [btn.id]: isOpen ? "1" : "0" })
              );
            }
          } catch (be) {
            console.warn("Error saving button state to storage:", be);
          }
        });
      }
      document.body.setAttribute("listening-sect-changes", "true");
    }, 300);
  }, [areSectsStored]);
  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <MenuCtx.Provider
        value={{
          query,
          setQuery,
          filtered: products.filter(p =>
            todosActive || activeTabs.length === 0
              ? true
              : activeTabs.includes(p.ownerSect)
          ),
          setFilter,
          isFiltering,
          isSaving,
          setSaving,
        }}
      >
        <A11yEffects />
        <section className={`mb-2 ${sectCls}`}>
          <p className="text-secondary m-2" style={{ fontSize: "0.7em" }}>
            Praça Jerusalém, Praia da Bica, Jardim Guanabara, Rio de Janeiro, RJ
          </p>
        </section>
        <hr style={{ marginLeft: "1.2rem", width: "95%", opacity: "0.1" }} />
        <section className={`mb-2 ${sectCls}`}>
          <p className="text-secondary m-2" style={{ fontSize: "0.7em" }}>
            <strong>Dica:</strong> clique nos cabeçalhos das seções para ver
            mais e nos <b>produtos</b> para ver mais
            <em>detalhes</em>.
          </p>
        </section>
        <FilterFieldset
          sections={sections}
          onSearchChange={setQuery}
          activeTabs={activeTabs}
          todosActive={todosActive}
          onToggleTab={handleToggleTab}
          onAllClick={handleAllClick}
        />
        <MainMenu products={products} query={query} />
      </MenuCtx.Provider>
    </ErrorBoundary>
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Bar da Tia da Praia da Bica",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      streetAddress: "Praça Jerusalém",
    },
    servesCuisine: "Bebidas e petiscos",
    url: "https://example.com/",
  };
  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <Suspense>
        <ClientShell products={PRODUCTS} />
      </Suspense>
      <LayoutWatcher />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </ErrorBoundary>
  );
}
