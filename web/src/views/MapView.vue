<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'
import iconHole from '../assets/icon_hole.png'
import iconTree from '../assets/icon_tree.png'
import iconSign from '../assets/icon_sign.png'
import iconLamp from '../assets/icon_lamp.png'
import iconFilter from '../assets/filter.png'
import { makeGroups } from '../utils/group-reports'

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
      const groups = await makeGroups(response.data)
      markers.value = groups.map((item) => ({
        coordinates: item.center,
        type: item.problem,
        count: item.length,
        address: item.address,
        date: new Date(item[0].createdAt).toLocaleString('pt-BR'),
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
  selectedMarker.value = marker
  console.log(selectedMarker)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedMarker.value = null
}

const typeMapping = {
  buraco: { label: 'Buraco', icon: iconHole },
  'arvore-caida': { label: 'Árvore caída', icon: iconTree },
  'falta-de-sinalizacao': { label: 'Falta de sinalização', icon: iconSign },
  'falta-de-iluminacao': { label: 'Falta de iluminação', icon: iconLamp },
}

const formatType = (type) => {
  return typeMapping[type]?.label || type
}

const getIcon = (type) => {
  return typeMapping[type]?.icon || ''
}

onMounted(fetchMarkers)
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
        :aria-hidden="!showModal"
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
                  style="width: 70px; height: 70px"
                />
                <div>
                  <p>{{ selectedMarker.count }} denúncias até o momento</p>
                  <p>Local: {{ selectedMarker.address }}</p>
                  <p>Primeira denúncia: {{ selectedMarker.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapComponent
        :markers="filteredMarkers"
        @marker-click="handleMarkerClick"
        class="map-component"
      />

      <div class="button-container">
        <button @click="toggleCheckboxes" class="circular-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90%"
            height="90%"
            fill="currentColor"
            class="bi bi-funnel"
            viewBox="0 0 16 16"
            style="position: relative; top: 1.5px; color: #b8e49c"
          >
            <path
              d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
            />
          </svg>
          <!--<img :src="iconFilter" alt="filtro" class="button-icon" style="position: relative; top: 2px; filter: brightness(2);" />-->
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
  z-index: 998;
}
.circular-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #39878b;
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
  background-color: #39878b;
  color: white;
  border-radius: 5px;
  padding: 10px;
  width: fit-content;
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
