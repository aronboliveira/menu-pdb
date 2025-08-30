"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import GenericError from "./GenericError";
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export default function ProductCard({
  p,
  query,
}: {
  p: Product;
  query: string;
}) {
  const [imgSrc, setImgSrc] = useState(p.img || "/menu/image-fail.webp");

  const highlight = (text?: string) => {
    if (!text) return null;
    if (!query) return text;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i < 0) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark>{text.slice(i, i + query.length)}</mark>
        {text.slice(i + query.length)}
      </>
    );
  };
  const ds = useMemo(() => {
    const base: Record<string, string> = { cat: p.ownerSect };
    for (const [k, v] of Object.entries(p.dataset || {})) base[k] = String(v);
    return base;
  }, [p]);
  useEffect(() => {
    const mode =
      p.ownerSect === "latas"
        ? "compact"
        : p.ownerSect === "gins"
        ? "muted"
        : undefined;
    const host = document.getElementById(p.id);
    if (host && mode) host.setAttribute("data-desc-mode", mode);
  }, [p.ownerSect, p.id]);

  const matches = [p.name, p.desc]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(query.toLowerCase());

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericError message="Erro carregando Dados de Produto" />
      )}
    >
      <li
        id={p.id}
        className={`product cat-${p.ownerSect}`}
        role="listitem"
        data-cat={p.ownerSect}
        data-tags={p.tags}
        data-hidden={matches ? "false" : "true"}
        {...Object.fromEntries(
          Object.entries(ds).map(([k, v]) => [`data-${k}`, v])
        )}
        title={`${p.name}`}
      >
        <details>
          <summary aria-expanded="false" title="Clique para ver detalhes">
            <figure className="m-0">
              <Image
                src={imgSrc}
                alt={`Imagem ilustrativa de ${p.name}`}
                height={255}
                width={191}
                loading="lazy"
                decoding="async"
                onError={() => setImgSrc("/menu/image-fail.webp")}
                style={{
                  objectFit: "cover",
                  borderRadius: 10,
                  boxShadow: "0 2px 12px rgba(0,0,0,.15)",
                }}
              />
            </figure>
            <div className="flex-grow-1">
              <div className="title h6 m-0">{highlight(p.name) ?? p.name}</div>
              {p.desc && (
                <small className="desc">{highlight(p.desc) ?? p.desc}</small>
              )}
              <div className="price">{BRL.format(p.price / 100)}</div>
            </div>
          </summary>
          <div
            className="mt-2"
            role="group"
            aria-label={`Informações de ${p.name}`}
          >
            <details>
              <summary className="text-body-secondary">
                <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
                Observações
              </summary>
              <p className="mb-0">
                <em>
                  Apresentação sujeita à disponibilidade. Álcool somente para
                  maiores de 18 anos.
                </em>
              </p>
            </details>
          </div>
        </details>
      </li>
    </ErrorBoundary>
  );
}
