const PrizeStrategyUpkeepRinkeby = require('@pooltogether/operations-contracts/deployments/rinkeby/PrizeStrategyUpkeep.json')

function getPrizeStrategyUpkeepAddress(network) {
  let prizeStrategyUpkeepAddress
  if (network == 'rinkeby') {
    prizeStrategyUpkeepAddress = PrizeStrategyUpkeepRinkeby.address
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizeStrategyUpkeepAddress
}

module.exports = {
  getPrizeStrategyUpkeepAddress
}
