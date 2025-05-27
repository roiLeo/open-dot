<template>
  <UDropdownMenu
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton aria-label="your Wallet" color="neutral" variant="ghost" square>
      <CommonDotAvatar size="20" theme="polkadot" :address="account" class="avatar" />
    </UButton>
    <template #account-label="{ item }">
      <div class="text-left truncate">
        <p>Signed in as</p>
        <p class="truncate font-medium text-neutral-900 dark:text-white">
          {{ shortAddress(item.label) }}
        </p>
      </div>
    </template>

    <template #item-label="{ item }">
      <span class="truncate">{{ item.label }}</span>
    </template>
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const { account, resetAccount } = useConnectWallet()
const items = [
  [
    {
      label: account.value,
      slot: 'account',
      disabled: true
    }
  ],
  [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth'
    }
  ],
  [
    {
      label: 'Documentation',
      icon: 'i-heroicons-book-open',
      to: 'https://github.com/roiLeo/stupendous-shop#nft-shop'
    },
    {
      label: 'Status',
      icon: 'i-heroicons-signal'
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      onSelect: () => resetAccount()
    }
  ]
]
</script>
