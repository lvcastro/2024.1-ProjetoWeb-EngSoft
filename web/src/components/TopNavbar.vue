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
  <nav>
    <div id="navbar-default">
      <RouterLink id="main-logo" to="/"
        ><img src="../assets/logo-temp.png" alt="Alertaqui Logo"
      /></RouterLink>
      <div id="navbar-elements">
        <ul>
          <li v-for="navbar_link in navbar_links" :key="navbar_link.name">
            <RouterLink :to="navbar_link.path" class="text-decoration-none text-white">{{
              navbar_link.name
            }}</RouterLink>
          </li>
        </ul>
      </div>
      <div style="display:grid; flex: 1 1 0px; align-content: center;"><RouterLink style="justify-self: end; margin-right: 64px;" to="/admin" class="text-decoration-none text-white">Login
            </RouterLink></div>
    </div>
  </nav>
</template>

<style>
nav {
  width: 100%;
  height: fit-content;
}

#navbar-default {
  display: flex;
  padding: 10px;
  background-color: #39878b;
}

#navbar-default #navbar-elements {
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
}

#navbar-default #main-logo img {
  height: 36px;
  vertical-align: center;
  margin-left: 64px;
}
</style>
