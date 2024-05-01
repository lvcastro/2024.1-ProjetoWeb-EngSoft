<template>
  <div class="bg-lightyellow mx-0 flex-grow-1 row align-items-center">
    <div id="login-container" class="mx-auto text-center">
      <h1 class="mt-4">Login Administradores</h1>
      <form>
        <div class="mt-5 mb-3">
          <label for="inputEmail" class="form-label">Email</label>
          <input
            type="email"
            class="form-control custom-form-field"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="custom-form-text">
            Nós nunca compartilharemos seu email com ninguém.
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Senha</label>
          <input type="password" class="form-control custom-form-field" id="inputPassword" />
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
