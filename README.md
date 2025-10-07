
<div align="center">
  
# 🤖 AI Wallet : Line Bot  
### Your AI-powered crypto assistant, directly inside LINE  

### 📲 Scan this QR to try the bot  

<img src="./line-bot/public/bot-invite.png" alt="Invite QR" width="280px" height="auto" style="object-fit: contain;">

[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Powered by GOAT SDK](https://img.shields.io/badge/Powered%20by-GOAT%20SDK-8A2BE2?style=flat&logoColor=white)](https://docs.goat-sdk.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🌍 Overview  

Managing crypto shouldn’t feel like rocket science.  
This project brings **AI + Blockchain** together inside the **LINE messenger app** to make crypto accessible:  

✅ Check balances (ETH & ERC-20 tokens)  
✅ Send tokens with natural language  
✅ Manage wallets securely  
✅ All without memorizing complex commands  

---


### Integrating KiraPay with AI Wallet  

Using our **KiraPay plugin**, your LINE AI Wallet can now generate payment links, track payments, and manage multi-chain settlements directly from chat.

## 💳 About KiraPay

Welcome to **KiraPay** — a multi-chain payment layer for Web3 projects, platforms, and communities.  
With KiraPay, your users can pay in any supported blockchain, while you always receive funds settled in your preferred chain — simple, transparent, and seamless.  

### Why KiraPay?

- 🔗 **Payment Links & APIs** – Share a link or integrate directly to start collecting payments.  
- ⚡ **Multi-Chain In, One-Chain Out** – Accept payments from multiple networks, get settled where you want.  
- 📊 **Transparent & On-Chain** – Every transaction is verifiable, with rich payload data.  
- 🛠 **Developer-Friendly** – REST APIs today, SDKs (Node.js, TypeScript, frontend) coming soon.  

> With KiraPay, payments are no longer a headache — they’re seamless, chain-agnostic, and settlement-optimized.


## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone "https://github.com/ENZOMOTIVE/line_crypto_ai"
cd line-bot
```




2. Run the following commands from the `typescript` directory:
```bash
cd line-bot
npm install
npm build
```



3. Copy the `.env.template` and populate with your values:
```bash
cp .env.template .env
```
- `OPENAI_API_KEY`
- `WALLET_PRIVATE_KEY`
- `RPC_PROVIDER_URL`
- `Line_Bot_Channel_Access`
-`Line_Secret_key`

5. Add some test funds to your wallet by going to any [Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)

## Usage
1. Run the interactive CLI:
```bash
pnpm ts-node index.ts
```

2. Chat with the agent:
- Check your balance for ERC-20 tokens
- Send ERC-20 tokens to another address
- Check your balance again to see the tokens you just sent


### 🖼 Proof of Work  

<img src="../line_crypto_ai/line-bot/public/Proof-1.png" alt="Proof-1" width="240px" style="margin:10px;"/> 
<img src="./line-bot/public/Proof-2.png" alt="Proof-2" width="240px" style="margin:10px;"/>

</div>


