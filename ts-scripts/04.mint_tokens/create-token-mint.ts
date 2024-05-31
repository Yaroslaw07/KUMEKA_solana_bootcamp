import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import "dotenv/config";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`🪙 Token mint created! You can view it at: ${link}`);
