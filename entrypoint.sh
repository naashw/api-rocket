#!/bin/bash

# Arrête le script si une commande échoue
set -e

# Exécute la migration Prisma
echo "Démarrage de la migration Prisma..."
npx prisma migrate deploy

# Parcourir tous les arguments passés au script
for arg in "$@"
do
    if [[ $arg == "--prod" ]]; then
        # Si l'argument --prod est trouvé, lancer en mode production
        echo "Démarrage de l'api NESTJS en mode production..."
        npm run start:prod
        exit 0 # Quitter le script après avoir exécuté la commande
    fi
done

# Lance l'application NestJS
echo "Démarrage de l'api NESTJS en mode développement..."
npm run start:dev

