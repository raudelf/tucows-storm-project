<script setup>
const props = defineProps({
  statusCode: { type: Number, required: true },
  statusText: { type: String, required: true },
})

const statusCodes = {
  1: 'green',
  2: 'blue',
  3: 'yellow',
  4: 'red',
}

const textClassName = 'storm-status__text'
const colorClass = `${textClassName}--${statusCodes[props.statusCode] || 'blue'}`
</script>

<template>
  <div class="storm-status__container">
    <p v-bind:class="`${textClassName} ${colorClass}`">{{ props.statusText }}</p>
  </div>
</template>
