<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import './styles/index';
</style>
