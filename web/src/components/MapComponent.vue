<script setup>
import {
  VMap,
  VMapGoogleTileLayer,
  VMapScaleControl,
  VMapZoomControl,
  VMapMarker,
  VMapAttributionControl,
} from 'vue-map-ui'
import treeMarker from '../assets/marker_tree.png'
import signMarker from '../assets/marker_sign.png'
import lampMarker from '../assets/marker_lamp.png'
import holeMarker from '../assets/marker_hole.png'
import defaultMarker from '../assets/marker_default.png'

// Definindo os eventos que o componente pode emitir
const emit = defineEmits(['map-click', 'marker-click'])

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

const handleMarkerClick = (marker) => {
  emit('marker-click', marker)
}

const getIcon = (problem) => {
  let iconUrl
  switch (problem) {
    case 'arvore-caida':
      iconUrl = treeMarker
      break
    case 'falta-de-sinalizacao':
      iconUrl = signMarker
      break
    case 'falta-de-iluminacao':
      iconUrl = lampMarker
      break
    case 'buraco':
      iconUrl = holeMarker
      break
    default:
      iconUrl = defaultMarker // Ícone padrão, caso nenhum problema corresponda
  }
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [35, 35],
  })
}
</script>

<template>
  <VMap :center="[-22.0061, -47.8911]" :zoom="17" @click="handleMapClick">
    <VMapGoogleTileLayer />
    <VMapZoomControl />
    <VMapScaleControl />
    <VMapAttributionControl position="hbottomcenter" />
    <!-- Renderiza os marcadores com base na lista de coordenadas fornecida -->
    <VMapMarker
      @click="handleMarkerClick(marker)"
      v-for="(marker, index) in markers"
      :key="index"
      :latlng="marker.coordinates"
      :icon="marker.type ? getIcon(marker.type) : null"
    />
  </VMap>
</template>
