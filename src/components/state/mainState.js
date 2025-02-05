import { reactive, toRefs } from 'vue'

const stateStore = reactive({
  searchQuery: '',
  fetchError: '',
  isDataLoading: true,
  productsList: [],
  mainCount: 0,
  filteredCount: 0,
})

export function useMainState() {
  return toRefs(stateStore)
}
