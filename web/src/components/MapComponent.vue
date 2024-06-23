<script setup>
import {
  VMap,
  VMapGoogleTileLayer,
  VMapScaleControl,
  VMapZoomControl,
  VMapMarker,
  VMapAttributionControl,
} from 'vue-map-ui'
import tree from '../assets/tree.png';
import stop from '../assets/stop.png';
import lamp from '../assets/lamp.png';
import hole from '../assets/hole.png';

// Definindo os eventos que o componente pode emitir
const emit = defineEmits(['map-click'])

// Definindo as propriedades que o componente pode receber
const props = defineProps({
  markers: {
    type: Array,
    default: () => [],
  },
})

const handleMapClick = (event) => {
  const { latlng } = event
  emit('map-click', { lat: latlng.lat, lng: latlng.lng })
}

const getIcon = (problem) => {
  let iconUrl;
  switch (problem) {
    case 'arvore-caida  ':
      iconUrl = tree;
      break;
    case 'falta-de-sinalizacao':
      iconUrl = stop;
      break;
    case 'falta-de-iluminacao':
      iconUrl = lamp;
      break;
    case 'buraco':
      iconUrl = hole;
      break;
    default:
      iconUrl = tree; // Ícone padrão, caso nenhum problema corresponda
  }
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 65]
  });
}

</script>

<template>
  <VMap :center="[-22.0061, -47.8911]" :zoom="17" @click="handleMapClick">
    <VMapGoogleTileLayer />
    <VMapZoomControl />
    <VMapScaleControl />
    <VMapAttributionControl position="hbottomcenter" />
    <!-- Renderiza os marcadores com base na lista de coordenadas fornecida -->
    <VMapMarker v-for="(marker, index) in markers" :key="index" :latlng="marker.coordinates" :icon="getIcon(marker.type)"/>
  </VMap>
</template> 
