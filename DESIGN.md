# Design

<!-- impeccable:design-schema 1 -->

## Visual World

**Operate** — painel de gestão e ferramentas. **Persuade** — landing page e cadastro.

Tom: direto, construção civil brasileira. Sem ornamentos. Cor com propósito: laranja sinaliza ação e estado ativo.

## Color

### Brand Palette
| Token | Hex | Uso |
|---|---|---|
| `primary` | `#F05A28` | CTAs, botões primários, links de ação, ícones ativos |
| `primary-dark` | `#CC4010` | Hover de botões primários |
| `primary-light` | `#FF7A4D` | Estados pressed, variações claras |
| `accent-yellow` | `#FFB800` | Badges de rating, alertas de atenção, estrelas |
| `black` | `#1A1A1A` | Textos, sidebar, navbar, títulos |
| `black-soft` | `#2D2D2D` | Hover items sidebar, backgrounds secundários escuros |
| `white` | `#FFFFFF` | Backgrounds principais de cards e páginas |
| `gray-light` | `#F8F8F8` | Background de app, headers de tabela |
| `gray-border` | `#E5E5E5` | Bordas de cards, divisores |
| `gray-divider` | `#F2F2F2` | Divisores sutis, hover de linhas |
| `gray-mid` | `#9E9E9E` | Texto secundário, placeholders, labels |

### Status Colors (sempre com ícone SVG, nunca emoji)
| Estado | Cor dot | Classe Tailwind |
|---|---|---|
| Online / Disponível | `#22C55E` | `text-green-600` |
| Em rota / Atenção | `#F05A28` | `text-orange-600` |
| Crítico / Folga | `#EF4444` | `text-red-500` |
| Alerta / Warning | `#FFB800` | `text-yellow-600` |

### Semantic Colors (fora da paleta brand, apenas para semântica)
- Sucesso positivo: `bg-emerald-50 text-emerald-700`
- Negativo/erro badge: `bg-red-50 text-red-600`
- Info: `bg-blue-50 text-blue-700`

## Typography

**Font Stack**: `var(--font-sans), system-ui, sans-serif` (Geist Sans via Next.js Google Fonts)

| Uso | Classe | Notas |
|---|---|---|
| Display / H1 landing | `text-5xl md:text-7xl font-black tracking-tight` | |
| H1 de página (header) | `text-xl font-black text-[#1A1A1A] tracking-tight` | |
| H2 de seção | `text-4xl md:text-5xl font-black` | |
| Título de card/painel | `text-base font-bold text-[#1A1A1A]` | |
| Subtítulo / descrição | `text-sm text-[#9E9E9E]` | |
| Valor KPI | `text-2xl font-black text-[#1A1A1A]` | |
| Label de tabela | `text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide` | |
| Corpo de tabela | `text-sm text-[#1A1A1A]` | |
| Badge/chip | `text-xs font-bold px-2 py-0.5 rounded-full` | |

Não usar `font-mono` para IDs de pedido — são dados de referência, não código.

## Spacing & Layout

- **Sidebar width**: 240px (web-seller), 240px (web-admin)
- **Main padding**: `p-6` (web-seller), `p-8` (web-admin)
- **Card gap**: `gap-4` a `gap-6`
- **Card padding**: `p-5` a `p-6`
- **Card border-radius**: `rounded-xl` (12px) ou `rounded-2xl` (16px)
- **Border**: `border border-[#E5E5E5]` — somente 1px, sem colored border-left acima de 1px

## Components

### Sidebar (dark)
- Background: `#1A1A1A`
- Nav item inactive: `text-[#9E9E9E] hover:bg-white/5 hover:text-white`
- Nav item active: `bg-[#F05A28]/20 text-white` — **sem border-left**; ícone ativo em `text-[#F05A28]`
- Dividers: `border-white/10`

### KPI Card
- `bg-white rounded-xl border border-[#E5E5E5] p-5`
- Ícone: container `w-10 h-10 rounded-xl` com cor de fundo `{color}18` e SVG colorido
- **Sem emoji** — sempre SVG com `stroke="currentColor"` e strokeWidth 1.5–1.75

### Status Dot
- Componente `<StatusDot>`: `inline-block w-2 h-2 rounded-full` com `backgroundColor` via style prop
- **Nunca usar** `🟢 🟠 🔴 🟡`

### Button
- Primary: `bg-[#F05A28] text-white hover:bg-[#CC4010] transition-colors font-semibold`
- Secondary: `bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200`
- Danger: `text-red-400 hover:bg-red-500/10`
- Tamanho padrão: `px-3 py-1.5 rounded-lg text-xs font-semibold` (tabela), `px-4 py-2 rounded-lg text-sm font-bold` (header)

### Badge / Chip de status
- `inline-flex px-2 py-1 rounded-full text-xs font-semibold`
- Cores: colored bg + matching text, usando as classes semânticas acima
- **Sem border-left colorido** acima de 1px

### Table
- Header: `bg-[#F8F8F8] border-b border-[#E5E5E5]`
- Rows: `divide-y divide-[#F2F2F2]`, hover `hover:bg-[#FAFAFA]`
- Sticky para mobile: `overflow-x-auto`

## Icons

**Sistema**: SVG inline com `strokeWidth="1.75"`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `fill="none"`, `stroke="currentColor"`.

Tamanhos: 16px (labels/badges), 18px (sidebar nav), 20px (KPI cards, headers), 28px (role cards).

**Nunca**: emoji Unicode, SVG imitando imagens, monospace como "estilo técnico".

## Motion

- Hover de links/botões: `transition-colors` ou `transition-all` (200ms implícito Tailwind)
- Hover de cards: `hover:shadow-lg transition-all` ou `hover:scale-[1.02]`
- Pulse de mapa: `animate-pulse` apenas em indicadores de posição GPS
- Bounce: `animate-bounce` apenas no scroll indicator do hero
- Sem `ease-in` — usar `ease-out` implícito do Tailwind

## Apps & Surfaces

| App | Mode | Platform |
|---|---|---|
| `web-seller` landing (`/`) | Persuade | web |
| `web-seller` dashboard (`/store/*`, `/industry/*`) | Operate | web |
| `web-admin` dashboard (`/dashboard`, etc.) | Operate | web |
| `web-seller` cadastro (`/cadastro/*`) | Persuade → Operate | web |
| `mobile` / `mobile-seller` / `mobile-delivery` | Operate | adaptive (iOS + Android) |
