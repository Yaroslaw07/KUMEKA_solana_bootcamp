import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const MINOR_UNITS_PER_MAJOR_UNIT = Math.pow(10, 2);

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey(
  "HNqDcFz6UNvfTZYFvZCDiV4FsZLk9umXZGaqNV6HA6TW"
);

const recipientAssociatedTokenAccount = new PublicKey(
  "CTjoLdEeK8rk4YWYW9ZqACyjHexbYKH3hEoagHxLVEFs"
);

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNIT
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`🚀 Success. Mint token transaction ${link}`);
