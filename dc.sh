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

# Vérifie les arguments du script
if [ "$#" -eq 0 ]; then
    echo "Utilisation : $0 [up|down]"
    exit 1
fi

# Changez le répertoire de travail vers celui contenant docker-compose.yml
cd .

if [ "$1" == "up" ]; then
    # Exécutez Docker Compose pour lancer les conteneurs
    docker-compose up -d
    echo "Les conteneurs Docker Compose ont été lancés avec succès."
elif [ "$1" == "down" ]; then
    # Arrêtez les conteneurs Docker Compose
    docker-compose down
    echo "Les conteneurs Docker Compose ont été arrêtés avec succès."
else
    echo "Option non reconnue : $1. Utilisation : $0 [up|down]"
    exit 1
fi

# Facultatif : Vous pouvez ajouter d'autres commandes ou personnalisation ici si nécessaire.

exit 0
