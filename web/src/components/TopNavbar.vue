<script setup lang="ts"></script>

<template>
  <nav>
    <div id="navbar-default">
      <a href="/" id="main-logo">
        <img src="../assets/logoTemp.png" alt="Alertaqui Logo" />
      </a>
      <div id="navbar-elements">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">Sobre</a>
          </li>
          <li>
            <a href="/map">Mapa</a>
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
  padding-right: 128px;

  align-items: center;
  justify-content: end;
}

#navbar-default li {
  display: inline;
  text-align: center;

  margin-left: 10px;
  margin-right: 10px;
}

#navbar-default #main-logo {
  flex-grow: 0;
}

#navbar-default #main-logo img {
  margin-left: 32px;
  height: 48px;
}
</style>
