#!/bin/sh
delay=60
export GOPATH=$(pwd)/server
go get github.com/zababurinsv/server-mongo-cjs
sleep ${delay}
cd GOPATH/src/github.com/zababurinsv/server-mongo-cjs
mr --trust-all register
cd $(pwd)

go get github.com/zababurinsv/server-mongo-mjs
sleep ${delay}
cd GOPATH/src/github.com/zababurinsv/server-mongo-mjs
mr --trust-all register
cd $(pwd)