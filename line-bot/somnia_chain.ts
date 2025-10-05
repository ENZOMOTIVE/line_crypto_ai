import { defineChain } from 'viem'
 
export const somnia_testnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet (Shannon)',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia Test Token',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/somnia_testnet']
      
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://shannon-explorer.somnia.network/' },
  }
 
})