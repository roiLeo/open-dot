import type { PolkadotSigner, SS58String, Transaction } from 'polkadot-api'
export type TeleportAsset = (
  from: PolkadotSigner,
  amount: bigint,
  to?: SS58String,
) => Transaction<any, any, any, any>

export interface AssetInChain {
  chain: ChainId
  symbol: AssetId
  watchFreeBalance: (from: SS58String) => Promise<bigint>
  teleport: Partial<Record<ChainId, TeleportAsset>>
}

export type ChainId = 'dot' | 'dotAh' | 'wnd' | 'wndAh' | 'ksm' | 'ksmAh' | 'pas' | 'pasAh'
export type AssetId = 'DOT' | 'KSM' | 'WND' | 'PAS'

export const ASSET_DECIMALS: Record<AssetId, number> = {
  DOT: 10,
  KSM: 12,
  WND: 12,
  PAS: 10
}

export const CHAIN_NAMES: Record<ChainId, string> = {
  dot: 'Polkadot RelayChain',
  dotAh: 'Polkadot AssetHub',
  ksm: 'Kusama RelayChain',
  ksmAh: 'Kusama AssetHub',
  wnd: 'Westend RelayChain',
  wndAh: 'Westend AssetHub',
  pas: 'Paseo RelayChain',
  pasAh: 'Paseo AssetHub'
}

export const chains = new Map<ChainId, Map<AssetId, AssetInChain>>()

export const useChain = () => {
  const chains = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1],
    img: '~/assets/logos/paseo.pn'
  }))
  const assets = Object.entries(CHAIN_NAMES).map((chain) => ({
    value: chain[0],
    label: chain[1]
  }))
  return {
    assets,
    chains,
    ASSET_DECIMALS,
    CHAIN_NAMES
  }
}
