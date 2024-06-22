<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'

const markers = ref([])
const selectedType = ref('')

// Função para buscar os marcadores do backend
const fetchMarkers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/reports')
    if (Array.isArray(response.data)) {
      markers.value = response.data.map((item) => ({
        coordinates: [item.coord.lat, item.coord.lng],
        type: item.problem
      }))
    } else {
      console.error('Os dados recebidos do backend não são do tipo array:', response.data)
    }
  } catch (error) {
    console.error('Erro ao buscar os marcadores do backend:', error)
  }
}

onMounted(fetchMarkers)

const filteredMarkers = computed(() => {
  if (!selectedType.value || selectedType.value === 'Todas') return markers.value
  return markers.value.filter(marker => marker.type === selectedType.value.toLowerCase())
})

watch(selectedType, fetchMarkers)
</script>

<template>
  <div>
    <MapComponent :markers="filteredMarkers" />
  </div>
</template>

<style scoped>
div {
  margin: 0;
  flex-grow: 1;
}
</style>