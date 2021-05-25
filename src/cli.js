#!/usr/bin/env node

const { program } = require('commander')
const { upkeep } = require('./upkeep')
const { Relayer } = require('defender-relay-client')

program
  .option('-n, --network [network]', 'select the network [rinkeby or mainnet]', 'rinkeby')
  .option('-da, --defenderApiKey [apiKey]', 'OpenZeppelin Defender Relayer API key', process.env.DEFENDER_RELAYER_API_KEY)
  .option('-ds, --defenderSecret [secret]', 'OpenZeppelin Defender Relayer Secret', process.env.DEFENDER_RELAYER_SECRET)

program.parse(process.argv)

let relayer
if (program.defenderApiKey && program.defenderSecret) {
  relayer = new Relayer({apiKey: program.defenderApiKey, apiSecret: program.defenderSecret});
}

upkeep(relayer, program.network)
