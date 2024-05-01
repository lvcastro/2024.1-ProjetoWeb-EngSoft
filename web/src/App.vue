<script setup lang="ts">
import TopNavbar from './components/TopNavbar.vue'
import MainFooter from './components/MainFooter.vue'

import 'leaflet/dist/leaflet.css'
import 'vue-map-ui/dist/normalize.css'
import 'vue-map-ui/dist/style.css'
import 'vue-map-ui/dist/theme-all.css'
</script>

<template>
  <TopNavbar></TopNavbar>

  <RouterView id="router-view-default"></RouterView>

  <MainFooter></MainFooter>
</template>

<style>
#router-view-default {
  flex-grow: 1;
}
</style>
