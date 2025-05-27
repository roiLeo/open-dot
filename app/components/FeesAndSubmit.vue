<template>
  <div>
    <!-- Fees Display -->
    <ul class="grid gap-3 m-1">
      <li class="flex items-center justify-between">
        <span>
          Estimated fees
        </span>
        <span>
          <span v-if="fees">{{ fees }}</span>
          <span v-else-if="props.amount">Loading</span>
        </span>
      </li>
    </ul>

    <!-- Submit Dialog Trigger -->
    <button class="w-full btn btn-primary" @click="handleTeleport">
      Teleport
    </button>

    <!-- Dialog Modal (use your preferred dialog/modal implementation) -->
    <Teleport to="body">
      <div v-if="openDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
          <h2 class="text-lg font-bold mb-2">
            Teleporting
            {{ formatCurrency(fixedAmount, ASSET_DECIMALS[props.asset], { nDecimals: 4, padToDecimals: false }) }}
            {{ props.asset }} from {{ CHAIN_NAMES[props.from] }} to {{ CHAIN_NAMES[props.to] }}
          </h2>
          <p class="text-gray-800 dark:text-gray-200">{{ dialogText }}</p>
          <button class="mt-4 btn btn-secondary" @click="openDialog = false">Close</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ASSET_DECIMALS, CHAIN_NAMES, chains } from '@/api'
// import FormattedToken from './FormattedToken.vue'
// import { formatCurrency, cn } from '@/lib/utils'

// Props
const props = defineProps<{
  from: string  // ChainId
  to: string    // ChainId
  asset: string // AssetId
  amount: number | null
}>()

// State and refs
const accountStore = useAccountStore()
const account = computed(() => accountStore.getAccount)
const fees = ref<bigint | null>(null)
const signSubmitAndWatch = ref<any>(undefined)
const fixedAmount = computed(() =>
  props.amount !== null
    ? BigInt(props.amount * Math.pow(10, ASSET_DECIMALS[props.asset]))
    : null
)

// Dialog state
const dialogText = ref<string>('')
const openDialog = ref(false)

let feeTimeout: any = null

// Estimate fees when dependencies change
const estimateFees = () => {
  fees.value = null
  if (fixedAmount.value === null) return

  // Debounce logic as in React's setTimeout
  feeTimeout = setTimeout(async () => {
    const call = chains.get(props.from)?.get(props.asset)?.teleport[props.to]?.(
      account.value.polkadotSigner,
      fixedAmount.value
    )

    signSubmitAndWatch.value = call?.signSubmitAndWatch
    if (call) {
      const estimatedFees = await call.getEstimatedFees(account.value.address)
      fees.value = estimatedFees
    }
  }, 50)
}

watch(
  () => [props.from, props.to, props.asset, props.amount],
  estimateFees,
  { immediate: true }
)

onBeforeUnmount(() => {
  signSubmitAndWatch.value = undefined
  clearTimeout(feeTimeout)
  feeTimeout = null
})

// Handle the submit process
const handleTeleport = () => {
  dialogText.value = 'Waiting for the transaction to be signed'
  openDialog.value = true
  if (!signSubmitAndWatch.value) return

  signSubmitAndWatch.value(account.value.polkadotSigner).subscribe({
    next: (e: any) => {
      switch (e.type) {
      case 'signed':
        dialogText.value = 'The transaction has been signed'
        break
      case 'broadcasted':
        dialogText.value =
          'The transaction has been validated and broadcasted'
        break
      case 'txBestBlocksState':
        dialogText.value = e.found
          ? `The transaction was found in a best block (${e.block.hash}[${e.block.index}]), ${
            e.ok
              ? 'and it\'s being successful! 🎉'
              : 'but it\'s failing... 😞'
          }`
          : e.isValid
            ? 'The transaction has been validated and broadcasted'
            : 'The transaction is not valid anymore in the latest known best block'
        break
      case 'finalized':
        dialogText.value = `The transaction is in a finalized block (${e.block.hash}[${e.block.index}]), ${
          e.ok ? 'and it was successful! 🎉' : 'but it failed... 😞'
        }`
        setTimeout(() => {
          openDialog.value = false
        }, 3000)
        break
      }
    },
    error: (e: any) => {
      dialogText.value = 'An error occurred, please try again later.'
      console.error(e)
      setTimeout(() => {
        openDialog.value = false
      }, 3000)
    }
  })
}
</script>
