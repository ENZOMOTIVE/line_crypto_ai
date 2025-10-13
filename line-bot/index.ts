import { createServer } from "http";
import * as line from "@line/bot-sdk";
import dotenv from "dotenv";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { somnia_testnet} from "./somnia_chain"
 import {kiraPayPlugin} from "./kira-pay-plugin/kira-pay"
import { new_privy_user} from "./privy-plugins/new_privyuser"
import {SendTransactionPlugin} from "./privy-plugins/ethereum/sendtxn"



dotenv.config();



// 1. Create a wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
  account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: somnia_testnet,
});

// LINE config
const middlewareConfig: line.MiddlewareConfig = {
  channelSecret: process.env.CHANNEL_SECRET!,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
});

// Load tools globally
let tools: any;
(async () => {
  tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [
      kiraPayPlugin(process.env.KIRA_PAY_API!),
       new_privy_user("skpadhy2010@gmail.com"),
       SendTransactionPlugin()
    ],
  });
})();

// Helper to parse raw body
function getRawBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: string) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

// HTTP server
const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/callback") {
    try {
      const rawBody = await getRawBody(req);

      // Verify signature with LINE SDK
      const isValid = line.validateSignature(
        rawBody,
        middlewareConfig.channelSecret,
        req.headers["x-line-signature"] as string
      );

      if (!isValid) {
        res.writeHead(403);
        return res.end("Invalid signature");
      }

      const body = JSON.parse(rawBody);
      const events: line.WebhookEvent[] = body.events;

      await Promise.all(events.map(handleEvent));

      res.writeHead(200);
      res.end("OK");
    } catch (err) {
      console.error("Webhook error:", err);
      res.writeHead(500);
      res.end("Error");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

// Event handler
async function handleEvent(event: line.WebhookEvent) {
  console.log("Incoming event:", JSON.stringify(event, null, 2));

  if (event.type !== "message" || event.message.type !== "text") return;

  const userMessage = event.message.text;
  console.log("User message:", userMessage);

  if (!tools) {
    console.log("Tools not ready");
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: "text", text: "Tools not ready, try again later." }],
    });
  }

  let replyText = "⚠️ Something went wrong";

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      tools,
      maxSteps: 10,
      prompt: userMessage,
    });
    console.log("AI result:", result);
    replyText = result.text || "⚠️ Empty AI response";
  } catch (err) {
    console.error("AI error:", err);
    replyText = "⚠️ Error processing your request.";
  }

  try {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: "text", text: replyText }],
    });
    console.log("Reply sent successfully:", replyText);
  } catch (err) {
    console.error("Failed to send reply:", err);
  }
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`LINE bot running at http://localhost:${port}`);
});
