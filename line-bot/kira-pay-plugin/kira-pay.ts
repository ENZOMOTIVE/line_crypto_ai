import { PluginBase, WalletClientBase, createTool, Chain } from "@goat-sdk/core";
import {z} from "zod"
import axios from "axios";


// Since we are creating a chain-agnostic plugin, we can use the WalletClientBase interface
export class KiraPayPlugin extends PluginBase<WalletClientBase> {

    private apiKey: string

    constructor(apiKey: string) {
        // We define the name of the plugin
        super("kirapay", []);
        this.apiKey = apiKey;
    }

    // We define the chain support for the plugin, in this case we support all chains
    supportsChain = (chain: Chain) => true;

    getTools(walletClient: WalletClientBase) {
      return [
      createTool(
        {
          name: "create_payment_link",
          description: "Generate a KiraPay payment link",
          parameters: z.object({
            currency: z.string().default("USDC"),
            receiver: z.string(), // wallet address
            price: z.number(),
            name: z.string(),
            redirectUrl: z.string().url(),
          }),
        },
        async (params) => {
          try {
            const response = await axios.post(
              "https://kirapay.focalfossa.site/api/link/generate",
              {
                currency: params.currency,
                receiver: params.receiver,
                price: params.price,
                name: params.name,
                redirectUrl: params.redirectUrl,
              },
              {
                headers: {
                  "x-api-key": this.apiKey,
                  "Content-Type": "application/json",
                },
              }
            );

            return response.data;
          } catch (error: any) {
            return {
              error: error.response?.data || error.message,
            };
          }
        }
      ),
    ];
  }
}

// Export factory function
export const kiraPayPlugin = (apiKey: string) => new KiraPayPlugin(apiKey);