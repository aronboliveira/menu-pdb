import { createContext } from "react";
import { IMenuCtx } from "../declarations/interfaces";
import { OwnerSect } from "../declarations/types";

export const MenuCtx = createContext<IMenuCtx>({
  query: null,
  setQuery: null,
  filtered: null,
  setFilter: null,
  isFiltering: false,
  isSaving: false,
  setSaving: null,
  activeTabs: [] as OwnerSect[],
} as unknown as IMenuCtx);
