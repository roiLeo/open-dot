
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

export const chains = new Map<ChainId, Map<AssetId, AssetInChain>>()

export const useChain = () => {
  const chains = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1].label,
    avatar: { src: chain[1].img }
  }))
  const assets = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1].asset
  }))
  return {
    assets,
    chains,
    ASSET_DECIMALS,
    CHAIN_NAMES
  }
}
