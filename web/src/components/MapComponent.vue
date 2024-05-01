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
  <VMap :center="[-22.0175, -47.89083]" :zoom="13">
    <VMapGoogleTileLayer />
    <VMapZoomControl />
    <VMapScaleControl />
    <VMapAttributionControl position="hbottomcenter" />
    <VMapMarker :latlng="[-22.0175, -47.9]" />
  </VMap>
</template>
