#!/bin/bash

NETWORK=$1
MODULE=$2
MODULE_PATH="./ignition/modules/$MODULE.ts"

echo "Deploying $MODULE_PATH  to $NETWORK network"

npx hardhat ignition deploy $MODULE_PATH --network $NETWORK
