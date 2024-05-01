#!/bin/bash

# Arrête le script si une commande échoue
set -e

nest build
chmod -R 777 /workspace/dist
