<script setup>
import MapComponent from '../components/MapComponent.vue'
import { computed, onMounted, ref } from 'vue'
import { makeGroups } from '../utils/group-reports'
import axios from 'axios'
import iconHole from '../assets/icon_hole.png'
import iconTree from '../assets/icon_tree.png'
import iconSign from '../assets/icon_sign.png'
import iconLamp from '../assets/icon_lamp.png'

const items = ref([])
const currentTag = ref('')
const currentIndex = ref(0)

const marker = computed(() => {
  return [
    {
      coordinates: items.value[currentIndex.value]?.center,
      type: items.value[currentIndex.value]?.problem,
    },
  ]
})

const tags = ['analise', 'conserto', 'resolvido']

const tagDict = {
  analise: 'Em análise',
  conserto: 'Em conserto',
  resolvido: 'Resolvido',
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/reports')
    items.value = await makeGroups(response.data)
  } catch (error) {
    console.error('Erro ao buscar grupos de denúncias', error)
  }
})

const typeMapping = {
  buraco: { label: 'Buraco', icon: iconHole },
  'arvore-caida': { label: 'Árvore caída', icon: iconTree },
  'falta-de-sinalizacao': { label: 'Falta de sinalização', icon: iconSign },
  'falta-de-iluminacao': { label: 'Falta de iluminação', icon: iconLamp },
}
const getIcon = (type) => {
  return typeMapping[type]?.icon || ''
}

function setCurr(idx) {
  currentIndex.value = idx
  currentTag.value = items.value[idx].status
}

async function updateTag() {
  const idx = currentIndex.value
  items.value[idx].status = currentTag.value

  for (const i of items.value[idx]) {
    try {
      await axios.patch(
        `http://localhost:3000/reports/${i._id}`,
        { status: currentTag.value },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        },
      )
    } catch (error) {
      console.error('Erro ao atualizar denúncias! ', error)
    }
  }
}

async function removeProblem() {
  const idx = currentIndex.value

  for (const i of items.value[idx]) {
    try {
      await axios.delete(`http://localhost:3000/reports/${i._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      })
    } catch (error) {
      console.error('Erro ao remover denúncia! ', error)
    }
  }

  items.value.splice(idx, 1)
}

const reload = ref(0)

function map(index) {
  currentIndex.value = index
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  }, 100)
}
</script>

<template>
  <div class="bg-lightyellow dark-green lato">
    <h1 class="text-center my-3">Gerenciar problemas</h1>
    <div class="container mt-5" id="problemCards">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="mb-3 mx-auto card-green text-white p-3"
      >
        <div>
          <div class="d-flex gap-3 align-items-center">
            <img :src="getIcon(item.problem)" alt="Problem icon" class="problem-icon mb-2" />
            <h5>{{ typeMapping[item.problem].label }}</h5>
          </div>
          <h5>{{ item.address }}</h5>
          <h5 class="fw-light">{{ item.length }} Denúncia(s)</h5>
          <div class="d-flex gap-2 mb-2 align-items-center">
            <h5>{{ tagDict[item.status] }}</h5>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              @click="setCurr(index)"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div>
            <button
              class="btn custom-form-field me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#mapModal"
              @click="map(index)"
            >
              Ver no mapa
            </button>
            <button
              class="btn custom-form-field"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index"
            >
              Ver denúncias
            </button>
          </div>
        </div>
        <div :id="'collapse' + index" class="collapse">
          <h3 style="border-top: 2px solid white; margin-top: 20px; padding-top: 15px">
            Denúncia(s):
          </h3>
          <ul class="list-group mt-3">
            <li v-for="issue in item" :key="issue._id" class="my-1 separation">
              <p>Feita em: {{ new Date(issue.createdAt).toLocaleString() }}</p>
              <p>
                Email de contato: {{ issue.contactEmail ? issue.contactEmail : 'Não informado' }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal edição -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-white bg-green3">
            <h5 class="modal-title" id="editModalLabel">Editar</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body bg-lightyellow">
            <h5>Alterar tag</h5>
            <select v-model="currentTag" class="form-select custom-form-field">
              <option v-for="tag in tags" :key="tag" :value="tag" :selected="currentTag == tag">
                {{ tagDict[tag] }}
              </option>
            </select>
          </div>
          <div class="modal-footer bg-lightyellow">
            <button
              type="button"
              @click="updateTag"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Salvar
            </button>
            <button
              type="button"
              @click="removeProblem"
              data-bs-dismiss="modal"
              class="btn btn-danger"
            >
              Remover problema
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Mapa -->
    <div
      class="modal fade"
      id="mapModal"
      tabindex="-1"
      aria-labelledby="mapModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-white bg-green3">
            <h5 class="modal-title" id="mapModalLabel">Localização do problema</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div id="teste" class="modal-body bg-lightyellow">
            <div class="map-container">
              <MapComponent
                :markers="marker"
                :center="items[currentIndex]?.center"
                class="map-component"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.map-container {
  width: 100%;
  height: 60vh;
  position: relative;
}

.map-component {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#problemCards {
  width: max-content;
}
.problem-icon {
  width: 45px;
  height: 45px;
}
.bg-green3 {
  background-color: #39878b;
}
.separation:not(:last-child) {
  border-bottom: 2px solid white;
}
</style>
