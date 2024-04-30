<script setup lang="ts"></script>

<template>
  <nav>
    <div id="navbar-default">
      <a href="/" id="main-logo">
        <img src="../assets/logo.svg" alt="Alertaqui Logo" />
      </a>
      <div id="navbar-elements">
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
#navbar-default {
  display: flex;
  padding: 15px;
  background-color: rgb(122, 122, 122);
}

#navbar-default #navbar-elements {
  flex-grow: 1;
}

#navbar-default ul {
  display: flex;
  height: 100%;
  padding-right: 100px;

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
  height: 32px;
}
</style>
