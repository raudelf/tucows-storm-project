<script setup>
import { ref, onMounted } from 'vue'
import StormHeader from './components/StormHeader.vue'
import ProductTable from './components/ProductTable.vue'

const products = ref([])
const fetchError = ref('')
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/products.json')

    if (!response.ok) {
      fetchError.value = 'Failed to fetch data.'
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()

    products.value = data
  } catch (error) {
    fetchError.value = 'Error Fetching JSON'

    console.error('Error Fetching JSON:', error)
  } finally {
    isLoading.value = false
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
        <span v-if="!isLoading && !fetchError"
          >{{ products.length }} of {{ products.length }} results</span
        >
      </div>

      <ProductTable v-if="!fetchError" :products="products" />
      <p class="" v-else>{{ fetchError }}</p>
    </div>
  </main>
</template>
