<script setup>
import { onMounted, ref } from 'vue'
import { makeGroups } from '../utils/group-reports'
import axios from 'axios'

const items = ref([])

const tags = ref([
  { value: 'analise', label: 'Em análise' },
  { value: 'conserto', label: 'Em conserto' },
  { value: 'resolvido', label: 'Resolvido' },
])

const problemDict = {
  buraco: 'Buraco',
  'arvore-caida': 'Árvore caída',
  'falta-de-sinalizacao': 'Falta de sinalização',
  'falta-de-iluminacao': 'Falta de iluminação',
}

const test = [
  {
    _id: '6679edb9cb0bd9defffa0653',
    coord: {
      lat: -22.004371329055097,
      lng: -47.89204268978052,
    },
    problem: 'buraco',
    status: 'analise',
    createdAt: '2024-06-24T22:05:46.000Z',
    __v: 0,
  },
  {
    _id: '6679edcdcb0bd9defffa0655',
    coord: {
      lat: -22.004346741508897,
      lng: -47.89203229035864,
    },
    problem: 'buraco',
    status: 'analise',
    createdAt: '2024-06-24T22:06:05.108Z',
    __v: 0,
  },
  {
    _id: '6679edd8cb0bd9defffa0657',
    coord: {
      lat: -22.004346767927526,
      lng: -47.89200551868903,
    },
    problem: 'buraco',
    status: 'analise',
    createdAt: '2024-06-24T22:06:16.919Z',
    __v: 0,
  },
  {
    _id: '6679ede7cb0bd9defffa0659',
    coord: {
      lat: -22.00442635620126,
      lng: -47.892558006686926,
    },
    problem: 'arvore-caida',
    status: 'conserto',
    createdAt: '2024-06-24T22:06:31.557Z',
    __v: 0,
  },
  {
    _id: '6679edf2cb0bd9defffa065b',
    coord: {
      lat: -22.00509780019455,
      lng: -47.89169435219099,
    },
    problem: 'falta-de-iluminacao',
    status: 'resolvido',
    createdAt: '2024-06-24T22:06:42.844Z',
    __v: 0,
  },
]

onMounted(async () => {
  try {
    // const response = await axios.get('http://localhost:3000/reports')
    // items.value = await makeGroups(response.data)
    items.value = await makeGroups(test)
  } catch (error) {
    console.error('Erro ao buscar grupos de denúncias', error)
  }
})
</script>

<template>
  <div class="bg-lightyellow dark-green lato">
    <div class="container mt-5">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="mb-3 mx-auto card-green text-white p-3"
      >
        <div class="d-flex gap-4 justify-content-between align-items-center">
          <h5>{{ problemDict[item.problem] }}</h5>
          <h5 class="fw-light">{{ item.address }}</h5>
          <h5>{{ item.length }} Denúncia(s)</h5>
          <select class="form-select custom-form-field" :id="'group-tag' + index">
            <option
              v-for="tag in tags"
              :key="tag.value"
              :value="tag.value"
              :selected="tag.value === item.status"
            >
              {{ tag.label }}
            </option>
          </select>
          <button
            class="btn custom-form-field"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + index"
          >
            Expandir
          </button>
        </div>
        <div :id="'collapse' + index" class="collapse">
          <hr />
          <h3>Denúncia(s):</h3>
          <ul class="list-group mt-3">
            <li v-for="issue in item" :key="issue._id" class="my-1">
              <p>Feita em: {{ new Date(issue.createdAt).toLocaleString() }}</p>
              <p>
                Email de contato: {{ issue.contactEmail ? issue.contactEmail : 'Não informado' }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
