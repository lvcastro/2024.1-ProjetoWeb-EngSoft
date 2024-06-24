<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'
import iconHole from '../assets/icon_hole.png'
import iconTree from '../assets/icon_tree.png'
import iconStopSign from '../assets/icon_stop-sign.png'
import iconStreetLamp from '../assets/icon_street-lamp.png'
import iconFilter from '../assets/filter.png'

const markers = ref([])
const selectedTypes = ref([])
const showCheckboxes = ref(false)

const issues = ref([
  {
    type: 'Buraco',
    count: 5,
    location: 'Avenida São Carlos',
    date: '01/06/2024',
    icon: iconHole,
  },
  {
    type: 'Árvore caída',
    count: 2,
    location: 'Rua Cezar Ricomi',
    date: '02/06/2024',
    icon: iconTree,
  },
  {
    type: 'Falta de sinalização',
    count: 3,
    location: 'Av. Trabalhador São-Carlense',
    date: '03/06/2024',
    icon: iconStopSign,
  },
  {
    type: 'Falta de iluminação',
    count: 4,
    location: 'Rua Episcopal',
    date: '04/06/2024',
    icon: iconStreetLamp,
  },
])

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
        aria-labelledby="modalAddLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content text-center text-white">
            <div class="modal-header bg-darkgreen">
              <h5 class="modal-title">Denúncia</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body bg-green3">
              <h1 class="mb-3 fs-1">{{ issues[0].type }}</h1>
              <div class="d-flex align-items-center justify-content-center mb-3">
                <img
                  :src="issues[0].icon"
                  alt="icon"
                  class="icon me-3"
                  style="width: 40px; height: 40px"
                />
                <div>
                  <p>{{ issues[0].count }} denúncias até o momento</p>
                  <p>Local: {{ issues[0].location }}</p>
                  <p>Primeira denúncia: {{ issues[0].date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapComponent :markers="filteredMarkers" class="map-component" />

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
</style>
