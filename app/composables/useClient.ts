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
import { start } from 'polkadot-api/smoldot'
import { polkadot, polkadot_asset_hub, ksmcc3, ksmcc3_asset_hub } from "polkadot-api/chains"

const smoldot = start()
const polkadotChain = await smoldot.addChain({ chainSpec: polkadot })
const assetHubDotChain: Promise<any> = smoldot.addChain({
  chainSpec: polkadot_asset_hub,
  potentialRelayChains: [await smoldot.addChain({ chainSpec: polkadot })],
})
const kusamaChain = await smoldot.addChain({ chainSpec: ksmcc3 })
const assetHubKsmChain: Promise<any> = smoldot.addChain({
  chainSpec: ksmcc3_asset_hub,
  potentialRelayChains: [await smoldot.addChain({ chainSpec: polkadot })],
})

const dotClient = createClient(getSmProvider(polkadotChain))
const assetHubDotClient = createClient(getSmProvider(assetHubDotChain))

const ksmClient = createClient(getSmProvider(kusamaChain))
const assetHubKsmClient = createClient(getSmProvider(assetHubKsmChain))

// dotClient.finalizedBlock$.subscribe((finalizedBlock) => console.log(finalizedBlock.number, finalizedBlock.hash))

export const useClient = () => {
  return {
    ksmClient,
    dotClient,
    assetHubDotClient,
    assetHubKsmClient
  }
}
