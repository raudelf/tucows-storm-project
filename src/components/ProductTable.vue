<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  products: { type: Array },
})
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
            <p>{{ item.product }}</p>
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
  </div>
</template>
