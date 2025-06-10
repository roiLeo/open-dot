<template>
  <div class="min-h-screen">

    <div class="relative z-10 container mx-auto px-4 py-12">
      <!-- Split Header -->
      <div class="flex items-end justify-between mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 class="text-5xl text-neutral tracking-tight mb-2">
            NFT Collection {{ id }}
          </h1>
          <p class="text-gray-600 font-light">
            Curated digital masterpieces on the Polkadot ecosystem
          </p>
        </div>
        <div class="flex gap-6 text-right">
          <div>
            <div class="text-2xl font-light">
              {{ items.length }}
            </div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">
              Items
            </div>
          </div>
          <div>
            <div class="text-2xl font-light">
              {{ listed }}
            </div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">
              Listed
            </div>
          </div>
          <div>
            <div class="text-2xl font-light">
              {{ owners.size }}
            </div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">
              Owners
            </div>
          </div>
        </div>
      </div>

      <!-- Minimalist NFT Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <NFTCard
          v-for="metadata in items"
          :key="`${metadata.collection}-${metadata.token}`"
          :metadata="metadata.metadata"
          :collection="metadata.collection"
          :token="metadata.token"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dotAh } from '@polkadot-api/descriptors'
import { dotAhClient } from '@/api/clients'

const api = dotAhClient.getTypedApi(dotAh)

const { id } = useRoute().params as unknown as { id: number }

const { data } = await useLazyAsyncData('data-collection', async () => {
  const [queryMetadata, queryOwner, queryPrice] = await Promise.all([
    await api.query.Nfts.ItemMetadataOf.getEntries(id),
    await api.query.Nfts.Item.getEntries(id),
    await api.query.Nfts.ItemPriceOf.getEntries(id)
  ])

  const items = queryMetadata
    .sort((a, b) => a.keyArgs[1] - b.keyArgs[1])
    .map(item => ({
      collection: item.keyArgs[0],
      token: item.keyArgs[1],
      metadata: item.value.data.asText()
    }))
  const owners = new Set(queryOwner.map(item => item.value.owner))
  const listed = queryPrice.length

  return { items, owners, listed }
})

const items = ref<{ collection: number, token: number, metadata: string }[]>(data.value?.items || [])
const owners = ref<Set<string>>(data.value?.owners || new Set())
const listed = ref<number>(data.value?.listed || 0)
</script>
