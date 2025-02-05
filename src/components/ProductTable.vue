<script setup>
import { ref } from 'vue'
import { useMainState } from './state/useMainState'
import StormModal from './StormModal.vue'

const {
  state: { productsList, searchQuery, filteredCount },
} = useMainState()

const modalState = ref({
  id: null,
  title: '',
  img: '',
  show: false,
})

const ascend = ref(true)

const handleOpenModal = (itemTitle, itemImg, itemId) => {
  modalState.value = {
    title: itemTitle,
    img: itemImg,
    show: true,
  }
}

const handleCloseModal = () => {
  const buttonRef = document.querySelector(`#modalBtnRef-${modalState.value.id}`)
  modalState.value = {
    id: null,
    title: '',
    img: '',
    show: false,
  }

  buttonRef.focus()
}

const sortData = (sortBy) => {
  ascend.value = !ascend.value

  switch (sortBy) {
    case 'product':
      productsList.value = productsList.value.sort((a, b) => {
        return ascend.value
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product)
      })
      break
    default:
      productsList.value = productsList.value.sort((a, b) => {
        return ascend.value ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      })
      break
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
</script>

<template>
  <div class="storm-table__container">
    <table class="storm-table storm-table--products">
      <thead class="storm-table__thead">
        <tr class="storm-table__tr">
          <th class="storm-table__th">ID</th>
          <th class="storm-table__th">Status</th>
          <th class="storm-table__th">
            <button type="button" class="storm-btn-link" @click="sortData('quantity')">
              Quantity
            </button>
          </th>
          <th class="storm-table__th storm-table__th--mobile">
            <button type="button" class="storm-btn-link" @click="sortData('product')">
              Product Name
            </button>
          </th>
          <th class="storm-table__th">
            <button type="button" class="storm-btn-link" @click="sortData('total')">Prices</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="storm-table__tr" v-for="item in filteredProducts()" :key="item.id">
          <td class="storm-table__td">{{ item.id }}</td>
          <td class="storm-table__td storm-table__td--text-center">Status</td>
          <td class="storm-table__td storm-table__td--text-center">{{ item.quantity }}</td>
          <td class="storm-table__td storm-table__td--mobile">
            <button
              v-bind:id="`modalBtnRef-${item.id}`"
              class="storm-btn-link"
              type="button"
              @click="handleOpenModal(item.product, item.image, item.id)"
              aria-haspopup="true"
            >
              {{ item.product }}
            </button>
            <p class="storm-table__sub-text">
              {{ item.serial }}
              <span class="storm-table__sub-text storm-table__sub-text--mobile"
                >- Qty: {{ item.quantity }}</span
              >
            </p>
          </td>
          <td class="storm-table__td">${{ item.total.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <Teleport to="#modal">
      <StormModal
        v-show="modalState.show"
        :title="modalState.title"
        :close-modal-fn="handleCloseModal"
      >
        <template v-slot:content>
          <div class="storm-modal__image-container">
            <img
              class="storm-modal__image"
              v-bind:src="
                modalState.img ? modalState.img : '/src/assets/images/image-not-found.png'
              "
              v-bind:alt="modalState.img ? modalState.title : 'No Image Found For Product'"
            />
          </div>
          <div class="storm-modal__product-details"></div>
        </template>
      </StormModal>
    </Teleport>
  </div>
</template>
