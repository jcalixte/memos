<template>
  <div class="home">
    <router-link :to="{ name: 'memo-new' }">Nouveau</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
