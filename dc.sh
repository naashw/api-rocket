#!/bin/bash

# Vérifie si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez l'installer pour exécuter ce script."
    exit 1
fi

# Vérifie si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose n'est pas installé. Veuillez l'installer pour exécuter ce script."
    exit 1
fi

# Définition des options par défaut
use_prod=false

# Analyse des options de la ligne de commande
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -p|--prod) use_prod=true;;
        up|down) action=$1;;
        *) echo "Option non reconnue : $1. Utilisation : $0 [-p|--prod] [up|down]"; exit 1;;
    esac
    shift
done

# Changez le répertoire de travail vers celui contenant docker-compose.yml
cd .

if [ "$action" == "up" ]; then
    # Exécutez Docker Compose avec docker-compose.production.yml pour lancer les conteneurs en mode production
    docker-compose build --no-cache
    docker-compose -f docker-compose.yml up --build --force-recreate
    echo "Les conteneurs Docker Compose en mode production ont été lancés avec succès."
elif [ "$action" == "down" ]; then
    # Arrêtez les conteneurs Docker Compose en mode production
    docker-compose -f docker-compose.yml down
    echo "Les conteneurs Docker Compose en mode production ont été arrêtés avec succès."
fi
# Facultatif : Vous pouvez ajouter d'autres commandes ou personnalisation ici si nécessaire.

exit 0
