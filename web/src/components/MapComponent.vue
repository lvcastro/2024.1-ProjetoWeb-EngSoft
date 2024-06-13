<script setup>
import {
  VMap,
  VMapGoogleTileLayer,
  VMapScaleControl,
  VMapZoomControl,
  VMapMarker,
  VMapAttributionControl,
} from 'vue-map-ui'

import { defineEmits, defineProps } from 'vue';

// Definindo os eventos que o componente pode emitir
const emit = defineEmits(['map-click']);

// Definindo as propriedades que o componente pode receber
const props = defineProps({
  markers: {
    type: Array,
    default: () => []
  }
});

const handleMapClick = (event) => {
  const { latlng } = event;
  emit('map-click', { lat: latlng.lat, lng: latlng.lng });
};
</script>

<template>
  <VMap :center="[-22.0061, -47.8911]" :zoom="17" class="map-container" @click="handleMapClick">
    <VMapGoogleTileLayer />
    <VMapZoomControl />
    <VMapScaleControl />
    <VMapAttributionControl position="hbottomcenter" />
    <!-- Renderiza os marcadores com base na lista de coordenadas fornecida -->
    <VMapMarker v-for="(marker, index) in markers" :key="index" :latlng="marker"/>
  </VMap>
</template>

<style scoped>
.map-container {
  height: 94vh;
}
</style>
