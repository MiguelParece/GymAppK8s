#!/bin/bash

# Check if DOCKER_USERNAME is set
if [ -z "$DOCKER_USERNAME" ]; then
    read -p "Enter your Docker username: " DOCKER_USERNAME
    export DOCKER_USERNAME
fi

# Login to Docker
docker login

# Build Docker images
docker build -t $DOCKER_USERNAME/exercises -f ../Mongo/Dockerfile ../Mongo
docker build -t $DOCKER_USERNAME/history -f ../redis/Dockerfile ../redis
docker build -t $DOCKER_USERNAME/onermcalculator -f ../Express/Dockerfile ../Express
docker build -t $DOCKER_USERNAME/frontend -f ../FrontEnd/Dockerfile ../FrontEnd

# Push Docker images
docker push $DOCKER_USERNAME/exercises
docker push $DOCKER_USERNAME/history
docker push $DOCKER_USERNAME/onermcalculator
docker push $DOCKER_USERNAME/frontend
