# LoanHub (ez-loan)

A single-page web app that helps users compare personal loans across Peruvian
banks and, for people who don't have any credit yet, guides them step by step
toward getting their first financial product, using real information from
each bank.

## Product goal

The app has two flows depending on the user's state:

- **Has an active credit**: a loan comparator — a table with bank, amount,
  interest rate, term, monthly payment and total cost, filterable by bank and
  searchable.
- **No active credit**: instead of an empty table, the app shows a per-bank
  educational panel with 3 entry-level products (build credit history, view
  loan plans and terms, fixed-term deposit), each with its benefits, the real
  steps to get it, an explainer video, and a button that goes to the bank's
  official website.

The "has credit / no credit" state is a **demo toggle** (visible in the
header, labeled `DEMO`) so both flows can be shown without needing a real
backend/authentication yet.

## Tech stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 19 + TypeScript | UI and typing |
| Build tool | Vite | dev server + bundling |
| Components/styling | Material UI (MUI) v9 | design system, custom dark theme (`src/theme.ts`) |
| Routing | React Router v7 (`react-router-dom`) | per-bank routes, see below |
| Icons | `react-icons` (Tabler `tb` set) | product, step and general UI icons |
| Form validation | `zod` | lead-capture form schema (salary, occupation, phone, email) |
| Notifications | `sonner` | success/error toasts on form submit |
| Educational content | YouTube (`youtube-nocookie.com` iframe) | one video per financial product |

## Project structure

```
src/
├── App.tsx                # Root layout: Header + sidebar + <Routes>
├── main.tsx                # Entry point: ThemeProvider, CssBaseline, BrowserRouter, Toaster
├── theme.ts                 # MUI theme (dark palette, teal primary color)
│
├── pages/
│   ├── HomePage.tsx          # "/" route: overview with all banks
│   └── BankPage.tsx          # "/bancos/:bankSlug" route: view filtered to one bank
│
├── components/
│   ├── Header.tsx                # Logo, DEMO credit-status toggle, avatar
│   ├── CreditStatusToggle.tsx    # "Has credit" / "No credit" switch
│   ├── BankFilterSidebar.tsx     # Bank filter (highlights the active bank based on the URL)
│   ├── AverageRateCard.tsx       # Average rate card
│   ├── SearchSortBar.tsx         # Table search + sort
│   ├── LoanTable.tsx             # Comparison table (Bank/Amount/Interest/Term/Payment/Total)
│   ├── LoanCard.tsx              # Summary cards (compact view of a loan)
│   ├── LoanBadge.tsx             # "Best Rate" / "Best Term" / "Best Total" badge
│   ├── ChooseBankPrompt.tsx      # Prompt to pick a bank when none is selected
│   ├── BankProductsPanel.tsx     # "No credit" panel: Product | How to get it | Video grid
│   ├── BankProductCard.tsx       # Product card (benefits + CTA to the bank)
│   ├── ProductStepsCard.tsx      # Numbered steps to get the product
│   ├── ProductVideoCard.tsx      # Card wrapping the YouTube video
│   ├── YouTubeEmbed.tsx          # Reusable responsive iframe
│   ├── productIcons.tsx          # Product category → icon map
│   └── LeadCaptureDialog.tsx     # Lead-capture modal (form + validation + toasts)
│
├── data/
│   ├── banks.ts               # Bank catalog: id, name, official url (single source of truth)
│   ├── bankProducts.ts        # Real products/steps/video per bank (BCP, Interbank, Scotiabank, BBVA)
│   └── loans.ts                # Mock loans for the comparison table
│
├── types/
│   ├── loan.ts                 # Loan type
│   ├── bankProduct.ts          # BankProduct type (category, features, steps, video, url…)
│   └── lead.ts                 # zod schema + type for the lead-capture form
│
├── hooks/
│   └── useBankReturnDetector.ts # Detects when the user comes back from the bank's website (visibilitychange)
│
└── utils/
    └── format.ts                # Currency, percentage and term formatting
```

## Core logic

### Per-bank routing

- `/` — overview, no bank filtered (full table, or, in "No credit" mode,
  `ChooseBankPrompt` inviting the user to pick a bank).
- `/bancos/:bankSlug` — a specific bank's view (`bcp`, `interbank`,
  `scotiabank`, `bbva`). Filters the table to that bank, or shows its
  `BankProductsPanel` when the user is in "No credit" mode.

The filter sidebar (`BankFilterSidebar`) doesn't keep the selected bank in
local state: it reads it straight from the URL with
`useMatch('/bancos/:bankSlug')` and navigates with `<Link>`. The URL is the
single source of truth, so refreshing the page or sharing the link keeps the
same bank selected.

> Note: `useMatch`/`useLocation` work anywhere under `<BrowserRouter>`, unlike
> `useParams`, which only resolves params inside the tree that `<Routes>`
> actually rendered for the active route. Since the sidebar lives as a
> sibling of `<Routes>` (not inside it), it uses `useMatch`.

### Per-bank "No credit" panel

`BankProductsPanel` takes a `bankId` and builds a 3-column grid aligned row by
row (Product | How to get it | Video) for each of that bank's 3 products,
using real, researched data from each institution (requirements, minimum
amounts, terms, reference rates). On narrow screens (`< lg`), the 3 columns
stack into a single column.

Each product (`BankProduct`) includes:
- `features`: 3 key benefits (checklist).
- `steps`: numbered, actionable steps to get it.
- `videoId` / `videoTitle`: embedded YouTube explainer video.
- `url`: the bank's official link for that specific product (CTA).

### Lead capture on return from the bank

When the user clicks a product's CTA (the bank's website opens in a new tab),
`useBankReturnDetector` marks a "pending return" state and listens for
`visibilitychange`. When the user comes back to the app's tab,
`LeadCaptureDialog` opens: a form (salary, occupation type, phone, email)
validated with `zod` (Peruvian phone format, email, reasonable amounts) with
feedback via `sonner` (success/error). Submission is simulated
(`console.log` + delay) as an integration point for a future backend.

### "Has credit / no credit" state (demo)

Lives in `App.tsx` (`hasActiveCredit`, default `true`) and is passed down to
`HomePage` / `BankPage`, which decide between showing the comparison table or
the bank's product panel. Controlled via the `DEMO` switch in the header
(`CreditStatusToggle`).

## Running the project

```bash
npm install       # install dependencies
npm run dev        # start the Vite dev server
npm run build       # type-check (tsc -b) + production build
npm run lint        # run ESLint
npm run preview      # serve the production build locally
```

## Notes and disclaimers

- Loan data (`data/loans.ts`) is **mock data**, not from a real API.
- Per-bank product data (`data/bankProducts.ts`) is based on publicly
  researched information from each institution, but amounts, rates and terms
  can change — the panel includes a disclaimer and always links to the
  corresponding bank's official website.
- There is no backend: lead capture and form submission are simulated on the
  client.
