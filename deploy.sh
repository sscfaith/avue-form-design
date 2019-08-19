#!/bin/bash 

echo "打包文件"
yarn build
echo "传输文件"
scp -r ./dist/** root@106.52.181.90:/data/avue/avue-form

echo "部署成功"