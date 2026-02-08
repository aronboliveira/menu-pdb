# Bar Tropical — Cardápio Digital (Next.js)

<details open>
<summary><strong>Português (primário)</strong></summary>

https://drinks-tia-pdb.netlify.app/

## 📋 Visão geral

Aplicação de **cardápio digital** para um bar de rua em clima tropical, construída em **Next.js (App Router) + TypeScript**.  
Foco em **SEO**, **acessibilidade (WAI-ARIA)**, UI responsiva (**Bootstrap 5 + Bootstrap Icons via CDN**) e **modularização**.

> ⚠️ Este app **não** é carrinho de compras. Ele exibe produtos, preços e categorias, com busca, tabs e navegação suave.

---

## ✨ Principais recursos

- **Next.js App Router** com **Metadata API** e **JSON-LD** (`schema.org/BarOrPub`) para SEO sólido.
- **Bootstrap 5** + **Bootstrap Icons** via CDN (leve e sem configuração extra).
- HTML semântico: `<menu>`, `<section>`, `<fieldset>`, `<legend>`, `<details>`, `<summary>`, `<address>`, `<search>` (_com fallback tipado_).
- **Tabs de categorias** + **Busca** no mesmo `<fieldset>`:
  - **Modo “Rolagem”** (padrão): clica → rola até a seção; `active` é **apenas cosmético** e é limpo quando o usuário rola manualmente.
  - **Modo “Filtragem”**: clica → oculta as demais seções **via CSS** usando `data-hidden="true"`.
  - **Switch “Salvar buscas”**: quando ligado (default), salva `q` no **`sessionStorage`** e reflete em **`?q=`**; ao desligar, limpa ambos.
- **Autocomplete (Combobox + Listbox WAI-ARIA)**: dropdown flutuante sob o input com miniatura e nome do produto; suporte a teclado (↑/↓/Enter/Esc).
- **LayoutWatcher** (ghost `<span>` ao final do `body`): revalida tamanhos das `tab-btns` a cada **500ms** e equaliza **largura/altura**.
- **Sem destruir elementos ao filtrar**: alternância por `data-*` + CSS (melhora performance e evita perda de foco/estado).
- **Fallback de imagem**: fotos de pessoas → `public/avatar.png`.

---

✴️ **Componentes principais**

- `MainMenu` — usa `<menu>` como contêiner de alto nível.
- `Section` — uma seção dobrável (accordion do Bootstrap) por categoria.
- `ProductCard` — item individual com `<details>` + `<summary>`.
- `FilterFieldset` — fieldset com **switch de modo**, **switch de “Salvar buscas”**, **busca** e **tabs** (cada botão tem `data-to` e rola/filtra).
- `A11yEffects` — sincroniza `aria-expanded` quando `<details>` abre/fecha.
- `LayoutWatcher` — insere um ghost `<span>` e cria o intervalo de equalização de botões.

---

## 🔧 Requisitos

- Node **18+**
- Gerenciador de pacotes: **npm** (recomendado) / npm / yarn

---

## 🔎 Busca + Autocomplete (Combobox WAI-ARIA)

- O input (`type="search"`) recebe `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` e, quando há destaque, `aria-activedescendant`.
- O popup é uma `ul` com `role="listbox"`, cada `li` é `role="option"` contendo **miniatura (32×32)** e **nome**.
- Teclado:
  - **↑/↓** navega
  - **Enter** seleciona
  - **Esc** fecha
- Implementação em `components/AutocompleteDropdown.tsx` (componente separado) e integração no `FilterFieldset`.

---

## 🧭 Modo de interação (Rolagem × Filtragem)

**Switch “Modo”** no `FilterFieldset`:

- **Rolagem (default)** — ao clicar na tab:
  - Rola para `#<section-id>` (ou topo, no “Todos”).
  - Aplica `active` **apenas visualmente**; quando o usuário rolar manualmente, `active` é removido automaticamente.
- **Filtragem** — ao clicar na tab:
  - Marca as outras `section` com `data-hidden="true"`.
  - CSS define `display:none` para `[data-hidden="true"]`.
  - “Todos” limpa `data-hidden`.

**Benefício:** o DOM **não é desmontado** → preserva foco, estados internos e performance.

---

## 🔗 Query params (URL)

- `m` → `"scroll"` (omitido por padrão) ou `"filter"`.
- `t` → `"cervejas" | "gins" | ... | "todos"`.
  - Em **Rolagem**, é cosmético/deeplink; ao rolar manualmente, o parâmetro é limpo.
  - Em **Filtragem**, **controla visibilidade**.
- `q` → string da busca.

**Arrays:** use **chave repetida** (ex.: `?s=cervejas&s=gins`) e leia com `URLSearchParams.getAll("s")` — evita delimitadores e mantém legível.

---

## 💾 Switch “Salvar buscas”

- **Ligado (default):** espelha `q` no `sessionStorage` (chave `menu:q`) **e** atualiza `?q=...`.
- **Desligado:** remove `menu:q` do `sessionStorage` **e** limpa `?q` da URL (sem apagar o conteúdo do input).
- Preferência do usuário persistida em `sessionStorage` (`menu:saveQ = "1"/"0"`).

---

## 📐 Equalização de botões (LayoutWatcher)

- `components/LayoutWatcher.tsx` injeta um `<span style="display:none">` ao final do `body`.
- No `useEffect`, verifica `body.dataset.checkingSizes` para **evitar múltiplos intervals** em re-render.
- A cada **500ms** chama `ensureUniformTabBtnSizes(".tab-btns")`, que:
  1. Limpa `style.width/height` dos botões.
  2. Mede `clientWidth/clientHeight`.
  3. Aplica o **maior** `width/height` a todos (em `px`).

---

## 🎨 Estilos (SCSS)

`app/globals.scss` define **tokens** (`--brand`, `--amber`, `--radius`, etc.), utiliza **nesting** e ajusta:

- Accordion do Bootstrap (sem seta e sem aumentar padding);
- Grid de produtos responsivo;
- Estados e efeitos (`::selection`, `::placeholder`, `:target`, focus ring).

---

## ♿ Acessibilidade

- Marcação semântica: `<menu role="list">`, `<section>`, `<fieldset>/<legend>`, `<details>/<summary>`, `<address>`.
- Tabs com `role="tablist"`/`role="tab"`, `aria-controls`, `aria-selected`.
- `A11yEffects` sincroniza `aria-expanded` em `<summary>` quando `<details>` muda.
- `title` e `aria-label`/`aria-describedby` nos pontos interativos (ícones/inputs).
- Dropdown segue o padrão **Combobox + Listbox** (WAI-ARIA APG).

---

## 🔍 SEO

- **Metadata API** (`app/layout.tsx`): `title`, `description`, `keywords`, OpenGraph/Twitter, `alternates.canonical`.
- **JSON-LD** em `page.tsx`.
- **URLs limpas** (omitimos `m=scroll` e `t=todos` por padrão).

---

## 🧾 Licença & créditos

- Licença: **MIT** (ou a que você preferir).
- Autoria / créditos de UI e estrutura: **Developed by Aron Barbosa** — GitHub: [`aronboliveira`](https://github.com/aronboliveira)

</details>

<details>
<summary><strong>English</strong></summary>
## 📋 Overview

A **digital menu** application for a tropical street bar, built with **Next.js (App Router) + TypeScript**.  
Focus on **SEO**, **accessibility (WAI-ARIA)**, responsive UI (**Bootstrap 5 + Bootstrap Icons via CDN**), and **modularization**.

https://drinks-tia-pdb.netlify.app/

> ⚠️ This app is **not** a shopping cart. It displays products, prices, and categories with search, tabs, and smooth navigation.

---

## ✨ Key Features

- **Next.js App Router** with **Metadata API** and **JSON-LD** (`schema.org/BarOrPub`) for strong SEO.
- **Bootstrap 5** + **Bootstrap Icons** via CDN (lightweight, zero config).
- Semantic HTML: `<menu>`, `<section>`, `<fieldset>`, `<legend>`, `<details>`, `<summary>`, `<address>`, `<search>` (_with a typed fallback_).
- **Category tabs** + **Search** in the same `<fieldset>`:
  - **“Scroll” Mode** (default): click → scroll to the section; `active` is **cosmetic only** and is cleared when the user scrolls manually.
  - **“Filter” Mode**: click → hides other sections **via CSS** using `data-hidden="true"`.
  - **“Save searches” switch**: when on (default), persists `q` in **`sessionStorage`** and mirrors it to **`?q=`**; when off, clears both.
- **Autocomplete (WAI-ARIA Combobox + Listbox)**: floating dropdown under the input with a thumbnail and product name; keyboard support (↑/↓/Enter/Esc).
- **LayoutWatcher** (ghost `<span>` at the end of `body`): rechecks tab button sizes every **500ms** and equalizes **width/height**.
- **No DOM destruction when filtering**: toggle via `data-*` + CSS (better performance; no focus/state loss).
- **Image fallback**: people photos → `public/avatar.png`.

---

✴️ **Core Components**

- `MainMenu` — uses `<menu>` as the top-level container.
- `Section` — one collapsible section (Bootstrap accordion) per category.
- `ProductCard` — individual item with `<details>` + `<summary>`.
- `FilterFieldset` — fieldset with **mode switch**, **“Save searches” switch**, **search**, and **tabs** (each button has `data-to` and scrolls/filters).
- `A11yEffects` — syncs `aria-expanded` when `<details>` opens/closes.
- `LayoutWatcher` — injects a ghost `<span>` and runs the equalization interval.

---

## 🔧 Requirements

- Node **18+**
- Package manager: **npm** (recommended) / yarn / pnpm

---

## 🔎 Search + Autocomplete (WAI-ARIA Combobox)

- The input (`type="search"`) uses `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, and when an item is highlighted, `aria-activedescendant`.
- The popup is a `ul` with `role="listbox"`, each `li` is `role="option"` containing a **32×32 thumbnail** and **name**.
- Keyboard:
  - **↑/↓** navigate
  - **Enter** selects
  - **Esc** closes
- Implemented in `components/AutocompleteDropdown.tsx` (separate component) and integrated into `FilterFieldset`.

---

## 🧭 Interaction Mode (Scroll × Filter)

**“Mode” switch** in `FilterFieldset`:

- **Scroll (default)** — when clicking a tab:
  - Scrolls to `#<section-id>` (or to the top for “All”).
  - Applies `active` **cosmetically only**; when the user scrolls manually, `active` is cleared automatically.
- **Filter** — when clicking a tab:
  - Marks other `section` elements with `data-hidden="true"`.
  - CSS sets `display:none` for `[data-hidden="true"]`.
  - “All” clears `data-hidden`.

**Benefit:** the DOM **is not unmounted** → preserves focus, internal state, and performance.

---

## 🔗 Query Params (URL)

- `m` → `"scroll"` (omitted by default) or `"filter"`.
- `t` → `"cervejas" | "gins" | ... | "todos"` (“beers”, “gins”, …, “all”).
  - In **Scroll** mode it’s cosmetic/deeplink; when the user scrolls manually, the param is cleared.
  - In **Filter** mode it **controls visibility**.
- `q` → search string.

**Arrays:** use **repeated keys** (e.g., `?s=cervejas&s=gins`) and read with `URLSearchParams.getAll("s")` — avoids delimiters and stays readable.

`app/(hooks)/useQuerySync.ts` provides the `setParams(patch)` helper to update the URL via `router.replace` while preserving other params.

---

## 💾 “Save Searches” Switch

- **On (default):** mirrors `q` to `sessionStorage` (key `menu:q`) **and** updates `?q=...`.
- **Off:** removes `menu:q` from `sessionStorage` **and** clears `?q` from the URL (without wiping the input’s current value).
- User preference persisted in `sessionStorage` (`menu:saveQ = "1"/"0"`).

---

## 📐 Button Equalization (LayoutWatcher)

- `components/LayoutWatcher.tsx` injects a `<span style="display:none">` at the end of `body`.
- In its `useEffect`, it checks `body.dataset.checkingSizes` to **avoid multiple intervals** on re-render.
- Every **500ms** it calls `ensureUniformTabBtnSizes(".tab-btns")`, which:
  1. Clears inline `style.width/height` on the buttons.
  2. Measures `clientWidth/clientHeight`.
  3. Applies the **largest** width/height to all (in `px`).

---

## 🎨 Styles (SCSS)

`app/globals.scss` defines **tokens** (`--brand`, `--amber`, `--radius`, etc.), uses **nesting**, and adjusts:

- Bootstrap accordion (no arrow and no extra padding);
- Responsive product grid;
- States & effects (`::selection`, `::placeholder`, `:target`, focus ring).

---

## ♿ Accessibility

- Semantic markup: `<menu role="list">`, `<section>`, `<fieldset>/<legend>`, `<details>/<summary>`, `<address>`.
- Tabs with `role="tablist"`/`role="tab"`, `aria-controls`, `aria-selected`.
- `A11yEffects` syncs `aria-expanded` on `<summary>` when `<details>` changes.
- `title` and `aria-label`/`aria-describedby` on interactive spots (icons/inputs).
- Dropdown follows the **Combobox + Listbox** pattern (WAI-ARIA APG).

---

## 🔍 SEO

- **Metadata API** (`app/layout.tsx`): `title`, `description`, `keywords`, OpenGraph/Twitter, `alternates.canonical`.
- **JSON-LD** in `page.tsx`.
- **Clean URLs** (omit `m=scroll` and `t=todos` by default).

---

## 🧾 License & Credits

- License: **MIT** (or your preferred license).
- UI & structure by: **Developed by Aron Barbosa** — GitHub: [`aronboliveira`](https://github.com/aronboliveira)

</details>
