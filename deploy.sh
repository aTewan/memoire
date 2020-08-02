#!/usr/bin/env bash

kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

kubectl apply -f k8s/trepo-monolithe-deployment.yaml
kubectl apply -f k8s/trepo-monolithe-service.yaml
