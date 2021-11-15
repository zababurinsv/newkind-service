#!/bin/sh

find ./service -name 'index.html' -exec sed -i -e 's/\/manifest.webmanifest/\/newkind-service\/manifest.webmanifest/g' {} \;
#find ./service -name 'manifest.webmanifest' -exec sed -i -e 's/\"start_url\":\"\./\"start_url\":\"\/newkind-service/g' {} \;
find ./service -name 'manifest.webmanifest' -exec sed -i -e 's/\/newkind/\/newkind-service\/newkind/g' {} \;

