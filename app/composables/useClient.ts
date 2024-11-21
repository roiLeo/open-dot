declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}

import { createClient } from 'polkadot-api'
import { getSmProvider } from 'polkadot-api/sm-provider'
import { chainSpec } from 'polkadot-api/chains/polkadot'
import { start } from 'polkadot-api/smoldot'

const smoldot = start()
const chain = await smoldot.addChain({ chainSpec })

// Connect to the polkadot relay chain.
const client = createClient(getSmProvider(chain))

// With the `client`, you can get information such as subscribing to the last
// block to get the latest hash:
client.finalizedBlock$.subscribe((finalizedBlock) => console.log(finalizedBlock.number, finalizedBlock.hash))

export const useClient = () => {
  return {
    client
  }
}
