<template>
  <div class="pt-8">
    <div class="mx-auto max-w-md w-full">
      <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
        <template #header>
          <h1 class="text-2xl font-bold lg:text-4xl lg:tracking-tight">Transferable</h1>
          <!-- <p class="text-sm text-gray-400">Use this project Starter Kit to build your collaborative app in minutes.</p> -->
        </template>

        <WalletBalance />

        <UDivider />

        <div class="space-y-4 px-4 py-5 sm:p-6">
          <UFormGroup label="From chain">
            <USelectMenu v-model="selectedFromChain" :options="chains" size="xl">
              <template #leading>
                <div v-if="selectedFromChain">
                  <UAvatar v-if="selectedFromChain.avatar" v-bind="(selectedFromChain.avatar as Avatar)" size="2xs" />
                </div>
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup label="Amount" required>
            <UButtonGroup size="xl" class="w-full">
              <USelectMenu v-model="selectedAsset" class="w-40" :options="assetOptions" :disabled="!selectedFromChain" />
              <UInput
                v-model="amount"
                class="w-full"
                type="number"
                required
                :ui="{ icon: { trailing: { pointer: '' } } }"
                min="0"
              >
                <template #trailing>
                  <UButton
                    size="xs"
                    color="gray"
                    label="MAX"
                    @click="amount = 1234"
                  />
                </template>
              </UInput>
            </UButtonGroup>
          </UFormGroup>

          <UFormGroup label="Destination chain">
            <USelectMenu v-model="selectedToChain" :options="chainToOptions" :disabled="!selectedFromChain" size="xl">
              <template v-if="selectedToChain" #leading>
                <div>
                  <UAvatar v-if="selectedToChain.avatar" v-bind="(selectedToChain.avatar as Avatar)" size="2xs" />
                </div>
              </template>
            </USelectMenu>
          </UFormGroup>

          {{ chainsMap }}

          <div v-if="selectedFromChain && selectedAsset">
            {{ chainToOptions }}
          </div>

          <div v-if="amount" class="flex justify-between">
            <div class="text-gray-500">Estimate Fee</div>
            <div>123124 {{ selectedAsset.label }}</div>
          </div>
        </div>

        <template #footer>
          <UButton size="xl" block>Transfer</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Avatar } from '#ui/types'
import type { ChainId } from '~/types'

const { assets, chains, chainsMap } = useChain()

const selectedFromChain = ref(chains[0])
const selectedToChain = ref()
const selectedAsset = ref()
const amount = ref()

const assetOptions = computed(() => assets.filter((option) => option.value === selectedFromChain.value?.value))
// const chainToOptions = computed(() => chains.filter((option) => option.value === selectedFromChain.value?.value))
const chainToOptions = computed(() => {
  if (selectedAsset.value) {
    const toOptions = Object.keys(
      chainsMap.get(selectedFromChain.value?.value as ChainId)!.get(selectedAsset.value?.label)!.teleport
    ) as ChainId[]

    return Object.entries(CHAIN_NAMES).filter((chain) => toOptions.includes(chain[0])).map((chain) => ({
      value: chain[0],
      label: chain[1].asset,
      avatar: { src: chain[1].img }
    }))
  } else {
    return []
  }
})
// const maxAmount = computed(() => accountBalance?.find((balance) => balance.label === selectedFromChain.value?.label)?.amount)
</script>
