mkdir -p tmp
docker run -itd --rm -p 1880:1880 -v $(pwd)/tmp:/data --name tmpnodered nodered/node-red:2.2.3
docker exec tmpnodered cp /usr/src/node-red/package.json /data/nodered-package.json
docker stop tmpnodered
cp tmp/nodered-package.json nodered.2.2.3-package.json
rm -rf tmp
