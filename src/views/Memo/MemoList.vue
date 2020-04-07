<template>
  <div class="memo-list">
    <h1>List</h1>
    <table>
      <tr v-for="memo in memos" :key="memo._id">
        <td>
          <router-link :to="{ name: 'memo-view', params: { id: memo._id } }">{{
            memo.title
          }}</router-link>
        </td>
        <td>
          <a href="#" @click.prevent="remove(memo._id || '')" class="">
            <i class="gg-close-r"></i>
          </a>
        </td>
      </tr>
    </table>
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

  private async remove(id: string) {
    await memoService.remove(id)
    this.memos = await memoService.getAll()
  }
}
</script>

<style scoped lang="scss">
.memo-list {
  table {
    width: 100%;
  }
}
</style>
