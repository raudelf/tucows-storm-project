<script setup>
import StormMobileMenu from './StormMobileMenu.vue'
import MagnifyingGlassSVG from './SVGs/MagnifyingGlassSVG.vue'

const handleFormSubmit = (e) => {
  e.preventDefault()
  console.log(e.target)
}
</script>

<template>
  <div class="storm-header__body">
    <div class="storm-container">
      <div class="storm-header__row">
        <div class="storm-header__logo">
          <a href="/" class="storm-header__logo-link">
            <div class="storm-header__img-container">
              <img
                alt="Storm"
                class="storm-header__img"
                src="../assets/images/storm-header-logo.png"
              />
            </div>
          </a>
        </div>

        <StormMobileMenu />

        <!-- <div class="storm-header__utils">
          <ul class="storm-utils-nav">
            <li class="storm-utils-nav__item storm-utils-nav__item--search"></li>
          </ul>
        </div> -->
      </div>

      <div class="storm-header__row storm-header__row--mobile">
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
      </div>
    </div>
  </div>
</template>
