<script setup>
import StormMobileMenu from './StormMobileMenu.vue'
import SearchInput from './SearchInput.vue'
import GearSVG from './SVGs/GearSVG.vue'
import BellSVG from './SVGs/BellSVG.vue'
import ProfileSVG from './SVGs/ProfileSVG.vue'
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

        <div class="storm-header__utils">
          <ul class="storm-utils-nav">
            <li class="storm-utils-nav__item storm-utils-nav__item--search">
              <SearchInput />
            </li>
            <li class="storm-utils-nav__item">
              <a href="/" class="storm-utils-nav__link" aria-label="settings">
                <GearSVG />
              </a>
            </li>
            <li class="storm-utils-nav__item">
              <a href="/" class="storm-utils-nav__link" aria-label="notifications">
                <BellSVG />
              </a>
            </li>
            <li class="storm-utils-nav__item">
              <a href="/" class="storm-utils-nav__link storm-utils-nav__link--profile">
                <ProfileSVG />
                <span>Adriana Arias</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="storm-header__row storm-header__row--mobile">
        <SearchInput />
      </div>
    </div>
  </div>
</template>
