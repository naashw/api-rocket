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

# Changez le répertoire de travail vers celui contenant docker-compose.yml
cd .

# Exécutez Docker Compose pour lancer les conteneurs
docker-compose up -d

# Affichez un message de confirmation
echo "Les conteneurs Docker Compose ont été lancés avec succès."

# Facultatif : Vous pouvez ajouter d'autres commandes ou personnalisation ici si nécessaire.

exit 0
