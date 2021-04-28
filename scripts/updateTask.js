#!/usr/bin/env node

const { AutotaskClient } = require('defender-autotask-client');
const fs = require('fs')

async function updateAutotask(autotaskId, file) {
  const client = new AutotaskClient({apiKey: process.env.DEFENDER_TEAM_API_KEY, apiSecret: process.env.DEFENDER_TEAM_SECRET_KEY});
  const source = fs.readFileSync(file);
  console.log(`Updating autotask ${autotaskId} with sourcefile ${file}`)
  await client.updateCodeFromSources(autotaskId, {
    'index.js': source
  });
}

async function run() {
  if (process.env.MAINNET_AUTOTASK_ID) {
    await updateAutotask(process.env.MAINNET_AUTOTASK_ID, './dist/mainnet-bundle.js')
  }
  if (process.env.RINKEBY_AUTOTASK_ID) {
    await updateAutotask(process.env.RINKEBY_AUTOTASK_ID, './dist/rinkeby-bundle.js')
  }
  if (process.env.POLYGON_AUTOTASK_ID) {
    await updateAutotask(process.env.POLYGON_AUTOTASK_ID, './dist/polygon-bundle.js')
  }
}

run()
