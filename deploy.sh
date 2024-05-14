#!/bin/bash

NETWORK=$1
MODULE=$2
MODULE_PATH="./ignition/modules/DeployModules.ts"
MODULE_MSG="All modules"

if [ ! -z "$MODULE" ]; then
    MODULE_PATH="./ignition/modules/${MODULE}.ts"
    MODULE_MSG="Module: ${MODULE}"
fi

echo "Deploying $MODULE_MSG to network: $NETWORK"

npx hardhat ignition deploy $MODULE_PATH --network $NETWORK
