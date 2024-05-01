<script setup>
import MapComponent from '../components/MapComponent.vue'
</script>

<template>
  <div class="bg-lightyellow mx-0 flex-grow-1">
    <div class="container mt-3 mb-3 lato">
      <h1 class="dark-green fs-1 text-center mb-2">Denuncie um problema</h1>
      <div class="card card-green">
        <div class="card-body card-green">
          <div class="mb-3">
            <label for="report-subject-type-select" class="form-label text-white">Tipo do problema</label>
            <select class="form-select custom-form-field" id="report-subject-type-select">
              <option selected disabled hidden>Selecione uma opção</option>
              <option value="1">Buraco</option>
              <option value="2">Árvore caída</option>
              <option value="3">Falta de sinalização</option>
              <option value="4">Falta de iluminação</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="report-email-input" class="form-label text-white">E-mail para receber atualizações (opcional)</label>
            <input type="email" class="form-control custom-form-field" id="report-email-input" aria-describedby="emailHelp"/>
            <div id="emailHelp" class="form-text text-white">
              Nós nunca compartilharemos seu email com ninguém.
            </div>
          </div>

          <label for="report-address-input" class="container text-center text-white mb-0">Qual a localização do problema?</label>
          <div class="mt-1 mb-3 d-flex justify-content-center">
            <input type="text" class="form-control custom-form-field" id="report-address-input" v-model="address"
                   placeholder="Digite o endereço ou marque-o no mapa" style="max-width: 500px"/>
          </div>
          <div class="container mb-3 d-flex justify-content-center">
            <MapComponent style="height: 300px; max-width: 500px; border-radius: 20px" />
          </div>

          <button type="submit" class="btn custom-form-button float-end">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
}
</style>
