rm -rf yarn.lock package-lock.json node_modules
ls build/icon.icns
ls build/background.png
ls build/icon.ico
yarn add electron-builder --dev
yarn install
yarn dist
