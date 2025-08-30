import React from "react";
import Section from "./Section";
import { Product } from "@/lib/declarations/interfaces";
import { OwnerSect } from "@/lib/declarations/types";

const LABELS: Record<OwnerSect, string> = {
  caipis: "Caipirinhas & Vodkas",
  energeticos: "Energéticos & Copões",
  gins: "Gins & Drinks",
  latas: "Latas & Garrafas",
  longnecks: "Long Necks",
  especiais: "Bebidas Especiais",
  combos: "Combos",
};

export default function MainMenu({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) {
  const grouped = new Map<OwnerSect, Product[]>();
  for (const p of products)
    grouped.set(p.ownerSect, [...(grouped.get(p.ownerSect) ?? []), p]);
  return (
    <menu
      className="menu-root list-unstyled m-0"
      role="list"
      aria-label="Cardápio principal"
      data-component="MainMenu"
    >
      {[...grouped.entries()].map(([owner, list]) => (
        <Section
          key={owner}
          owner={owner}
          title={LABELS[owner]}
          products={list}
          query={query}
        />
      ))}
    </menu>
  );
}
