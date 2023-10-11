import { Group, BigNumberish } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof, SemaphoreProof, verifyProof } from "@semaphore-protocol/proof"

async function main() {
    /** Identities */

    // array of members to add to the group
    const members: BigNumberish[] = []

    /**
     * members are created using the deterministic way so that
     * they can be recreated later using the same secret-message.
     * In this case the secret message is the number i converted to string.
     */
    let identityCommitment: BigNumberish
    for (let i = 0; i < 10; i += 1) {
        identityCommitment = new Identity(i.toString()).commitment
        members.push(identityCommitment)
    }

    /** Groups */

    // create a group with id 1, treeDepth 16 and the members above
    const group = new Group(1, 16, members)

    /** Proofs */

    // external nullifier to prevent double signaling
    const externalNullifier = group.root

    const signal = 1

    // generate the proof
    const fullProof: SemaphoreProof = await generateProof(new Identity("1"), group, externalNullifier, signal, {
        zkeyFilePath: "./snark-artifacts/semaphore.zkey",
        wasmFilePath: "./snark-artifacts/semaphore.wasm"
    })

    // verify the proof
    const verified: boolean = await verifyProof(fullProof, group.depth)

    console.log("Proof verified: ", verified)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
