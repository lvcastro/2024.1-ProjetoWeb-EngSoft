<template>
  <div class="bg-lightyellow dark-green lato">
    <h1 class="text-center my-3">Gerenciar administradores</h1>
    <div class="container border border-2 border-black rounded">
      <div class="row px-2 py-4 attributes">
        <div class="col-md-5">Nome</div>
        <div class="col-md-5">Email</div>
        <div class="col-md-2">
          <button type="button" data-bs-toggle="modal" data-bs-target="#modalAdd">
            <span class="material-symbols-outlined">add_circle</span>
          </button>
        </div>
      </div>

      <div v-for="admin in admins" :key="admin._id" class="row p-2">
        <div class="col-md-5">
          <p>{{ admin.name }}</p>
        </div>
        <div class="col-md-5">
          <p>{{ admin.email }}</p>
        </div>
        <div class="col-md-2">
          <button
            type="button"
            @click="setCurrentAdmin(admin)"
            data-bs-toggle="modal"
            data-bs-target="#modalEditar"
          >
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Adicionar -->
    <div
      class="modal fade"
      tabindex="-1"
      id="modalAdd"
      aria-labelledby="modalAddLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-white bg-green3">
            <h2 class="modal-title" id="modalAddLabel">Adicionar Administrador</h2>
          </div>
          <div class="modal-body dark-green bg-lightyellow">
            <form @submit.prevent="addAdmin">
              <div class="mb-3">
                <label for="add_name" class="form-label">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="add_name"
                  v-model="newAdmin.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="add_email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="add_email"
                  v-model="newAdmin.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="add_password" class="form-label">Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="add_password"
                  v-model="newAdmin.password"
                  required
                />
              </div>
              <button type="submit" class="btn text-white bg-green3 m-1">Adicionar</button>
              <button
                type="button"
                class="btn text-white bg-green3 m-1"
                @click="cancel"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div
      class="modal fade"
      tabindex="-1"
      id="modalEditar"
      aria-labelledby="modalEditarLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-white bg-green3">
            <h2 class="modal-title" id="modalEditarLabel">Editar Administrador</h2>
          </div>
          <div class="modal-body dark-green bg-lightyellow">
            <form @submit.prevent="updateAdmin">
              <div class="mb-3">
                <label for="change_name" class="form-label">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="change_name"
                  v-model="currentAdmin.name"
                />
              </div>
              <div class="mb-3">
                <label for="change_password" class="form-label">Nova Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="change_password"
                  v-model="newPassword"
                />
              </div>
              <button type="submit" class="btn text-white bg-green3 m-1" data-bs-dismiss="modal">
                Salvar
              </button>
              <button
                type="button"
                class="btn text-white bg-green3 m-1"
                @click="removeAdmin"
                data-bs-dismiss="modal"
              >
                Remover
              </button>
              <button
                type="button"
                class="btn text-white bg-green3 m-1"
                @click="cancel"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.attributes {
  background-color: #39878b;
  color: white;
  border-top: 1px solid black;
}
.bg-green3 {
  background-color: #39878b;
}
.btn:hover {
  background-color: #39878b;
}
</style>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      admins: [],
      newAdmin: { name: '', email: '', password: '' },
      currentAdmin: { name: '', password: '' },
      currentAdminId: null,
      newPassword: '',
    }
  },
  methods: {
    async fetchAdmins() {
      try {
        const response = await axios.get('http://localhost:3000/admin', {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        })
        this.admins = response.data
      } catch (error) {
        console.error('Erro ao procurar admins:', error)
      }
    },
    async addAdmin() {
      try {
        await axios.post('http://localhost:3000/admin', this.newAdmin, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        })
        this.fetchAdmins()
        this.newAdmin = { name: '', email: '', password: '' }
      } catch (error) {
        console.error('Erro ao adicionar admin:', error)
      }
    },
    setCurrentAdmin(admin) {
      this.currentAdmin = { ...admin }
      this.currentAdminId = admin._id
    },
    async updateAdmin() {
      try {
        // Se os 2 campos estiverem vazios não envia
        if (!this.newPassword && !this.currentAdmin.name) return

        const updateObj = {}

        if (this.currentAdmin.name) updateObj.name = this.currentAdmin.name
        if (this.newPassword) updateObj.password = this.newPassword

        await axios.patch(`http://localhost:3000/admin/${this.currentAdminId}`, updateObj, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        })
        this.fetchAdmins()
        this.currentAdmin = { name: '', password: '' }
        this.currentAdminId = null
        this.newPassword = ''
      } catch (error) {
        console.error('Erro ao dar update no admin:', error)
      }
    },
    async removeAdmin() {
      try {
        await axios.delete(`http://localhost:3000/admin/${this.currentAdminId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        })
        this.fetchAdmins()
        this.currentAdmin = { name: '', password: '' }
        this.currentAdminId = null
      } catch (error) {
        console.error('Erro ao remover admin:', error)
      }
    },
    cancel() {
      this.newAdmin = { name: '', email: '', password: '' }
      this.currentAdmin = { name: '', password: '' }
    },
  },
  created() {
    this.fetchAdmins()
  },
}
</script>
