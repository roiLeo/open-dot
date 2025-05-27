<template>
  <div>
    <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
      <thead class="bg-neutral-50 dark:bg-neutral-800">
        <tr>
          <th scope="col" class="px-6 py-1 text-start whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-neutral-800 dark:text-neutral-200">
              Coin
            </span>
          </th>

          <th scope="col" class="px-6 py-1 text-end whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-neutral-800 dark:text-neutral-200">
              Amount
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <tr v-for="balance in accountBalance" :key="balance.label">
          <td class="size-px whitespace-nowrap px-6 py-3">
            <div class="flex items-center gap-x-3">
              <img class="shrink-0 size-5 rounded-full" :src="balance.img" />
              <span class="font-semibold text-sm text-neutral-800 dark:text-white">{{ balance.label }}</span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap px-6 py-3">
            <div class="flex items-center justify-end gap-x-3">
              <span class="text-sm text-neutral-800 dark:text-white">
                {{ formatCurrency(balance.amount.value, ASSET_DECIMALS[balance.asset as AssetId], { nbDecimals: 4, padToDecimal: false }) }}
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-500">{{ balance.asset }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { AssetId } from '~/types'

const accountBalance = useAccountBalance()
</script>
