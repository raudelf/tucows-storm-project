<script setup>
import { onMounted } from 'vue'
import { useMainState } from './components/state/mainState'
import StormHeader from './components/StormHeader.vue'
import ProductTable from './components/ProductTable.vue'

const { fetchError, isDataLoading, productsList, mainCount, filteredCount } = useMainState()

onMounted(async () => {
  try {
    const response = await fetch('/products.json')

    if (!response.ok) {
      fetchError.value = 'Failed to fetch data.'
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()

    productsList.value = data
    mainCount.value = data.length
    filteredCount.value = data.length
  } catch (error) {
    fetchError.value = 'Error Fetching JSON'

    console.error('Error Fetching JSON:', error)
  } finally {
    isDataLoading.value = false
  }
})
</script>

<template>
  <header class="storm-header">
    <StormHeader />
  </header>

  <main class="storm-main">
    <div class="storm-container">
      <div class="storm-main__title-container">
        <h1 class="storm-main__title">Products</h1>
        <span v-if="!isDataLoading && !fetchError && productsList.length > 0"
          >{{ filteredCount }} of {{ mainCount }} results</span
        >
      </div>

      <ProductTable v-if="!fetchError && productsList.length > 0" />
      <p v-else-if="isDataLoading">Loading Data...</p>
      <p v-else class="storm-main__error-message">{{ fetchError }}</p>
    </div>
  </main>
</template>
