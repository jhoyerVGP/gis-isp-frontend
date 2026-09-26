#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────
# CONFIGURA ESTOS VALORES ANTES DE EJECUTAR
# ─────────────────────────────────────────────

# --- Base de datos LOCAL ---
LOCAL_HOST="localhost"
LOCAL_PORT="5432"
LOCAL_USER="postgres"
LOCAL_DB="db_auth"

# --- Base de datos SUPABASE (usa conexión DIRECTA, puerto 5432, no el pooler) ---
SUPABASE_HOST="db.zxlkbgivwjjyaaiiwlpp.supabase.co"
SUPABASE_PORT="5432"
SUPABASE_USER="postgres"
SUPABASE_DB="postgres"

# ─────────────────────────────────────────────
# NO EDITAR DEBAJO DE ESTA LÍNEA
# ─────────────────────────────────────────────

DUMP_FILE="backup_$(date +%Y%m%d_%H%M%S).dump"

echo "==> 1/3 Haciendo dump de la base local ($LOCAL_DB)..."
pg_dump \
  -h "$LOCAL_HOST" \
  -p "$LOCAL_PORT" \
  -U "$LOCAL_USER" \
  -d "$LOCAL_DB" \
  --no-owner --no-privileges --no-acl \
  -F c \
  -f "$DUMP_FILE"

echo "==> Dump generado: $DUMP_FILE"

echo "==> 2/3 Restaurando en Supabase ($SUPABASE_HOST)..."
pg_restore \
  -h "$SUPABASE_HOST" \
  -p "$SUPABASE_PORT" \
  -U "$SUPABASE_USER" \
  -d "$SUPABASE_DB" \
  --no-owner --no-privileges \
  --clean --if-exists \
  "$DUMP_FILE"

echo "==> 3/3 Verificando tablas creadas en Supabase..."
PGPASSWORD="${SUPABASE_PASSWORD:-}" psql \
  -h "$SUPABASE_HOST" \
  -p "$SUPABASE_PORT" \
  -U "$SUPABASE_USER" \
  -d "$SUPABASE_DB" \
  -c "\dt"

echo ""
echo "✅ Migración completa. Dump guardado en: $DUMP_FILE"
