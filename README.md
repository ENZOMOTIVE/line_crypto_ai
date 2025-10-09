
<div style="text-align: center;">
  
# 🤖 AI Wallet : Line Bot  
### Your AI-powered crypto assistant, directly inside LINE  




[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Powered by GOAT SDK](https://img.shields.io/badge/Powered%20by-GOAT%20SDK-8A2BE2?style=flat&logoColor=white)](https://docs.goat-sdk.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🌍 Overview  

**KIRA-LINEAI Wallet : Line Bot** is an AI-powered assistant built for **LINE**, designed to simplify blockchain and crypto operations for users.  

While LINE is similar to WhatsApp in terms of chatting, it offers many more features. This bot leverages those capabilities to provide a seamless crypto experience.  

### What it does:

- 🏦 **Wallet Management** – Create, manage, and monitor wallets directly from chat.  
- 💱 **Crypto Operations** – Perform swaps, trading, and payments without memorizing commands.  
- 🔗 **Payment Integrations with KiraPay** – Generate payment links, accept multi-chain payments, and track transactions — all handled seamlessly by the AI Wallet bot.  
- 🤖 **AI Assistance** – The bot guides users step by step, making blockchain operations accessible to everyone.  

### How KiraPay Helps
KiraPay is a multi-chain payment layer for Web3 projects. By integrating KiraPay:  

- ⚡ **Multi-Chain In, One-Chain Out** – Accept payments from multiple networks, settled in your preferred chain.  
- 📊 **Transparent & On-Chain** – Every transaction is verifiable with rich payload data.  
- 🛠 **Developer-Friendly** – REST APIs available now, SDKs (Node.js, TypeScript, frontend) coming soon.  

**In short:** Users can manage wallets, perform transactions, and accept payments entirely through chat, while the AI Wallet bot and KiraPay handle the complexity behind the scenes — making crypto operations smooth, safe, and user-friendly.

---

## 💳 About KiraPay

**KiraPay** is a multi-chain payment layer for Web3 projects, platforms, and communities.  
With KiraPay, your users can pay using any supported blockchain, while you always receive funds settled in your preferred chain — simple, transparent, and seamless.  

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
- Create Wallet
- Handle Multiple Wallet
- Receive Crypto currencies




