# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

**Consumidor Final** — pessoa física comprando materiais para obra ou reforma em casa, via mobile app, em contexto móvel e frequentemente em obra.

**Construtora / Empreiteira** — responsável de compras ou engenheiro, desktop ou mobile, comprando em volume com cotação e faturamento.

**Loja de Materiais** — proprietário ou gerente de loja, desktop (painel web), gerenciando catálogo, pedidos, entregadores e receita.

**Indústria / Fábrica** — vendedor ou representante, desktop, vendendo para lojas com gestão B2B.

**Entregador** — motorista próprio da loja ou terceirizado, mobile app, recebendo e executando entregas com GPS.

**Admin ObraJá** — equipe interna, desktop, aprovando cadastros, moderando, gerindo comissões e disputas.

## Product Purpose

Marketplace multi-camada de materiais de construção civil no Brasil, modelo iFood: conecta indústrias, lojas, construtoras e consumidores em uma cadeia única, com logística própria e terceirizada integrada. Sucesso = pedido feito, entregue e pago, sem fricção, do celular de uma obra.

## Positioning

Único marketplace de construção civil brasileiro que cobre toda a cadeia B2B e B2C (indústria → loja → construtora/consumidor) com delivery rastreado em tempo real integrado à plataforma — não apenas um catálogo ou um comparador de preços.

## Operating Context

- Compras frequentemente ocorrem em canteiro de obra: conexão instável, sol, luvas, pressa.
- Lojistas acessam o painel no balcão ou no escritório de uma loja física.
- Entregadores estão em movimento, com GPS ativo.
- Construtoras compram em volume com aprovação interna e boleto/faturado.
- Materiais de construção têm variantes complexas (tipo, resistência, unidade, cor, volume).

## Capabilities and Constraints

- Monorepo Turborepo: 3 apps mobile (Expo), 2 apps web (Next.js 15), 1 API (NestJS)
- Design system compartilhado: paleta laranja/preto/branco, Inter/Montserrat
- Pagamentos: Pix, cartão, boleto, crédito faturado — split automático com comissão ObraJá
- Multi-tenant: cada loja vê apenas seus dados (RLS Supabase)
- App mobile: React Native com NativeWind (Tailwind)
- Web: Next.js + Tailwind + shadcn/ui
- TypeScript em toda a stack

## Brand Commitments

**Nome:** ObraJá

**Paleta confirmada:**
- Primary Orange: `#F05A28` — CTAs, botões, destaques
- Deep Orange: `#CC4010` — hover, variante escura
- Black: `#1A1A1A` — textos, navbar, footer
- Yellow Accent: `#FFB800` — badges, alertas, estrelas de rating
- White: `#FFFFFF` — backgrounds principais
- Light Gray: `#F5F5F5` — backgrounds secundários, cards
- Mid Gray: `#9E9E9E` — texto secundário, placeholders

**Tipografia:**
- Títulos: Inter Bold / Montserrat Bold
- Corpo: Inter Regular
- Destaques: Inter SemiBold

**Logo:** cubo hexagonal geométrico com formas triangulares intercaladas laranja/preto. Em `assets/brand/`.

**Voz:** direta, prática, brasileira. Fala o idioma do construtor — sem jargão tech, sem formalidade desnecessária.

## Evidence on Hand

- CLAUDE.md com arquitetura completa, módulos, stack e modelo de negócio
- Apps parcialmente implementados: web-seller, web-admin, mobile-delivery completos; mobile-seller e mobile em desenvolvimento
- Design system documentado no CLAUDE.md (paleta, tipografia, logo)

## Product Principles

1. **Obra não espera** — cada fluxo deve ser completável em menos de 3 toques ou 3 cliques no estado mais comum.
2. **Confiança visível** — CNPJ verificado, entregador rastreado, pedido confirmado: o design torna o trust explícito, não implícito.
3. **Cadeia inteira, uma tela** — o vendedor vê o pedido do comprador e o entregador na mesma visão; o comprador vê o estoque real do fornecedor.
4. **B2B sem burocracia** — cotação, aprovação e faturamento devem ter a mesma fluidez do B2C.
5. **Cor com propósito** — o laranja ObraJá ganha atenção em ambiente de obra; cada uso de cor comunica ação ou estado, nunca decoração.

## Accessibility & Inclusion

- Contraste mínimo 4.5:1 em todo texto de interface
- Tap targets mínimo 44×44pt no mobile
- Suporte a leitores de tela (acessibilidade semântica)
- Interface funcional sob sol forte (cores com contraste adequado)
