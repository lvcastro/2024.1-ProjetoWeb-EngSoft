<script setup>
import MapComponent from '../components/MapComponent.vue'
</script>

<template>
  <div class="bg-lightyellow">
    <div class="container mt-3 mb-3 lato">
      <h1 class="dark-green fs-2 text-center mb-2">Denuncie um problema</h1>
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card card-green h-100">
            <div class="card-body">
              <div class="mb-3">
                <label for="report-subject-type-select" class="form-label text-white fs-6">Tipo do problema</label>
                <select class="form-select custom-form-field" id="report-subject-type-select">
                  <option selected disabled hidden>Selecione uma opção</option>
                  <option value="1">Buraco</option>
                  <option value="2">Árvore caída</option>
                  <option value="3">Falta de sinalização</option>
                  <option value="4">Falta de iluminação</option>
                </select>
              </div>
              <label for="report-email-input" class="form-label text-white fs-6">E-mail para receber atualizações (opcional)</label>
              <input type="email" class="form-control custom-form-field" id="report-email-input" aria-describedby="emailHelp"/>
              <!-- <div id="emailHelp" class="form-text text-white">Nós nunca compartilharemos seu email com ninguém.</div> -->

              <div class="d-block d-md-none text-center text-white mt-3">
                  <label for="report-address-input">Qual a localização do problema?</label>
                  <input type="text" class="form-control custom-form-field my-2" id="report-address-input" v-model="address" placeholder="Digite o endereço ou marque-o no mapa" />
                  <div class="map-container">
                      <MapComponent class="map-component" />
                  </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3 d-none d-md-block">
          <div class="card card-green h-100">
            <div class="card-body text-center text-white">
                  <label for="report-address-input">Qual a localização do problema?</label>
                  <input type="text" class="form-control custom-form-field my-3" id="report-address-input" v-model="address" placeholder="Digite o endereço ou marque-o no mapa" />
                  <div class="map-container">
                      <MapComponent class="map-component" />
                  </div>
              </div>
          </div>
        </div>
        <div class="justify-content-center">
          <button type="submit" class="btn custom-form-button float-end">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.map-container {
  width: 100%;
  height: 50vh; /* Altura padrão para o mapa */
}

@media (max-width: 768px) {
  .map-container {
    height: 30vh; /* Ajuste para telas menores */
  }
}

.map-component {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>