import { PluginBase, WalletClientBase, createTool, Chain } from "@goat-sdk/core";
import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PRIVY_APP_ID = process.env.PRIVY_APP_ID!;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET!;

export class NewPrivyUser extends PluginBase<WalletClientBase> {
    private email: string;

    constructor(email: string) {
        super("new_privy_user", []);
        this.email = email;
    }

    supportsChain = (chain: Chain) => true;

    getTools(walletClient: WalletClientBase) {
        return [
            createTool(
                {
                    name: "create_privy_user_and_wallet",
                    description: "Create a new Privy user and Ethereum wallet",
                    parameters: z.object({}),
                },
                async () => {
                    const encodedAuth = Buffer.from(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`).toString('base64');

                    try {
                        // 🔹 Step 1: Create new user
                        const createUserResponse = await axios.post(
                            "https://api.privy.io/v1/users",
                            {
                                linked_accounts: [
                                    { type: "email", address: this.email } // required
                                ]
                            },
                            {
                                headers: {
                                    "Authorization": `Basic ${encodedAuth}`,
                                    "Content-Type": "application/json",
                                    "privy-app-id": PRIVY_APP_ID,
                                },
                            }
                        );

                        const userData = createUserResponse.data;
                        const userId = userData.id;

                        // 🔹 Step 2: Create Ethereum wallet
                        const walletResponse = await axios.post(
                            "https://api.privy.io/v1/wallets",
                            {
                                chain_type: "ethereum",
                                owner: { user_id: userId },
                            },
                            {
                                headers: {
                                    "Authorization": `Basic ${encodedAuth}`,
                                    "Content-Type": "application/json",
                                    "privy-app-id": PRIVY_APP_ID,
                                },
                            }
                        );

                        const walletData = walletResponse.data;

                        return {
                            success: true,
                            message: "Privy user and Ethereum wallet created successfully",
                            user: userData,
                            wallet: walletData,
                        };
                    } catch (error: any) {
                        return {
                            success: false,
                            message: "Error creating Privy user or wallet",
                            error: error.response?.data || error.message,
                        };
                    }
                }
            ),
        ];
    }
}

export const new_privy_user = (email: string): NewPrivyUser => new NewPrivyUser(email);
