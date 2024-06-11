<script setup>
import {
  VMap,
  VMapGoogleTileLayer,
  VMapScaleControl,
  VMapZoomControl,
  VMapMarker,
  VMapAttributionControl,
} from 'vue-map-ui'
</script>

<template>
  <VMap :center="[-22.0061, -47.8911]" :zoom="17" class="map-container">
    <VMapGoogleTileLayer />
    <VMapZoomControl />
    <VMapScaleControl />
    <VMapAttributionControl position="hbottomcenter" />
    <VMapMarker :latlng="[-22.0068, -47.8909]"/>
    <VMapMarker :latlng="[-22.0059, -47.8928]" />
    <VMapMarker :latlng="[-22.0050, -47.8920]" />
    <VMapMarker :latlng="[-22.0044, -47.8929]" />
  </VMap>
</template>

<style scoped>
.map-container {
  height: 94vh;
}
</style>
