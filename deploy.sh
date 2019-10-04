#!/bin/bash
docker build -t osamabari/rest_api .
docker push osamabari/rest_api

ssh deploy@$DEPLOY_SERVER << EOF
docker pull osamabari/rest_api
docker stop rest-api || true
docker rm rest-api || true
docker rmi osamabari/rest_api:current || true
docker tag osamabari/rest_api:latest osamabari/rest_api:current
docker run -d --restart always --name rest-api -p 3000:3000 osamabari/rest_api:current
EOF
