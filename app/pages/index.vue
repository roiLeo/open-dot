<template>
  <div class="pt-8">
    <div class="mx-auto max-w-md w-full">
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <h1 class="text-2xl font-bold lg:text-4xl lg:tracking-tight">Transferable</h1>
        </template>

        <WalletBalance />

        <UDivider />

        <div class="space-y-4 px-4 py-5 sm:p-6">
          <UFormField label="From chain">
            <USelectMenu v-model="selectedFromChain" :items="chains" size="xl" class="w-full" />
          </UFormField>

          <UFormField label="Amount" required>
            <UButtonGroup size="xl" class="w-full">
              <USelectMenu v-model="selectedAsset" class="w-40" :items="assetOptions" :disabled="!selectedFromChain" @update:modelValue="handleSelectChange" />
              <UInput
                v-model="amount"
                class="w-full"
                type="number"
                required
                :ui="{ trailing: 'pe-1' }"
                min="0"
                style="appearance: textfield;"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    label="MAX"
                    aria-label="MAX"
                    @click="amount = 1234"
                  />
                </template>
              </UInput>
            </UButtonGroup>
          </UFormField>

          <UFormField label="Destination chain">
            <USelectMenu v-model="selectedToChain" :items="chainToOptions" :disabled="!selectedFromChain" size="xl" class="w-full" />
          </UFormField>

          <div v-if="selectedAsset && amount" class="flex justify-between">
            <div class="text-neutral-500">Estimate Fee</div>
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
