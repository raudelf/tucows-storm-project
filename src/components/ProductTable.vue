<script setup>
import { ref } from 'vue'
import { useMainState } from './state/useMainState'
import StormModal from './StormModal.vue'

const {
  actor: { sortData, filteredProducts },
} = useMainState()

const modalState = ref({
  id: null,
  title: '',
  description: '',
  img: '',
  show: false,
})

const quantityAscend = ref(false)
const productAscend = ref(false)
const totalAscend = ref(false)

const handleOpenModal = (itemTitle, itemDesc, itemImg, itemId) => {
  modalState.value = {
    id: itemId,
    title: itemTitle,
    description: itemDesc,
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

const handleSort = (column) => {
  let ascend

  switch (column) {
    case 'quantity':
      quantityAscend.value = !quantityAscend.value
      productAscend.value = false
      totalAscend.value = false
      ascend = quantityAscend.value
      break
    case 'product':
      productAscend.value = !productAscend.value
      totalAscend.value = false
      quantityAscend.value = false
      ascend = productAscend.value
      break
    case 'total':
      totalAscend.value = !totalAscend.value
      quantityAscend.value = false
      productAscend.value = false
      ascend = totalAscend.value
      break
  }
  sortData(column, ascend)
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
            <button
              type="button"
              v-bind:class="
                quantityAscend ? 'storm-btn-link storm-btn-link--ascend' : 'storm-btn-link'
              "
              @click="handleSort('quantity')"
            >
              Quantity
            </button>
          </th>
          <th class="storm-table__th storm-table__th--mobile">
            <button
              type="button"
              v-bind:class="
                productAscend ? 'storm-btn-link storm-btn-link--ascend' : 'storm-btn-link'
              "
              @click="handleSort('product')"
            >
              Product Name
            </button>
          </th>
          <th class="storm-table__th">
            <button
              type="button"
              v-bind:class="
                totalAscend ? 'storm-btn-link storm-btn-link--ascend' : 'storm-btn-link'
              "
              @click="handleSort('total')"
            >
              Prices
            </button>
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
              @click="handleOpenModal(item.product, item.description, item.image, item.id)"
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
        v-if="modalState.show"
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
          <div class="storm-modal__product-details">
            <p>{{ modalState.description }}</p>
          </div>
        </template>
      </StormModal>
    </Teleport>
  </div>
</template>
