<template>
  <div class="pt-8">
    <div class="mx-auto max-w-md w-full">
      <UCard :ui="{ body: { padding: 'p-0 sm:p-0' }}">
        <template #header>
          <h1 class="text-2xl font-bold lg:text-4xl lg:tracking-tight">Cross-chain</h1>
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

          <UFormGroup label="Asset">
            <USelectMenu v-model="selectedAsset" :options="assets" :disabled="!selectedFromChain"  size="xl" />
          </UFormGroup>

          <UFormGroup label="Amount" required>
            <UButtonGroup size="xl" class="w-full">
              <USelectMenu v-model="selectedToChain" class="w-32" :options="chains" />
              <UInput v-model="amount" class="w-full" type="number" required />
            </UButtonGroup>
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
</script>
