const PrizeStrategyUpkeepRinkeby = require('@pooltogether/pooltogether-prizestrategy-upkeep/deployments/rinkeby/PrizeStrategyUpkeep.json')
const PrizeStrategyUpkeepMainnet = require('@pooltogether/pooltogether-prizestrategy-upkeep/deployments/mainnet/PrizeStrategyUpkeep.json')

function getPrizeStrategyUpkeepAddress(network) {
  let prizeStrategyUpkeepAddress
  if (network == 'rinkeby') {
    prizeStrategyUpkeepAddress = PrizeStrategyUpkeepRinkeby.address
  } else if(network == 'mainnet'){
    prizeStrategyUpkeepAddress = PrizeStrategyUpkeepMainnet.address
    console.log("mainnet address!", prizeStrategyUpkeepAddress)
  } 
  else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizeStrategyUpkeepAddress
}

module.exports = {
  getPrizeStrategyUpkeepAddress
}
