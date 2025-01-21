import { chains } from '@/api'
import type { SS58String } from 'polkadot-api'
import type { AssetId, ChainId } from '@/types'

export const useBalance = (chain: ChainId, asset: AssetId) => {
  const accountStore = useAccountStore()
  const account = computed(() => accountStore.getAccount)
  const balance = ref<bigint | null>(null)

  let subscription: { unsubscribe: () => void } | null = null

  watch([account, chain, asset], () => {
    // Reset balance when dependencies change
    balance.value = null

    // Unsubscribe from previous subscription if it exists
    if (subscription) {
      subscription.unsubscribe()
    }

    // Create new subscription
    subscription = chains
      .get(chain)!
      .get(asset)!
      .watchFreeBalance(account.value as SS58String)
      .subscribe((newBalance: bigint | null) => {
        balance.value = newBalance
      })
  }, { immediate: true })

  // Cleanup subscription when component unmounts
  onUnmounted(() => {
    if (subscription) {
      subscription.unsubscribe()
    }
  })

  return balance
}
