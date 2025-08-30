import { createContext } from "react";
import { IMenuCtx } from "../declarations/interfaces";

export const MenuCtx = createContext<IMenuCtx>({
  query: null,
  setQuery: null,
  filtered: null,
  setFilter: null,
  isFiltering: false,
  isSaving: false,
  setSaving: null,
} as unknown as IMenuCtx);
