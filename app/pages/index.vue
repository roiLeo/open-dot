<template>
  <div class="pt-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-sm w-full">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold lg:text-4xl lg:tracking-tight">Transfer</h1>
          <p class="text-sm text-gray-400">Use this project Starter Kit to build your collaborative app in minutes.</p>
        </template>

        <div class="space-y-4">
          <div>
            <WalletBalance />
          </div>

          <UFormGroup label="From chain">
            <USelectMenu v-model="selectedFromChain" :options="chains" />
          </UFormGroup>

          <UFormGroup label="Asset">
            <USelectMenu v-model="selectedAsset" :options="assets" />
          </UFormGroup>

          <UFormGroup label="To chain">
            <USelectMenu v-model="selectedToChain" :options="chains" />
          </UFormGroup>

          <UFormGroup label="Amount" required>
            <UInput v-model="amount" type="number" required />
          </UFormGroup>
        </div>

        <template #footer>
          <UButton block>Transfer</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { assets, chains } = useChain()

const selectedFromChain = ref()
const selectedToChain = ref()
const selectedAsset = ref()
const amount = ref()
</script>
