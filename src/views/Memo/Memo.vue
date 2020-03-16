<template>
  <section class="memo">
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Memo extends Vue {}
</script>

<style scoped lang="scss"></style>
