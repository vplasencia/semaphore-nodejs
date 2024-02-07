import { Group, BigNumberish } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"

/** Identities */

/**
 * members are created using the deterministic way so that
 * they can be recreated later using the same secret-message.
 * In this case the secret message is the number i converted to string.
 */

// array of members to add to the group
const members: BigNumberish[] = Array.from({ length: 10 }, (_, i) => new Identity(i.toString())).map(
    ({ commitment }) => commitment
)

/** Groups */

// create a group with id 1, treeDepth 16 and the members above
const group = new Group(1, 16, members)

console.log("Group size: ", group.members.length)
