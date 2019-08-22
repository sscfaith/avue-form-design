#!/usr/bin/env bash

yarn run build

scp -r -P 2233 ./dist/* root@112.74.43.150:/data/wwwroot/default

rm -rf ./dist
