import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchNFTClient, Collectible, CollectibleState } from '@audius/fetch-nft';
require('dotenv').config();

interface Data {
  isAuthenticated: boolean;
  solCollectibles: Collectible[];
}

interface ResponseError {
  message: string;
}

interface FetchResponse {
  solCollectibles: CollectibleState;
}

const fetchClient = new FetchNFTClient();
const solWalletAddress: string = process.env.SOL_WALLET_ADDRESS ? process.env.SOL_WALLET_ADDRESS : 'CgEZcNoj98ZW3xN7m6FooiCxfN7nQ69KBHPFejbxe3dW';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

  var collectibleState: FetchResponse = await fetchClient.getCollectibles({
    solWallets: [solWalletAddress]
  });

  return res.status(200).json({
    isAuthenticated: collectibleState.solCollectibles['GrWNH9qfwrvoCEoTm65hmnSh4z3CD96SfhtfQY6ZKUfY'] &&
      collectibleState.solCollectibles['GrWNH9qfwrvoCEoTm65hmnSh4z3CD96SfhtfQY6ZKUfY'].length > 0,
    solCollectibles: collectibleState.solCollectibles['GrWNH9qfwrvoCEoTm65hmnSh4z3CD96SfhtfQY6ZKUfY']
  });

}
