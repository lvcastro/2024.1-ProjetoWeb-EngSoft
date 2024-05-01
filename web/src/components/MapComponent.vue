<script setup>
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui'
</script>

<template>
  <VMap id="map">
    <VMapOsmTileLayer />
    <VMapZoomControl />
  </VMap>
</template>

<style scoped>
#map {
  height: 100%;
}
</style>
