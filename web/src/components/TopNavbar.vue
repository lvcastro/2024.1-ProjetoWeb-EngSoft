<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <div id="navbar-default">
      <RouterLink id="main-logo" to="/"
        ><img src="../assets/logoTemp.png" alt="Alertaqui Logo"
      /></RouterLink>
      <div id="navbar-elements">
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">Sobre</RouterLink>
          </li>
          <li>
            <RouterLink to="/map">Mapa</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
#navbar-default {
  display: flex;
  padding: 15px;
  background-color: #39878b;
}

#navbar-default #navbar-elements {
  flex-grow: 1;
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
  flex-grow: 0;
  margin-left: 32px;
  height: 48px;
}

#navbar-default #main-logo img {
  height: inherit;
  vertical-align: center;
}
</style>
