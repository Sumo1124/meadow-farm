import {defineConfig} from 'hardhat/config';
import hardhatEthers from '@nomicfoundation/hardhat-ethers';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
export default defineConfig({plugins:[hardhatEthers],solidity:{version:'0.8.37',path:require.resolve('solc/soljson.js'),settings:{optimizer:{enabled:true,runs:200},evmVersion:'cancun'}},networks:{hardhat:{type:'edr-simulated',chainType:'l1',chainId:31337}}});
