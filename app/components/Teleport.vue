<template>
  <div>
    <div class="flex flex-col space-y-1.5">
      <label for="from-chain">From Chain:</label>
      <select
        v-model="state.from"
        class="form-select"
        @change="handleFromChange"
      >
        <option
          v-for="chain in fromChains"
          :key="chain"
          :value="chain"
        >
          {{ CHAIN_NAMES[chain] }}
        </option>
      </select>
    </div>

    <div class="flex flex-col space-y-1.5">
      <label for="asset">Asset:</label>
      <select
        v-model="state.asset.selected"
        class="form-select"
        @change="handleAssetChange"
      >
        <option
          v-for="assetId in state.asset.options"
          :key="assetId"
          :value="assetId"
        >
          {{ assetId }}
        </option>
      </select>
    </div>

    <div class="flex flex-col space-y-1.5">
      <label for="to-chain">To Chain:</label>
      <select
        v-model="state.to.selected"
        class="form-select"
      >
        <option
          v-for="chain in state.to.options"
          :key="chain"
          :value="chain"
        >
          {{ CHAIN_NAMES[chain] }}
        </option>
      </select>
    </div>

    <div class="w-full max-w-sm border rounded-lg p-4">
      <div class="m-0 p-2 text-center font-medium">
        Transferable Balances
      </div>
      <ul class="grid gap-3 m-2">
        <li class="flex items-center justify-between">
          <span class="text-gray-600">{{ CHAIN_NAMES[state.from] }}</span>
          <span>
            <FormattedToken
              :asset="state.asset.selected"
              :value="fromBalance"
            />
          </span>
        </li>
        <li class="flex items-center justify-between">
          <span class="text-gray-600">{{ CHAIN_NAMES[state.to.selected] }}</span>
          <span>
            <FormattedToken
              :asset="state.asset.selected"
              :value="toBalance"
            />
          </span>
        </li>
      </ul>
    </div>

    <div class="grid w-full max-w-sm items-center gap-1.5">
      <label for="amount">Amount</label>
      <input
        v-model="amount"
        type="number"
        id="amount"
        class="form-input"
        placeholder="Amount to teleport"
      />
    </div>

    <FeesAndSubmit
      :from="state.from"
      :to="state.to.selected"
      :asset="state.asset.selected"
      :amount="Number(amount) || null"
    />
  </div>
</template>

<script setup lang="ts">
import type { AssetId, ChainId } from '~/types'

interface TeleporterState {
  from: ChainId
  to: {
    options: ChainId[]
    selected: ChainId
  }
  asset: {
    options: AssetId[]
    selected: AssetId
  }
}

const fromChains = [...chains.keys()]

const amount = ref<string>('')

const state = reactive<TeleporterState>({
  from: 'dot',
  to: {
    options: [],
    selected: '' as ChainId
  },
  asset: {
    options: [],
    selected: '' as AssetId
  }
})

// Initialize asset options and selected asset
const initializeAssetOptions = (fromChain: ChainId) => {
  state.asset.options = [...chains.get(fromChain)!.keys()].filter(
    (x) => Object.keys(chains.get(fromChain)!.get(x)!.teleport).length
  )
  state.asset.selected = state.asset.options[0]
}

// Initialize destination chain options and selected chain
const initializeToOptions = () => {
  state.to.options = Object.keys(
    chains.get(state.from)!.get(state.asset.selected)!.teleport
  ) as ChainId[]
  state.to.selected = state.to.options[0]
}

// Handle from chain change
const handleFromChange = () => {
  initializeAssetOptions(state.from)
  initializeToOptions()
}

// Handle asset change
const handleAssetChange = () => {
  initializeToOptions()
}

// Initialize state
initializeAssetOptions(state.from)
initializeToOptions()

// Computed balances
const fromBalance = computed(() =>
  useBalance(state.from, state.asset.selected)
)

const toBalance = computed(() =>
  useBalance(state.to.selected, state.asset.selected)
)
</script>

<style scoped>
.form-select {
  @apply block w-full rounded-md border border-gray-300 p-2;
}

.form-input {
  @apply block w-full rounded-md border border-gray-300 p-2;
}
</style>
