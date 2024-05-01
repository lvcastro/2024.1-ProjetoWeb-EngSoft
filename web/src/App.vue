<script setup lang="ts">
import TopNavbar from './components/TopNavbar.vue'
import MainFooter from './components/MainFooter.vue'
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
