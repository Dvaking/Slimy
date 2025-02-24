#!/bin/bash

cleanup() {
    echo ""
    echo "Nettoyage avant l'arrêt du bot..."
    rm -rf ./dist
    echo "Fichier supprimé avec succès."
    exit 0
}

trap cleanup SIGINT SIGTERM

npm run build
npm run start

cleanup