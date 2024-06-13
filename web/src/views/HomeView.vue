<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import MapComponent from '../components/MapComponent.vue';

// Estado para armazenar os dados do formulário
const problemType = ref('');
const email = ref('');
const coordinates = ref('');
const address = ref('');

// Observador para monitorar mudanças no endereço e atualizar as coordenadas
watch(address, (newAddress, oldAddress) => {
  if (newAddress !== '') {
    if (newAddress !== oldAddress) {
      fetchCoordinates(newAddress);
    }
  } else {
    coordinates.value = '';
  }
});


// Atualiza o endereço quando as coordenadas são definidas pelo clique no mapa
const handleMapClick = ({ lat, lng }) => {
  coordinates.value = `${lat},${lng}`;
  fetchAddress(lat, lng);
};

const fetchCoordinates = async (newAddress) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(newAddress)}&format=json&limit=1`);
    if (response.data.length > 0) {
      coordinates.value = `${response.data[0].lat},${response.data[0].lon}`;
      console.log(coordinates.value)
    } else {
      coordinates.value = '';
      console.error('Coordenadas não encontradas para o endereço:', newAddress);
      alert('Coordenadas não encontradas para o endereço:', newAddress);
    }
  } catch (error) {
    coordinates.value = '';
    console.error('Erro ao obter coordenadas:', error);
  }
};

const fetchAddress = async (lat, lng) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    if (response.data.display_name) {
      address.value = response.data.display_name;
    } else {
      address.value = 'Endereço não encontrado';
    }
  } catch (error) {
    console.error('Erro ao obter o endereço:', error);
    address.value = 'Erro ao obter o endereço';
  }
};

// Função para enviar os dados para o backend
const submitForm = async () => {
  try {
    const data = {
      problemType: problemType.value,
      email: email.value,
      address: address.value
    };

    const response = await axios.post('/reports', data);
    console.log('Resposta do backend:', response.data);

    alert('Formulário enviado com sucesso!');
    
    // Limpar o formulário após o envio bem-sucedido
    problemType.value = '';
    email.value = '';
    address.value = '';
  } catch (error) {
    console.error('Erro ao enviar os dados para o backend:', error);

    alert('Houve um erro ao enviar o formulário. Tente novamente mais tarde.');
  }
};
</script>

<template>
  <div class="bg-lightyellow">
    <div class="container mt-3 mb-3 lato">
      <h1 class="dark-green fs-2 text-center mb-3">Denuncie um problema</h1>
      <div class="card card-green">
        <div class="card-body">
          <div class="row">
            <!-- Coluna para o mapa -->
            <div class="col-md-6">
              <div class="map-container">
                <MapComponent @map-click="handleMapClick" class="map-component" />
              </div>
            </div>
            <!-- Coluna para o formulário -->
            <div class="col-md-6 d-flex flex-column">
              <label for="report-address-input" class="form-label text-white fs-6">Qual a localização do problema?</label>
              <input v-model="address" type="text" class="form-control custom-form-field mb-3" id="report-address-input" placeholder="Digite o endereço ou marque-o no mapa" />
              <div class="mb-3">
                <label for="report-subject-type-select" class="form-label text-white fs-6">Tipo do problema</label>
                <select v-model="problemType" class="form-select custom-form-field" id="report-subject-type-select">
                  <option selected disabled hidden>Selecione uma opção</option>
                  <option value="1">Buraco</option>
                  <option value="2">Árvore caída</option>
                  <option value="3">Falta de sinalização</option>
                  <option value="4">Falta de iluminação</option>
                </select>
              </div>
              <label for="report-email-input" class="form-label text-white fs-6">E-mail para receber atualizações (opcional)</label>
              <input v-model="email" type="email" class="form-control custom-form-field" id="report-email-input" aria-describedby="emailHelp" placeholder="seu@email.com"/>
              <div class="mt-auto text-center">
                <button @click="submitForm" type="submit" class="btn custom-form-button mt-3 w-100">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 60vh;
}

@media (max-width: 500px) {
  .map-container {
    width: 100%;
    height: 90vw;
    padding-bottom: 100%; /* Proporção 1:1 para largura:altura */
    position: relative;
  }

  .map-component {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.map-component {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>
