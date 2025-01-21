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
            <USelectMenu v-model="selectedFromChain" :options="chains" size="xl" />
          </UFormGroup>

          <UFormGroup label="Amount" required>
            <UButtonGroup size="xl" class="w-full">
              <USelectMenu v-model="selectedAsset" class="w-40" :options="assetOptions" :disabled="!selectedFromChain" @change="handleSelectChange" />
              <UInput
                v-model="amount"
                class="w-full"
                type="number"
                required
                :ui="{ icon: { trailing: { pointer: '' } } }"
                min="0"
                style="appearance: textfield;"
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
            <USelectMenu v-model="selectedToChain" :options="chainToOptions" :disabled="!selectedFromChain" size="xl" />
          </UFormGroup>

          <div v-if="amount" class="flex justify-between">
            <div class="text-gray-500">Estimate Fee</div>
            <div>123124 {{ selectedAsset.label }}</div>
          </div>
        </div>

        <template #footer>
          <UButton size="xl" block :disabled="!selectedToChain">Transfer</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChainId } from '~/types'

const { assets, chains, chainsMap } = useChain()

const chainToOptions = ref<{ value: string; label: string; avatar: { src: string; }; }[]>()
const selectedFromChain = ref(chains[0])
const selectedToChain = ref()
const selectedAsset = ref()
const amount = ref()

const assetOptions = computed(() => assets.filter((option) => option.value === selectedFromChain.value?.value))

const handleSelectChange = (value: any) => {
  console.log('changed')
  console.log(value)
  const options = Object.keys(chainsMap.get(selectedFromChain.value?.value as ChainId)?.get(value.label)?.teleport)
  console.log(chainsMap.get(selectedFromChain.value?.value as ChainId)?.get(value.label)?.teleport)
  chainToOptions.value = chains.filter((chain) => options.includes(chain.value))
}
</script>
