<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'
import iconHole from '../assets/icon_hole.png';
import iconTree from '../assets/icon_tree.png';
import iconSign from '../assets/icon_sign.png';
import iconLamp from '../assets/icon_lamp.png';
import iconFilter from '../assets/filter.png';

const markers = ref([])
const selectedTypes = ref([])
const showCheckboxes = ref(false)

const showModal = ref(false)
const selectedMarker = ref(null)

const checkboxes = ref([
  { label: 'Buraco', value: 'buraco' },
  { label: 'Árvore caída', value: 'arvore-caida' },
  { label: 'Falta de sinalização', value: 'falta-de-sinalizacao' },
  { label: 'Falta de iluminação', value: 'falta-de-iluminacao' },
])

const fetchMarkers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/reports')
    if (Array.isArray(response.data)) {
      markers.value = response.data.map((item) => ({
        coordinates: [item.coord.lat, item.coord.lng],
        type: item.problem,
      }))
    } else {
      console.error('Os dados recebidos do backend não são do tipo array:', response.data)
    }
  } catch (error) {
    console.error('Erro ao buscar os marcadores do backend:', error)
  }
}

const filteredMarkers = computed(() => {
  if (selectedTypes.value.length === 0) return markers.value
  return markers.value.filter((marker) => selectedTypes.value.includes(marker.type))
})

const toggleCheckboxes = () => {
  showCheckboxes.value = !showCheckboxes.value
}

const handleMarkerClick = (marker) => {
  selectedMarker.value = marker;
  console.log(selectedMarker);
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false
  selectedMarker.value = null
}

const typeMapping = {
  'buraco': { label: 'Buraco', icon: iconHole },
  'arvore-caida': { label: 'Árvore caída', icon: iconTree },
  'falta-de-sinalizacao': { label: 'Falta de sinalização', icon: iconSign },
  'falta-de-iluminacao': { label: 'Falta de iluminação', icon: iconLamp }
};

const formatType = (type) => {
  return typeMapping[type]?.label || type;
}

const getIcon = (type) => {
  return typeMapping[type]?.icon || '';
}

onMounted(fetchMarkers)

// watch(selectedTypes, fetchMarkers)
</script>

<template>
  <div class="bg-lightyellow">
    <div class="container-fluid h-100 p-0">
      <!-- <button type="button" data-bs-toggle="modal" data-bs-target="#modalAdd">
          <span class="text-black">BOTAO</span>
        </button> -->
      <div
        class="modal fade"
        tabindex="-1"
        id="modalAdd"
        :class="{ show: showModal }"
        :style="{ display: showModal ? 'block' : 'none' }"
        aria-labelledby="modalAddLabel"
        :aria-hidden="(!showModal)"
      >
        <div class="modal-dialog">
          <div class="modal-content text-center text-white">
            <div class="modal-header bg-darkgreen">
              <p class="modal-title">Denúncia</p>
              <button
                type="button"
                class="btn-close custom-close-btn"
                aria-label="Close"
                @click="closeModal"
                ></button>
            </div>
            <div class="modal-body bg-green3" v-if="selectedMarker">
              <h1 class="mb-3 fs-1">{{ formatType(selectedMarker.type) }}</h1>
              <div class="d-flex align-items-center justify-content-center mb-3">
                <img
                  :src="getIcon(selectedMarker.type)"
                  alt="icon"
                  class="icon me-3"
                  style="width: 70px; height: 70px;"
                />
                <div>
                  <p>{{ selectedMarker.count }} denúncias até o momento</p>
                  <p>Local: {{ selectedMarker.coordinates }}</p>
                  <p>Primeira denúncia: {{ selectedMarker.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <MapComponent :markers="filteredMarkers" @marker-click="handleMarkerClick" class="map-component" />

      <div class="button-container">
        <button @click="toggleCheckboxes" class="circular-button">
          <img :src="iconFilter" alt="filtro" class="button-icon" />
        </button>
        <div v-show="showCheckboxes" class="checkboxes-container mt-2">
          <div v-for="checkbox in checkboxes" :key="checkbox.value" class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="checkbox.value"
              :value="checkbox.value"
              v-model="selectedTypes"
            />
            <label class="form-check-label" :for="checkbox.value">{{ checkbox.label }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-darkgreen {
  background-color: #2f4858;
}
.bg-green3 {
  background-color: #39878b;
}
.btn:hover {
  background-color: #39878b;
}
.map-component {
  height: 100%;
  width: 100%;
}
.button-container {
  width: 10%;
  margin-left: 2%;
  position: absolute;
  top: 10%;
  z-index: 9999;
}
.circular-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #39878b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-icon {
  width: 30px;
  height: 30px;
}
.checkboxes-container {
  background-color: #95b0b7;
  border: 1px solid #39878b;
  color: white;
  border-radius: 5px;
  padding: 10px;
}
.form-check {
  margin-bottom: 5px;
}
.custom-close-btn {
  background-color: red; /* Mude esta cor para a cor desejada */
  border: none;
  opacity: 1; /* Torne o botão totalmente opaco */
}
</style>