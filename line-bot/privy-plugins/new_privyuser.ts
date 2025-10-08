import { PluginBase, WalletClientBase, createTool, Chain } from "@goat-sdk/core";
import {z} from "zod"
import axios from "axios";


const PRIVY_APP_ID = 'cmghxtr9o00j5ju0cnqduwqk1';
const PRIVY_APP_SECRET = '2PxYDV7PE6hvNBw7pz4EXQfQQ677i3DXAHmVUWJe1PnmiQfZXsezFzAHgdMZJv8jXuMYzfv7oRZJkWMp758FXLvr';



// Create Privy Account for the first time users
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
                    name: "create_privy_user",
                    description: "Create a new Privy user by linking their email",
                    parameters: z.object({}),
                },
                async () => {
                    try {
                        const response = await axios.post(
                            'https://api.privy.io/v1/users',
                            {
                                linked_accounts: [
                                    { address: this.email, type: 'email' },
                                ],
                            },
                            {
                                headers: {
                                    'Authorization': `Basic ${Buffer.from(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`).toString('base64')}`,
                                    'Content-Type': 'application/json',
                                    'privy-app-id': PRIVY_APP_ID,
                                },
                            }
                        );

                        if (response.status === 200) {
                            return { success: true, message: 'User created successfully', data: response.data };
                        } else {
                            return { success: false, message: 'Failed to create user', data: response.data };
                        }
                    } catch (error: any) {
                        return { success: false, message: 'Error creating user', error: error.message };
                    }
                }
            ),
        ];
    }
}

export const new_privy_user = (email: string): NewPrivyUser => new NewPrivyUser(email);
