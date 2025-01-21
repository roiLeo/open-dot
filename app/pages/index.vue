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
              <UInput v-model="amount" class="w-full" type="number" required />
            </UButtonGroup>
          </UFormGroup>

          <UFormGroup label="Destination chain">
            <USelectMenu v-model="selectedToChain" :options="chains" :disabled="!selectedFromChain"  size="xl" />
          </UFormGroup>
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

const { assets, chains } = useChain()

const selectedFromChain = ref(chains[0])
const selectedToChain = ref()
const selectedAsset = ref()
const amount = ref()

const assetOptions = computed(() => assets.filter((option) => option.value === selectedFromChain.value?.value))
// const chainToOptions = computed(() => chains.filter((option) => option.value === selectedFromChain.value?.value))
// const maxAmount = computed(() => accountBalance?.find((balance) => balance.label === selectedFromChain.value?.label)?.amount)
</script>
