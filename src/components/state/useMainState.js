import { ref } from 'vue'

const searchQuery = ref('')
const fetchError = ref('')
const isDataLoading = ref(true)
const productsList = ref([])
const filteredCount = ref(0)

const fetchProducts = async () => {
  isDataLoading.value = true
  fetchError.value = ''

  try {
    const response = await fetch('/products.json')

    if (!response.ok) {
      fetchError.value = 'Failed to fetch data.'
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    productsList.value = data
    filteredCount.value = data.length
  } catch (error) {
    fetchError.value = `Failed to load products: ${error.message}`
    console.error('Error Fetching JSON:', error)
  } finally {
    isDataLoading.value = false
  }
}

export function useMainState() {
  return {
    searchQuery,
    fetchError,
    isDataLoading,
    productsList,
    filteredCount,
    fetchProducts,
  }
}
