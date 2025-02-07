<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useTrapFocus } from './utils/useTrapFocus'
import HamburgerMenuCloseSVG from './SVGs/HamburgerMenuCloseSVG.vue'

const props = defineProps({
  title: { type: String },
  closeModalFn: { type: Function, required: true },
})

const { trapFocus, handleEscapeKey, handleTabKey } = useTrapFocus()

const modalRef = ref()

onMounted(() => {
  nextTick(() => {
    trapFocus(modalRef)
    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', (e) => handleEscapeKey(e, props.closeModalFn))
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleTabKey)
  document.removeEventListener('keydown', (e) => handleEscapeKey(e, props.closeModalFn))
})
</script>

<template>
  <div class="storm-modal__background">
    <div class="storm-modal">
      <div ref="modalRef" class="storm-modal__container" role="dialog" aria-modal="true">
        <div class="storm-modal__header">
          <h2 v-if="props.title" class="storm-modal__header-text">{{ props.title }}</h2>
          <button
            id="storm-modal-close-btn"
            class="storm-btn-link"
            aria-label="Close Modal"
            @click="props.closeModalFn"
          >
            <HamburgerMenuCloseSVG />
          </button>
        </div>
        <div class="storm-modal__main-content">
          <slot name="content"></slot>
        </div>
        <div class="storm-modal__btn-container">
          <button
            class="storm-btn-secondary storm-modal__btn"
            type="button"
            @click="props.closeModalFn"
            aria-label="Close Modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
