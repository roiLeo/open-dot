<template>
  <header class="bg-background/75 border-b border-gray-200 dark:border-gray-800">
    <UContainer class="flex h-14 items-center justify-between">
      <NuxtLink to="/">Cross-chain Transfer</NuxtLink>
      <div class="flex gap-1.5">
        <ColorPicker />
        <ColorModeButton />
        <WalletConnectButton v-if="account === '' || !account" />
        <WalletProfileDropdownButton v-else />
      </div>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>
const { account } = useConnectWallet()
</script>
