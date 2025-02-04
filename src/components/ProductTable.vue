<script setup>
import { defineProps, ref } from 'vue'
import StormModal from './StormModal.vue'

const props = defineProps({
  products: { type: Array },
})

const modalTitle = ref('')
const productImg = ref('')
const showModal = ref(false)

const openModal = (itemTitle, itemImg) => {
  modalTitle.value = itemTitle
  productImg.value = itemImg
  showModal.value = true
}

const closeModal = () => {
  modalTitle.value = ''
  showModal.value = false
}
</script>

<template>
  <div class="storm-table__container">
    <table class="storm-table storm-table--products">
      <thead class="storm-table__thead">
        <tr class="storm-table__tr">
          <th class="storm-table__th">ID</th>
          <th class="storm-table__th">Status</th>
          <th class="storm-table__th">Quantity</th>
          <th class="storm-table__th storm-table__th--mobile">Product Name</th>
          <th class="storm-table__th">Prices</th>
        </tr>
      </thead>
      <tbody>
        <tr class="storm-table__tr" v-for="(item, index) in props.products" :key="index">
          <td class="storm-table__td">{{ item.id }}</td>
          <td class="storm-table__td storm-table__td--text-center">Status</td>
          <td class="storm-table__td storm-table__td--text-center">{{ item.quantity }}</td>
          <td class="storm-table__td storm-table__td--mobile">
            <button
              class="storm-btn-link"
              @click="openModal(item.product, item.image)"
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
      <StormModal v-show="showModal" :title="modalTitle" :close-modal-fn="closeModal">
        <template v-slot:content>
          <div class="storm-modal__image-container">
            <img
              class="storm-modal__image"
              v-if="productImg"
              v-bind:src="productImg"
              v-bind:alt="modalTitle"
            />
            <img
              v-else
              src="/src/assets/images/image-not-found.png"
              alt="No Image Found For Product"
            />
          </div>
          <div class="storm-modal__product-details"></div>
        </template>
      </StormModal>
    </Teleport>
  </div>
</template>
