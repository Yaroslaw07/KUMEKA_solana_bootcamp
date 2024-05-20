import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));

console.log("devnet");

const publicKey = new PublicKey("4tKj4tTtcfQ8sJ4qRPeTDMn5itrMHV63GxDnxui3M8qi");

// await airdropIfRequired(
//   connection,
//   publicKey,
//   1 * LAMPORTS_PER_SOL,
//   0.5 * LAMPORTS_PER_SOL
// );

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Balance of ${publicKey.toBase58()}: ${balanceInSol} SOL`);
