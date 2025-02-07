<script setup>
import { onMounted } from 'vue'
import { useMainState } from './components/state/useMainState'
import StormHeader from './components/StormHeader.vue'
import ProductTable from './components/ProductTable.vue'

const {
  state: { fetchError, isDataLoading, productsList, filteredCount },
  actor: { fetchProducts },
} = useMainState()

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <a class="storm-visually-hidden storm-main__skip-to-content" href="#main">Skip to Main Content</a>
  <header class="storm-header">
    <StormHeader />
  </header>

  <main id="main" class="storm-main">
    <div class="storm-container">
      <div class="storm-main__title-container">
        <h1 class="storm-main__title">Products</h1>
        <span v-if="!isDataLoading && !fetchError && productsList.length > 0"
          >{{ filteredCount }} of {{ productsList.length }} results</span
        >
      </div>

      <ProductTable v-if="!fetchError && productsList.length > 0" />
      <p v-else-if="isDataLoading">Loading Data...</p>
      <p v-else-if="fetchError" class="storm-main__error-message">{{ fetchError }}</p>
      <p v-else>No products found.</p>
    </div>
  </main>
</template>
