import { ref } from 'vue'

const searchQuery = ref('')
const fetchError = ref('')
const isDataLoading = ref(false)
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

const filteredProducts = () => {
  if (!searchQuery.value) {
    filteredCount.value = productsList.value.length
    return productsList.value
  }

  const filteredData = productsList.value.filter((product) => {
    return product.product.toLowerCase().includes(searchQuery.value.toLowerCase())
  })

  filteredCount.value = filteredData.length

  return filteredData
}

const sortData = (sortBy, ascendRef) => {
  productsList.value = [...productsList.value].sort((a, b) => {
    if (sortBy === 'product') {
      return ascendRef ? a.product.localeCompare(b.product) : b.product.localeCompare(a.product)
    } else {
      return ascendRef ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
    }
  })
}

export function useMainState() {
  return {
    state: {
      searchQuery,
      fetchError,
      isDataLoading,
      productsList,
      filteredCount,
    },
    actor: {
      fetchProducts,
      filteredProducts,
      sortData,
    },
  }
}
