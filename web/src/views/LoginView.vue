<template>
  <div class="bg-lightyellow mx-0 flex-grow-1 row align-items-center">
    <div id="login-container" class="mx-auto text-center lato">
      <h1 class="mt-4">Login</h1>
      <form @submit.prevent="authenticate">
        <div class="mt-5 mb-3">
          <label for="inputEmail" class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control custom-form-field"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Senha</label>
          <input
            v-model="password"
            type="password"
            class="form-control custom-form-field"
            id="inputPassword"
          />
        </div>
        <button type="submit" class="btn custom-form-button">Entrar</button>
      </form>
    </div>
  </div>
</template>
<style>
#login-container {
  background-color: #39878b;
  width: 60%;
  height: 80%;
  border-radius: 15px;
  color: white;
}
h1 {
  font-size: 36pt;
}
.custom-form-text {
  font-size: 0.875em;
}
.form-label {
  font-size: 20pt;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async authenticate() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        })

        if (!response.data) {
          throw new Error('Não veio token JWT')
        }

        localStorage.setItem('jwtToken', response.data)

        this.$router.push({ path: '/reports' })
      } catch (error) {
        console.error('Erro ao fazer login')
      }
    },
  },
}
</script>
