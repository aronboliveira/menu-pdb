"use client";
import React, { useId } from "react";
import ProductCard from "./ProductCard";
import { SectionProps } from "@/lib/declarations/interfaces";

export default function Section({
  owner,
  title,
  products,
  query,
}: SectionProps) {
  const accId = useId().replace(/:/g, ""),
    headerId = `${owner}-h`,
    panelId = `${owner}-c`;
  return (
    <section
      id={owner}
      className="mb-3 prods-sect"
      aria-labelledby={headerId}
      data-owner-sect={owner}
      data-title={title}
    >
      <div className="accordion" id={`acc-${accId}`}>
        <div className="accordion-item">
          <h3 className="accordion-header" id={headerId}>
            <button
              className="accordion-button collapsed"
              id={`btn-${accId}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${panelId}`}
              aria-expanded="false"
              aria-controls={panelId}
              title={`Dobrar/Expandir seção: ${title}`}
            >
              <i
                className={`bi ${
                  owner === "latas"
                    ? "bi-snow2"
                    : owner === "longnecks"
                    ? "bi-stars"
                    : owner === "gins"
                    ? "bi-cup"
                    : owner === "energeticos"
                    ? "bi-lightning-charge"
                    : owner === "caipis"
                    ? "bi-cup-straw"
                    : owner === "combos"
                    ? "bi-bag-plus"
                    : "bi-stars"
                } me-2`}
                aria-hidden="true"
              />
              {title}
            </button>
          </h3>

          <div
            id={panelId}
            className="accordion-collapse collapse"
            aria-labelledby={headerId}
            data-bs-parent={`#acc-${accId}`}
          >
            <div className="accordion-body pt-2">
              <ul
                className="grid-products"
                role="list"
                aria-label={`Lista de produtos da seção ${title}`}
              >
                {products
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(p => (
                    <ProductCard key={p.id} p={p} query={query} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
