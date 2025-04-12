#!/bin/bash

cd ./client
pnpm install
pnpm build

cd ..

cd ./server
pnpm install
pnpm build

cd ..
rm -rf ./server/dist-ssr
cp -r ./client/dist ./server/dist-ssr