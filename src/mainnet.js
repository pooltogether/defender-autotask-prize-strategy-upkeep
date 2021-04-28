const { upkeep } = require('./upkeep')
const { Relayer } = require('defender-relay-client');

exports.handler =  async function(event, context) {
  await reward(new Relayer(event),'mainnet')
}