#!/bin/bash

sudo kubectl delete services --all -n default

sudo kubectl delete deployment --all


sudo helm uninstall chartstack

echo "All specified services have been deleted."
