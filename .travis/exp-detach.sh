#!/bin/bash
set -ev
nvm install node
npm install -g yarn
yarn install
yarn run login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
yarn run detach
react-native link
