<script setup>
import MapComponent from '../components/MapComponent.vue'
</script>

<template>
  <div class="bg-lightyellow mx-0 flex-grow-1">
    <div class="container mt-3 mb-3 lato">
      <h1 class="dark-green fs-2 text-center mb-2">Denuncie um problema</h1>
      <div class="container d-flex justify-content-center">
        <div class="card card-green" style="width: 100%;">
          <div class="card-body card-green">
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
  
            <div class="mb-3">
              <label for="report-email-input" class="form-label text-white fs-6">E-mail para receber atualizações (opcional)</label>
              <input type="email" class="form-control custom-form-field" id="report-email-input" aria-describedby="emailHelp"/>
              <div id="emailHelp" class="form-text text-white">
                Nós nunca compartilharemos seu email com ninguém.
              </div>
            </div>
  
            <label for="report-address-input" class="mb-2 container text-center text-white mb-0">Qual a localização do problema?</label>
            <div class="container d-flex justify-content-center">
              <div class="mb-3 d-flex flex-column col-12 col-lg-6">
                <div class="row">
                  <input type="text" class="form-control custom-form-field mb-3" id="report-address-input" v-model="address" placeholder="Digite o endereço ou marque-o no mapa"/>
                </div>
                <div class="row">
                  <div class="container px-0 d-flex flex-column justify-content-center">
                    <MapComponent style="height: 200px; max-height: 75vh; border-radius: 20px; width: 100%;" />
                  </div>
                </div>
              </div>
            </div>
  
            <button type="submit" class="btn custom-form-button float-end">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>