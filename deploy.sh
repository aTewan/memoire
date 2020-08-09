#!/usr/bin/env bash

kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

kubectl apply -f k8s/trepo-monolithe-deployment.yaml
kubectl apply -f k8s/trepo-monolithe-service.yaml

kubectl apply -f k8s/db-users-deployment.yaml
kubectl apply -f k8s/db-users-service.yaml

kubectl apply -f k8s/mc-users-deployment.yaml
kubectl apply -f k8s/mc-users-service.yaml

kubectl apply -f k8s/nginx-service.yaml