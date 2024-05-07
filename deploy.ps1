param(
    [string]$NETWORK,
    [string]$MODULE
)

$MODULE_PATH = ".\ignition\modules\$MODULE.ts"

Write-Host "Deploying $MODULE_PATH to $NETWORK network"

npx hardhat ignition deploy $MODULE_PATH --network $NETWORK