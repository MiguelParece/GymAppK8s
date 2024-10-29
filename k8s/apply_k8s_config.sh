#!/bin/bash

# Check if DOCKER_USERNAME is set, if not prompt the user
if [ -z "$DOCKER_USERNAME" ]; then
    read -p "Enter your Docker username: " DOCKER_USERNAME
    export DOCKER_USERNAME
fi

# Apply all YAML files in the current directory after substituting the username
for file in *.yml; do
    echo "Applying $file with DOCKER_USERNAME=$DOCKER_USERNAME..."
    # Use envsubst to replace ${DOCKER_USERNAME} in the YAML file and apply it
    envsubst < "$file" | kubectl apply -f -
done

echo "All Kubernetes configurations applied!"

