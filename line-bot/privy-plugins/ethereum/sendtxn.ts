import { PluginBase, WalletClientBase, createTool,Chain } from "@goat-sdk/core";
import {z} from "zod"


const to = "th wallet address to which eth needed to be sent"
const value = "The value of ETH needed to be sent"

// Since we are creating a chain-agnostic plugin, we can use the WalletClientBase interface
export class SendEthTxn extends PluginBase<WalletClientBase> {
   
    constructor() {
        // We define the name of the plugin
        super("send_eth_txn", []);
     
    }

    // We define the chain support for the plugin, in this case we support all chains
    supportsChain = (chain: Chain) => true;

    getTools(walletClient: WalletClientBase) {
        return [
            // Create tool requires two arguments:
            // 1. The tool metadata (name, description, parameters)
            // 2. The tool method (the function that will be executed when the tool is used)
            createTool(
                {
                    name: "send_transaction",
                    description: "Send Eth to a wallet address",
                    parameters: z.object({}),
                },
                async () => {
                    
                },
            ),
        ];
    }
}

export const send_eth_txn = () => new SendEthTxn();