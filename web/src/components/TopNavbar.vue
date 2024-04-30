<script setup lang="ts"></script>

<template>
  <nav id="navbar-default">
    <div>
      <a href="/">
        <img id="main-logo" src="../assets/logo.svg" alt="Alertaqui Logo" />
      </a>
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">Sobre</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
/* Visualization purposes */
#navbar-default {
  padding: 15px;
  background-color: rgb(122, 122, 122);
}

#navbar-default div {
  display: inline;
}

#navbar-default ul {
  list-style: none;
  display: inline;
}

#navbar-default li {
  display: inline;
}

#navbar-default #main-logo {
  height: 32px;
}
</style>
