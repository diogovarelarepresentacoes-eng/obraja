#!/bin/bash
# ObraJá — Build e start dos apps no servidor
set -e

cd /var/www/obraja

echo "========================================"
echo " ObraJá — Build de Produção"
echo "========================================"

# ─── Criar .env da API ────────────────────────────────────────────────────────
if [ ! -f "packages/api/.env" ]; then
  JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
  DB_PASS=${DB_PASSWORD:-"ObraJa@2026!"}
  cat > packages/api/.env << ENV
DATABASE_URL=postgresql://obraja_user:${DB_PASS}@localhost:5432/obraja_db
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=$(openssl rand -base64 64 | tr -d '\n')
NODE_ENV=production
PORT=3333
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=https://loja.divixstudio.io,https://admin.divixstudio.io
ENV
  echo "Criado packages/api/.env (JWT_SECRET gerado aleatoriamente)"
  echo "ATENÇÃO: guarde o conteúdo de packages/api/.env em local seguro!"
fi

# ─── Criar .env dos apps Next.js ──────────────────────────────────────────────
DOMAIN=${1:-"SEU_DOMINIO"}
API_URL="https://api.${DOMAIN}"

for app in web-customer web-seller web-admin; do
  if [ ! -f "apps/${app}/.env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=${API_URL}" > "apps/${app}/.env.local"
    echo "Criado apps/${app}/.env.local"
  fi
done

# ─── Instalar dependências ────────────────────────────────────────────────────
echo "Instalando dependências (pnpm)..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# ─── Build da API NestJS ──────────────────────────────────────────────────────
echo "Build da API..."
cd packages/api
npm run build 2>/dev/null || npx nest build
cd /var/www/obraja

# ─── Build dos apps Next.js ───────────────────────────────────────────────────
echo "Build do web-customer..."
cd apps/web-customer && npm run build && cd /var/www/obraja

echo "Build do web-seller..."
cd apps/web-seller && npm run build && cd /var/www/obraja

echo "Build do web-admin..."
cd apps/web-admin && npm run build && cd /var/www/obraja

# ─── Iniciar com PM2 ──────────────────────────────────────────────────────────
echo "Iniciando processos com PM2..."
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo ""
echo "========================================"
echo " Build completo!"
echo " pm2 status  — ver processos"
echo " pm2 logs    — ver logs"
echo "========================================"
pm2 status
