const { upkeep } = require('./upkeep')
const { Relayer } = require('defender-relay-client');

exports.handler =  async function(event) {
  await upkeep(new Relayer(event),'polygon')
}