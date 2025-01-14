<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
      <thead class="bg-gray-50 dark:bg-neutral-800">
        <tr>
          <th scope="col" class="px-6 py-1 text-start whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
              Coin
            </span>
          </th>

          <th scope="col" class="px-6 py-1 text-start whitespace-nowrap">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
              Amount
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
        <tr>
          <td class="size-px whitespace-nowrap px-6 py-3">
            <div class="flex items-center gap-x-3">
              <img class="shrink-0 size-5" src="https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=035" />
              <span class="font-semibold text-sm text-gray-800 dark:text-white">Polkadot</span>
              <span class="text-xs text-gray-500 dark:text-neutral-500">DOT</span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap px-6 py-3">
            <span class="text-sm text-gray-800 dark:text-white">{{ formatCurrency(dotBalance, ASSET_DECIMALS['DOT'], {nbDecimals: 4, padToDecimal: false}) }}</span>
          </td>
        </tr>
        <tr>
          <td class="size-px whitespace-nowrap px-6 py-3">
            <div class="flex items-center gap-x-3">
              <img class="shrink-0 size-5" src="https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=035" />
              <span class="font-semibold text-sm text-gray-800 dark:text-white">AssetHub</span>
              <span class="text-xs text-gray-500 dark:text-neutral-500">DOT</span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap px-6 py-3">
            <!-- <span class="text-sm text-gray-800 dark:text-white">{{ formatCurrency(ahDotBalance, ASSET_DECIMALS['DOT'], {nbDecimals: 4, padToDecimal: false}) }}</span> -->
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
// import { formatPrice } from '@/composables/utils'
// import { dot } from '@polkadot-api/descriptors'

// const { assetHubDotClient, dotClient } = useClient()
const { ASSET_DECIMALS } = useChain()
// const { account } = useConnectWallet()

// const dotApi = dotClient.getTypedApi(dot)
// // const ksmApi = ksmClient.getTypedApi(dot)
// const ahDotApi = assetHubDotClient.getTypedApi(dot)
// // const ahKsmApi = assetHubKsmClient.getTypedApi(dot)

// const dotAccountInfo = await dotApi.query.System.Account.getValue(
//   account.value as string,
// )
// const ahDotAccountInfo = await ahDotApi.query.System.Account.getValue(
//   account.value as string,
// )

// const dotBalance = ref(dotAccountInfo.data.free)
// const ahDotBalance = ref(ahDotAccountInfo.data.free)

const dotBalance = useBalance('dot', 'DOT')
</script>
