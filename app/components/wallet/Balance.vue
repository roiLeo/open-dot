<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" class="px-6 py-1 text-start whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
              Coin
            </span>
          </th>

          <th scope="col" class="px-6 py-1 text-end whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
              Amount
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
        <tr v-for="balance in accountBalance" :key="balance.label">
          <td class="size-px whitespace-nowrap px-6 py-3">
            <div class="flex items-center gap-x-3">
              <img class="shrink-0 size-5 rounded-full" :src="balance.img" />
              <span class="font-semibold text-sm text-gray-800 dark:text-white">{{ balance.label }}</span>
              <span class="text-xs text-gray-500 dark:text-neutral-500">{{ balance.asset }}</span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap px-6 py-3 text-end">
            <span class="text-sm text-gray-800 dark:text-white">{{ formatCurrency(balance.amount.value, ASSET_DECIMALS[balance.asset as AssetId], { nbDecimals: 4, padToDecimal: false }) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { AssetId } from '~/types'

const { ASSET_DECIMALS, CHAIN_NAMES } = useChain()

const dotBalance = useBalance('dot', 'DOT')
const dotAhBalance = useBalance('dotAh', 'DOT')
const ksmBalance = useBalance('ksm', 'KSM')
const ksmAhBalance = useBalance('ksmAh', 'KSM')

const accountBalance = [
  { ...CHAIN_NAMES['dot'], asset: 'DOT', amount: dotBalance },
  { ...CHAIN_NAMES['dotAh'], asset: 'DOT', amount: dotAhBalance },
  { ...CHAIN_NAMES['ksm'], asset: 'KSM', amount: ksmBalance },
  { ...CHAIN_NAMES['ksmAh'], asset: 'KSM', amount: ksmAhBalance }
]
</script>
