import { Group, BigNumberish } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"

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

console.log("Group size: ", group.members.length)
