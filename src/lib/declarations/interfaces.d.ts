import { Dispatch, SetStateAction } from "react";
import { OwnerSect } from "./types";
export type TabItem = { id: OwnerSect; label: string; icon: string };
export interface LayoutWatcherProps {
  selector?: string;
  intervalMs?: number;
}
export interface FilterFieldsetProps {
  sections: TabItem[];
  onSearchChange(q: string): void;
  activeTabs: OwnerSect[];
  todosActive: boolean;
  onToggleTab(id: OwnerSect): void;
  onAllClick(): void;
}
export interface SearchProps {
  fsId: string;
  searchRef: React.RefObject<HTMLInputElement | null>;
}
export interface TabBtnsProps {
  allId: string;
  cls: string;
  todosActive: boolean;
  onAllClick: () => any;
  onToggleTab: (id: OwnerSect) => any;
  sections: TabItem[];
  activeTabs: OwnerSect[];
}
export interface AutoCompleteDropdownItem {
  id: string;
  name: string;
  img?: string;
  ownerSect?: string;
}
export interface AutoCompleteDropdownProps {
  anchorRef: React.RefObject<HTMLElement | HTMLInputElement | null>;
  items: AutoCompleteDropdownItem[];
  open: boolean;
  onSelect: (item: AutoCompleteDropdownItem) => any;
  listboxId: string;
  maxItems: number;
}
export interface IMenuCtx {
  query: string;
  setQuery: (query: string) => void;
  filtered: Product[];
  setFilter: Dispatch<SetStateAction<boolean>> | null;
  isFiltering: boolean;
  isSaving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>> | null;
}
export interface SectionProps {
  owner: OwnerSect;
  title: string;
  products: Product[];
  query: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  desc?: string;
  img?: string;
  ownerSect: OwnerSect;
  tags?: string[];
  dataset?: Record<string, string | number | boolean>;
}
