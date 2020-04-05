<template>
  <div class="memo-view" v-if="memo">
    <h1>{{ memo.title }}</h1>
    <EarthMap :locations="locations" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { MemoModel } from '@/models/Memo'
import { memoService } from '@/services/memo.service'
import EarthMap from '@/components/EarthMap.vue'

@Component({
  components: {
    EarthMap
  }
})
export default class MemoView extends Vue {
  @Prop({ type: String, required: true })
  private id!: string
  private memo: MemoModel | null = null

  private async mounted() {
    this.memo = await memoService.get(this.id)
  }

  private get locations() {
    if (!this.memo) {
      return []
    }
    return this.memo.pictures
      .map((picture) => picture.location)
      .filter((location) => !!location)
  }
}
</script>

<style scoped lang="scss">
.memo-view {
}
</style>
