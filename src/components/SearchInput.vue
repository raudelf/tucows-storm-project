<script setup>
import MagnifyingGlassSVG from './SVGs/MagnifyingGlassSVG.vue'

const handleFormSubmit = (e) => {
  e.preventDefault()
  console.log(e.target)
}
</script>

<template>
  <div class="storm-header__search-container">
    <form @submit="handleFormSubmit" class="storm-header__search-form">
      <label for="header-search" class="storm-visually-hidden">Search for a product</label>
      <MagnifyingGlassSVG />
      <input
        id="header-search"
        type="text"
        name="header-search"
        class="storm-header__search-input"
        placeholder="Search"
      />
      <button class="storm-btn storm-header__search-btn" type="submit">Search</button>
    </form>
  </div>
</template>
