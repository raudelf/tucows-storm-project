<script setup>
import { defineProps } from 'vue'
import HamburgerMenuCloseSVG from './SVGs/HamburgerMenuCloseSVG.vue'

const props = defineProps({
  title: { type: String },
  closeModalFn: { type: Function },
})
</script>

<template>
  <div class="storm-modal__background">
    <div class="storm-modal">
      <div class="storm-modal__container" role="dialog" aria-modal="true">
        <div class="storm-modal__header">
          <h2 class="storm-modal__header-text">{{ props.title }}</h2>
          <button class="storm-btn-link" aria-label="Close Modal" @click="props.closeModalFn">
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
