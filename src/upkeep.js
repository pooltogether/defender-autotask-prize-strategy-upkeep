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
    // check if the same tranasction still in flight
    const txs = await relayer.list({
      since: new Date(Date.now() - 3600 * 1000),// 
      status: 'pending', // can be 'pending', 'mined', or 'failed'
      limit: 5, // newest txs will be returned first
    })

    // if non-empty array then return
    // this way only gas-speedup transactions will happen and not duplicate transactions
    if (array.length > 0 || array) {
      console.log("The following transactions are in flight: ")
      txs.forEach(tx => {
        console.log(tx)
      });

      console.log("Transactions already in flight - returning early")
      return
    }


    console.log("calling peformUpkeep() on ", prizeStrategyUpkeep.address)
    const unsignedTx = await prizeStrategyUpkeep.populateTransaction.performUpkeep([])    
    const gasLimit = ((await prizeStrategyUpkeep.estimateGas.performUpkeep([])).toNumber() * 2) 
    console.log(`performUpkeep(). Gas limit: ${gasLimit.toString()}`)
    await relayer.sendTransaction({
      to: unsignedTx.to,
      data: unsignedTx.data,
      gasLimit,
      speed: 'fast'
    })

  }
}
