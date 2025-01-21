
import dot from '~/api/dot'
import ksm from '~/api/ksm'
import wnd from '~/api/wnd'
import pas from '~/api/pas'
import type { AssetId, AssetInChain, ChainId } from '~/types'

export const ASSET_DECIMALS: Record<AssetId, number> = {
  DOT: 10,
  KSM: 12,
  WND: 12,
  PAS: 10
}

export const CHAIN_NAMES: Record<ChainId, { label: string, img: string, asset: AssetId }> = {
  dot: { asset: 'DOT', label: 'Polkadot RelayChain', img: '/img/chains/polkadot-circle.svg' },
  dotAh: { asset: 'DOT', label: 'Polkadot AssetHub', img: '/img/chains/assethub-polkadot.svg' },
  ksm: { asset: 'KSM', label: 'Kusama RelayChain', img: '/img/chains/kusama.svg' },
  ksmAh: { asset: 'KSM', label: 'Kusama AssetHub', img: '/img/chains/assethub-kusama.svg' },
  wnd: { asset: 'WND', label: 'Westend RelayChain', img: '/img/chains/westend_colour.svg' },
  wndAh: { asset: 'WND', label: 'Westend AssetHub', img: '/img/chains/assethub-polkadot.svg' },
  pas: { asset: 'PAS', label: 'Paseo RelayChain', img: '/img/chains/paseo.png' },
  pasAh: { asset: 'PAS', label: 'Paseo AssetHub', img: '/img/chains/assethub-polkadot.svg' }
}

const assetsInChains = [...dot, ...ksm, ...wnd, ...pas]

export const chainsMap = new Map<ChainId, Map<AssetId, AssetInChain>>()

assetsInChains.forEach((assetinChain) => {
  const { chain, symbol } = assetinChain
  console.log(assetinChain)
  console.log(chain, symbol)
  if (!chainsMap.has(chain)) chainsMap.set(chain, new Map())

  chainsMap.get(chain)!.set(symbol, assetinChain)
})

export const useChain = () => {
  const chains = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1].label,
    avatar: { src: chain[1].img }
  }))
  const assets = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1].asset,
    avatar: { src: chain[1].img }
  }))
  return {
    assets,
    chains,
    chainsMap,
    assetsInChains,
    ASSET_DECIMALS,
    CHAIN_NAMES
  }
}
