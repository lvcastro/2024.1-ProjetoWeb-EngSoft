<script setup lang="ts">
import { ref } from 'vue';

import iconHole from '../assets/icon_hole.png';
import iconTree from '../assets/icon_tree.png';
import iconStopSign from '../assets/icon_stop-sign.png';
import iconStreetLamp from '../assets/icon_street-lamp.png';

const issues = ref([
  {
    type: 'Buraco',
    count: 5,
    location: 'Avenida São Carlos',
    date: '01/06/2024',
    icon: iconHole
  },
  {
    type: 'Árvore caída',
    count: 2,
    location: 'Rua Cezar Ricomi',
    date: '02/06/2024',
    icon: iconTree
  },
  {
    type: 'Falta de sinalização',
    count: 3,
    location: 'Av. Trabalhador São-Carlense',
    date: '03/06/2024',
    icon: iconStopSign
  },
  {
    type: 'Falta de iluminação',
    count: 4,
    location: 'Rua Episcopal',
    date: '04/06/2024',
    icon: iconStreetLamp
  }
]);
</script>

<template>
    <div class="p-3 d-flex flex-column align-items-center pb-0">
      <h2 class="dark-green mb-3 fs-2">Denúncias</h2>
      <ul class="list-unstyled">
        <li v-for="(issue, index) in issues" :key="index" class="card-green mw-100 d-flex align-items-center mb-3 p-3">
          <img :src="issue.icon" alt="icon" class="icon me-3" style="width: 40px; height: 40px;">
          <div class="details text-white text-center">
            <h3 class="fs-4 mb-1">{{ issue.type }}</h3>
            <p class="m-0">{{ issue.count }} denúncias até o momento</p>
            <p class="m-0">Local: {{ issue.location }}</p>
            <p class="m-0">Primeira denúncia: {{ issue.date }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>