<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MapComponent from '../components/MapComponent.vue';
import SidebarComponent from '../components/SideBarComponent.vue';

const markers = ref([]);

// Função para buscar os marcadores do backend
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/reports');
    if (Array.isArray(response.data)) {
      markers.value = response.data.map(item => [item.latitude, item.longitude]);
    } else {
      console.error('Os dados recebidos do backend não são do tipo array:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar os marcadores do backend:', error);
  }
});
</script>

<template>
  <div class="bg-lightyellow">
    <div class="container-fluid lato">
      <div class="row">
        <div class="col-md-3">
          <SidebarComponent />
        </div>
        <div class="col-md-9 d-block m-0">
          <MapComponent :markers="markers" class="map-component" />
        </div>
      </div>
    </div>
  </div>
</template>
