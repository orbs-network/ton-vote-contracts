#!/bin/bash

npm run build
docker build -t orbsnetworkstaging/management-service:$(cat .version) ./boyar
