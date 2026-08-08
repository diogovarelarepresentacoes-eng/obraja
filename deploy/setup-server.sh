#!/bin/bash
# ObraJá — Setup completo do servidor Hostinger VPS
# Roda como root no servidor

set -e

echo "========================================"
echo " ObraJá — Setup do Servidor"
echo "========================================"

# ─── 1. Atualizar sistema ─────────────────────────────────────────────────────
echo "[1/10] Atualizando pacotes..."
apt-get update -y && apt-get upgrade -y

# ─── 2. Node.js 20 ───────────────────────────────────────────────────────────
echo "[2/10] Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# ─── 3. pnpm ─────────────────────────────────────────────────────────────────
echo "[3/10] Instalando pnpm..."
npm install -g pnpm@11.18.0

# ─── 4. PM2 ──────────────────────────────────────────────────────────────────
echo "[4/10] Instalando PM2..."
npm install -g pm2

# ─── 5. Nginx ─────────────────────────────────────────────────────────────────
echo "[5/10] Instalando Nginx..."
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

# ─── 6. PostgreSQL ────────────────────────────────────────────────────────────
echo "[6/10] Instalando PostgreSQL 16..."
apt-get install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql

# Criar database e usuário
sudo -u postgres psql << 'PSQL'
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'obraja_user') THEN
    CREATE USER obraja_user WITH PASSWORD 'ObraJa@2026!';
  END IF;
END
$$;
DROP DATABASE IF EXISTS obraja_db;
CREATE DATABASE obraja_db OWNER obraja_user;
GRANT ALL PRIVILEGES ON DATABASE obraja_db TO obraja_user;
PSQL

echo "PostgreSQL configurado: banco=obraja_db usuario=obraja_user"

# ─── 7. Redis ─────────────────────────────────────────────────────────────────
echo "[7/10] Instalando Redis..."
apt-get install -y redis-server
systemctl enable redis-server
systemctl start redis-server

# ─── 8. Certbot (SSL) ────────────────────────────────────────────────────────
echo "[8/10] Instalando Certbot..."
apt-get install -y certbot python3-certbot-nginx

# ─── 9. Firewall ─────────────────────────────────────────────────────────────
echo "[9/10] Configurando firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ─── 10. Diretório do projeto ─────────────────────────────────────────────────
echo "[10/10] Preparando diretório /var/www/obraja..."
mkdir -p /var/www/obraja
chown -R root:root /var/www/obraja

echo ""
echo "========================================"
echo " Servidor pronto! Próximo passo:"
echo " Faça upload do código e rode:"
echo " cd /var/www/obraja && ./deploy/build.sh"
echo "========================================"
