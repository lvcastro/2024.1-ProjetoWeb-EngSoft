<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavbarLink {
  name: string
  path: string
}

const navbar_links: NavbarLink[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Mapa',
    path: '/map',
  },
  {
    name: 'Sobre',
    path: '/about',
  },
]
</script>

<template>
  <nav class="navbar navbar-expand-md justify-content-center" style="background-color: #39878b">
    <div class="container">
      <RouterLink to="/" class="navbar-brand d-flex w-50 me-auto">
        <img id="main-logo" src="../assets/logo-temp.png" alt="Alertaqui Logo" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-bs-toggle="collapse"
        data-bs-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse w-100" id="navbarNav">
        <ul class="navbar-nav w-100 justify-content-center">
          <li class="nav-item" v-for="navbar_link in navbar_links" :key="navbar_link.name">
            <RouterLink :to="navbar_link.path" class="nav-link text-white">{{
              navbar_link.name
            }}</RouterLink>
          </li>
        </ul>
        <div class="nav navbar-nav ms-auto w-100 justify-content-end">
          <a class="nav-link text-white" href="/admin">Login</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
/* nav {
  width: 100%;
  height: fit-content;
} */

#navbar-default {
  /* display: flex;
  padding: 10px; */
  background-color: #39878b;
}

/* #navbar-default #navbar-elements {
  flex: 1 1 0px;
}

#navbar-default ul {
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;

  align-items: center;
  justify-content: center;
}

#navbar-default li {
  display: inline;
  text-align: center;

  margin: 0px 10px 0px 10px;
  padding: 0;
}

#navbar-default #main-logo {
  flex: 1 1 0px;
  padding: 0;
} */

#main-logo {
  height: 36px;
}
</style>
