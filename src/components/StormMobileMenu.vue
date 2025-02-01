<script setup>
import { ref } from 'vue'
import HamburgerMenuSVG from './SVGs/HamburgerMenuSVG.vue'
import HamburgerMenuCloseSVG from './SVGs/HamburgerMenuCloseSVG.vue'

const isOpen = ref(false)

const handleOpenMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="storm-header__mobile-nav">
    <nav class="storm-main-nav">
      <button
        type="button"
        class="storm-main-nav__btn"
        @click="handleOpenMenu"
        v-bind:aria-expanded="isOpen"
        aria-label="Toggle Navigation Menu"
      >
        <HamburgerMenuSVG v-show="!isOpen" />
        <HamburgerMenuCloseSVG v-show="isOpen" />
      </button>
      <div
        v-bind:class="
          isOpen ? 'storm-main-nav__menu storm-main-nav__menu--expanded' : 'storm-main-nav__menu'
        "
      >
        <div class="storm-container">
          <ul class="storm-main-nav__list">
            <li class="storm-main-nav__item">
              <a href="/" class="storm-main-nav__link">Settings</a>
            </li>
            <li class="storm-main-nav__item">
              <a href="/" class="storm-main-nav__link">My Account</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
