import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'

const baseConfig = {
  external: ['ethers', 'defender-relay-client'],
  output: {
    file: 'dist/reward-bundle.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    replace({
      'process.env.INFURA_API_KEY': JSON.stringify(process.env.INFURA_API_KEY)
    }),
    nodeResolve(),
    commonjs(),
    json()
  ]
}

export default [
  {
    ...baseConfig,
    input: 'src/mainnet.js',
    output: {
      file: 'dist/mainnet-bundle.js',
      format: 'cjs',
      exports: 'named'
    },
  },
  {
    ...baseConfig,
    input: 'src/rinkeby.js',
    output: {
      file: 'dist/rinkeby-bundle.js',
      format: 'cjs',
      exports: 'named'
    },
  },
  {
    ...baseConfig,
    input: 'src/polygon.js',
    output: {
      file: 'dist/polygon-bundle.js',
      format: 'cjs',
      exports: 'named'
    },
  }
]
