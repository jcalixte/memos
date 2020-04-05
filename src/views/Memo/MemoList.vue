<template>
  <div class="memo-list">
    <h1>List</h1>
    <ul>
      <li v-for="memo in memos" :key="memo._id">
        <router-link :to="{ name: 'memo-view', params: { id: memo._id } }">{{
          memo.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MemoModel } from '../../models/Memo'
import { memoService } from '../../services/memo.service'

@Component
export default class MemoList extends Vue {
  private memos: MemoModel[] = []

  private async mounted() {
    this.memos = await memoService.getAll()
  }
}
</script>

<style scoped lang="scss">
.memo-list {
}
</style>
