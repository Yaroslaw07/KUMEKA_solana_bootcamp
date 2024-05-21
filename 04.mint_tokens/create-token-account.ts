import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey(
  "HYeUCAqdsQBkqQNHRoBPov42QySDhwM7zAqiorToosbz"
);

const recipient = new PublicKey("Hxsgo2tPiu6967VUaEquk232riDKkaqK89wBvdSCgjH7");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

console.log(`🔐 Token account created at: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`🪙 Token account created! You can view it at: ${link}`);
