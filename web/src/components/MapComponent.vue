<script setup>
import { VMap, VMapOsmTileLayer, VMapZoomControl, VMapMarker } from 'vue-map-ui'
</script>

<template>
  <VMap :center="[-22.0175, -47.89083]" :zoom="13">
    <VMapOsmTileLayer />
    <VMapZoomControl />
    <VMapMarker :latlng="[-22.0175, -47.9]" />
  </VMap>
</template>
