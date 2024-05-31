import * as anchor from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { Program, web3 } from "@coral-xyz/anchor";
import {
  airdropIfRequired,
  getCustomErrorMessage,
} from "@solana-developers/helpers";
import { systemProgramErrors } from "./system-program-errors";
import { assert } from "chai";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Favorites as Program<Favorites>;

  it("Writes our favorites to the blockchain", async () => {
    // Add your test here.
    const user = web3.Keypair.generate();

    console.log("User public key:", user.publicKey);

    await airdropIfRequired(
      anchor.getProvider().connection,
      user.publicKey,
      0.5 * web3.LAMPORTS_PER_SOL,
      1 * web3.LAMPORTS_PER_SOL
    );

    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "red";

    let tx: string | null = null;
    try {
      tx = await program.methods
        .setFavorites(favoriteNumber, favoriteColor)
        .accounts({
          user: user.publicKey,
        })
        .signers([user])
        .rpc();
    } catch (thrownObject) {
      const rawError = thrownObject as Error;
      throw new Error(
        getCustomErrorMessage(systemProgramErrors, rawError.message)
      );
    }

    console.log("Your transaction signature", tx);

    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesPda = favoritesPdaAndBump[0];

    const dataFromPda = await program.account.favorites.fetch(favoritesPda);

    assert.equal(dataFromPda.color, favoriteColor);
    assert.equal(dataFromPda.number.toString(), favoriteNumber.toString());
  });
});
