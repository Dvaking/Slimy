#!/bin/sh

echo "📦 Génération du client Prisma..."
npx prisma generate

echo "🧬 Push du schéma vers la base..."
npx prisma db push

echo "✅ Prisma prêt !"