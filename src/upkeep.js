const ethers = require("ethers")
const PrizeStrategyUpkeepABI = require("@pooltogether/pooltogether-prizestrategy-upkeep/abis/PrizeStrategyUpkeep.json")
const { getPrizeStrategyUpkeepAddress } = require('./getPrizeStrategyUpkeepAddress')

exports.upkeep = async function (relayer, network) {

  const prizeStrategyUpkeepAddress = getPrizeStrategyUpkeepAddress(network)

  const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY)
  
  const prizeStrategyUpkeep = new ethers.Contract(prizeStrategyUpkeepAddress, PrizeStrategyUpkeepABI, provider)

  
  const { upkeepNeeded, performData } = await prizeStrategyUpkeep.checkUpkeep([])
  console.log("checkUpkeep() result ", upkeepNeeded)

  if (upkeepNeeded) {
    console.log("performing upkeep on ", prizeStrategyUpkeep.address)
    const unsignedTx = await prizeStrategyUpkeep.populateTransaction.performUpkeep([])    
    const gasLimit = ((await prizeStrategyUpkeep.estimateGas.performUpkeep([])).toNumber() * 2) 
    console.log(`performUpkeep(). Gas limit: ${gasLimit.toString()}`)
    await relayer.sendTransaction({
      to: unsignedTx.to,
      data: unsignedTx.data,
      gasLimit,
      speed: 'average'
    })
  }
}
