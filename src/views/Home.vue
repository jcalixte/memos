<template>
  <div class="home">
    <router-link :to="{ name: 'memo-new' }">Nouveau</router-link> |
    <router-link :to="{ name: 'memo-list' }">List</router-link>
  </div>
</template>

<script>
import { memoService } from '../services/memo.service'
export default {
  name: 'Home',
  async mounted() {
    const memos = await memoService.getAll()
    console.log(memos)
  }
}
</script>
