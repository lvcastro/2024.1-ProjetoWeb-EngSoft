<script setup>
  import MapComponent from '../components/MapComponent.vue'
</script>

<template>
  <div class="bg-lightyellow mx-0 flex-grow-1">
    <div class="container px-3 py-5">
      <div class="card card-green">
        <div class="card-body card-green">
          <h3 class="card-title text-white text-center my-3">Denuncie um problema</h3>

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
            <label for="exampleInputEmail1" class="form-label text-white">E-mail para receber atualizações (opcional)</label>
            <input type="email" class="form-control custom-form-field" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text text-white">Nós nunca compartilharemos seu email com ninguém.</div>
          </div>
          
          <div class="container">
            <MapComponent />
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

.bg-lightyellow {
  background-color: #ece8d7;
}

.card-green {
  background-color: #39878b;
  border-radius: 20px;
}

.custom-form-field {
  background-color: #95b0b7;
  border: none;
  color: #fff;
}

.custom-form-field:focus {
  background-color: #95b0b7;
  border: none;
  color: #fff;
}

.custom-form-button {
  background-color: #326775;
  color: #fff;
  border: none;
  border-radius: 30px;
  transition: background-color 0.3s;
}

.custom-form-button:hover {
  background-color: #95b0b7;
  color: #fff;
}
</style>