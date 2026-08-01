# ObraJá — Marketplace de Materiais de Construção

## Visão do Projeto

**ObraJá** é um marketplace multi-camada no modelo iFood aplicado à construção civil brasileira.
Conecta indústrias, lojas de materiais, construtoras e consumidores finais em uma única plataforma,
com delivery próprio e por terceiros.

---

## Papéis de Usuário (Roles)

| Role | Pode Comprar De | Pode Vender Para |
|------|----------------|-----------------|
| **Indústria / Fábrica** | — | Lojas, Construtoras |
| **Loja de Materiais** | Indústrias | Construtoras, Consumidores |
| **Construtora** | Lojas, Indústrias | — |
| **Consumidor Final** | Lojas | — |
| **Entregador Próprio** (da loja) | — | — |
| **Entregador Terceiro** | — | — |

---

## Identidade Visual (Design System)

### Paleta de Cores

```
Primary Orange : #F05A28   (laranja principal — CTA, botões, destaques)
Deep Orange   : #CC4010   (hover, sombra, variante escura)
Black         : #1A1A1A   (textos, navbar, footer)
Yellow Accent : #FFB800   (badges, alertas, estrelas de rating)
White         : #FFFFFF   (backgrounds principais)
Light Gray    : #F5F5F5   (backgrounds secundários, cards)
Mid Gray      : #9E9E9E   (texto secundário, placeholders)
```

### Tipografia
- **Títulos**: Inter Bold / Montserrat Bold
- **Corpo**: Inter Regular
- **Destaques**: Inter SemiBold

### Logo
Variação com cubo hexagonal geométrico (formas triangulares intercaladas laranja/preto).
Arquivos em: `assets/brand/`

---

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTES                          │
│  Mobile (React Native)  │  Web (Next.js)            │
└────────────┬────────────┴──────────────┬────────────┘
             │                           │
             ▼                           ▼
┌─────────────────────────────────────────────────────┐
│              API Gateway (NestJS)                   │
│  Auth │ Catalog │ Orders │ Delivery │ Payments      │
└────────────┬──────────────────────────┬─────────────┘
             │                          │
     ┌───────▼────────┐        ┌────────▼──────────┐
     │  PostgreSQL     │        │  Redis (Cache +   │
     │  (Supabase)     │        │  Queue com Bull)  │
     └───────┬────────┘        └───────────────────┘
             │
     ┌───────▼────────┐
     │  Serviços       │
     │  S3 │ FCM │ Maps│
     └────────────────┘
```

---

## Stack Tecnológico

### Mobile — React Native (Expo)
```
expo                      ~51.x     # Framework base
expo-router               ~3.x      # Navegação file-based
nativewind                ~4.x      # Tailwind para React Native
react-query               ~5.x      # Data fetching + cache
zustand                   ~4.x      # State management
react-hook-form           ~7.x      # Formulários
zod                       ~3.x      # Validação de schemas
expo-location                       # Geolocalização
expo-notifications                  # Push notifications
react-native-maps                   # Mapas e rastreamento
@stripe/stripe-react-native         # Pagamento
mercadopago-sdk-react-native        # Pagamento (BR)
socket.io-client                    # Tempo real (pedidos/chat)
expo-image-picker                   # Upload de fotos
@shopify/flash-list                 # Listas performáticas
```

### Web — Next.js (Admin + Dashboard Loja/Indústria)
```
next                      15.x      # Framework web
tailwindcss               3.x       # Estilização
shadcn/ui                           # Componentes UI
@tanstack/react-query     5.x       # Data fetching
zustand                   4.x       # State management
react-hook-form + zod               # Formulários e validação
recharts                            # Dashboards e gráficos
next-auth                           # Autenticação web
socket.io-client                    # Tempo real
uploadthing                         # Upload de arquivos
```

### Backend — NestJS (Node.js + TypeScript)
```
@nestjs/core              10.x      # Framework
@nestjs/typeorm                     # ORM
@nestjs/jwt                         # Autenticação JWT
@nestjs/swagger                     # Documentação API
postgresql (via Supabase)           # Banco de dados principal
redis                               # Cache e filas
bull / bullmq                       # Filas de trabalho (pedidos, notif.)
socket.io                           # WebSockets (tracking, chat)
stripe                              # Pagamentos internacionais
mercadopago                         # Pagamentos Brasil
@sendgrid/mail                      # Emails transacionais
firebase-admin                      # Push notifications (FCM)
@google/maps                        # Rotas e geocodificação
aws-sdk (S3)                        # Armazenamento de imagens
```

### Banco de Dados — PostgreSQL (Supabase)
- Row Level Security (RLS) para isolamento multi-tenant
- Realtime para updates de pedidos ao vivo
- Storage integrado para imagens de produtos

---

## Módulos do Sistema

### 1. Auth & Usuários
- Cadastro por role (indústria, loja, construtora, consumidor, entregador)
- Verificação de CNPJ via BrasilAPI
- Verificação de CPF para consumidores
- 2FA por SMS (Twilio) e Email
- OAuth (Google, Apple)

### 2. Catálogo de Produtos
- Hierarquia: Categoria > Subcategoria > Produto
- Atributos dinâmicos (ex: cimento: resistência, tipo; tinta: litros, cor)
- Variantes de produto (tamanho, cor, unidade)
- Precificação diferenciada B2B / B2C
- Gestão de estoque em tempo real

### 3. Marketplace / Pedidos
- Carrinho multi-fornecedor
- Sistema de cotação para grandes volumes
- Pedido mínimo configurável por vendedor
- Aprovação de pedido para B2B
- Histórico completo de transações

### 4. Delivery
- **Modo 1 — Frota Própria**: loja gerencia seus entregadores
- **Modo 2 — Terceiros**: integração com transportadoras e apps de frete
- Rastreamento em tempo real via GPS
- Cálculo de frete por distância + peso + volume
- Agendamento de entrega

### 5. Pagamentos
- Pix (instantâneo)
- Cartão de crédito/débito
- Boleto bancário
- Crédito em conta (faturado, para B2B)
- Split automático: ObraJá retém comissão, repassa ao vendedor

### 6. Painel do Vendedor (Loja/Indústria)
- Dashboard com métricas (pedidos, receita, produtos mais vendidos)
- Gestão de catálogo e estoque
- Gestão de pedidos e entregas
- Configuração de frota/entregadores
- Relatórios financeiros

### 7. Painel Admin (ObraJá)
- Aprovação de novos vendedores (validação CNPJ)
- Gestão de comissões por categoria
- Moderação de produtos e avaliações
- Relatórios gerais da plataforma
- Gestão de disputas / SAC

---

## Modelo de Negócio (Comissões)

| Transação | Comissão ObraJá |
|-----------|----------------|
| Indústria → Loja | 3–5% |
| Loja → Construtora | 5–8% |
| Loja → Consumidor Final | 8–12% |
| Taxa de delivery terceiro | 15–20% do frete |

---

## Estrutura de Pastas

```
obraja/
├── apps/
│   ├── mobile/          # React Native (Expo) — consumidor, construtora
│   ├── mobile-seller/   # React Native (Expo) — loja, indústria
│   ├── mobile-delivery/ # React Native (Expo) — entregadores
│   ├── web-admin/       # Next.js — painel ObraJá
│   └── web-seller/      # Next.js — painel loja/indústria
├── packages/
│   ├── api/             # NestJS backend
│   ├── database/        # Migrations, seeds, schemas TypeORM
│   ├── ui/              # Componentes compartilhados
│   └── shared/          # Types, utils, validações Zod compartilhadas
├── assets/
│   └── brand/           # Logos, ícones, guia de marca
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── design-system.md
└── CLAUDE.md            # Este arquivo
```

---

## Fases de Desenvolvimento

### Fase 1 — MVP (3–4 meses)
- [ ] Auth + cadastro de roles
- [ ] Catálogo básico (loja → consumidor)
- [ ] Pedido simples + Pix
- [ ] Delivery próprio básico
- [ ] App mobile consumidor (iOS + Android)
- [ ] Painel web da loja

### Fase 2 — Expansão B2B (2–3 meses)
- [ ] Fluxo Indústria → Loja
- [ ] Fluxo Construtora
- [ ] Sistema de cotação
- [ ] Faturamento B2B
- [ ] App mobile vendedor

### Fase 3 — Delivery Avançado (2 meses)
- [ ] Integração com transportadoras
- [ ] Rastreamento GPS em tempo real
- [ ] App entregador
- [ ] Agendamento de entrega

### Fase 4 — Crescimento (contínuo)
- [ ] Programa de fidelidade
- [ ] Cupons e promoções
- [ ] API pública para ERPs de construtoras
- [ ] IA para recomendação de produtos

---

## Regras do Projeto

- Stack: TypeScript em tudo (monorepo com Turborepo)
- Testes: Jest + Testing Library (cobertura mínima 80%)
- CI/CD: GitHub Actions → Vercel (web) + EAS (mobile)
- Lint: ESLint + Prettier
- Commits: Conventional Commits
- Nunca commitar credenciais ou arquivos .env
- Design sempre seguindo o Design System ObraJá (paleta acima)
