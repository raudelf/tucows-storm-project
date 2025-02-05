<script setup>
import { ref } from 'vue'
import { useMainState } from './state/useMainState'
import MagnifyingGlassSVG from './SVGs/MagnifyingGlassSVG.vue'
import HamburgerMenuCloseSVG from './SVGs/HamburgerMenuCloseSVG.vue'

const { searchQuery } = useMainState()

const searchInputValue = ref('')
const searchInputRef = ref()

const handleFormSubmit = (e) => {
  e.preventDefault()
  searchQuery.value = searchInputValue.value
}

const handleClearSearch = () => {
  searchInputValue.value = ''
  searchQuery.value = ''

  searchInputRef.value.focus()
}
</script>

<template>
  <div class="storm-header__search-container">
    <form @submit="handleFormSubmit" class="storm-header__search-form">
      <label for="header-search" class="storm-visually-hidden">Search for a product</label>
      <MagnifyingGlassSVG />
      <input
        ref="searchInputRef"
        id="header-search"
        type="text"
        name="header-search"
        class="storm-header__search-input"
        placeholder="Search"
        v-model="searchInputValue"
      />
      <button
        v-if="searchInputValue"
        class="storm-btn-link storm-header__clear-search-btn"
        type="button"
        aria-label="Clear Search"
        @click="handleClearSearch"
      >
        <HamburgerMenuCloseSVG />
      </button>
      <button class="storm-btn storm-header__search-btn" type="submit">Search</button>
    </form>
  </div>
</template>
