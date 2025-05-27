<template>
  <UButton
    square
    aria-label="Connect your Wallet"
    icon="i-heroicons-wallet"
    variant="ghost"
    @click="toggleWalletModal"
  />

  <WalletModal v-model:open="isWalletModalOpen" @close-modal="toggleWalletModal" />
</template>

<script lang="ts" setup>
const { isWalletModalOpen, toggleWalletModal } = useConnectWallet()
</script>
