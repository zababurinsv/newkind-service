#!/bin/bash
make clean
sudo docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk \
emcc --bind -Os ./VariableBufferKernel.cc -o ./variable-buffer-kernel.wasmmodule.mjs \
 -s WASM=1 \
 -s BINARYEN_ASYNC_COMPILATION=0 \
 -s SINGLE_FILE=1  \
 -s USE_ZLIB=1 \
 -s MODULARIZE=1 \
 -s EXPORT_ES6=1 \
 -s USE_ES6_IMPORT_META=0 \
 -s -s ASSERTIONS=1