<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton aria-label="your Wallet" color="gray" variant="ghost" square>
      <CommonDotAvatar size="20" theme="polkadot" :address="account" class="avatar" />
    </UButton>
    <template #account="{ item }">
      <div class="text-left truncate">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ shortAddress(item.label) }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        :name="item.icon"
      />
    </template>
  </UDropdown>
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
      click: () => resetAccount()
    }
  ]
]
</script>
