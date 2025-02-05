import { reactive, toRefs } from 'vue'

const stateStore = reactive({
  searchQuery: '',
  fetchError: '',
  isDataLoading: true,
  productsList: [],
  filteredCount: 0,
})

export function useMainState() {
  return toRefs(stateStore)
}
