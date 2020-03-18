<template>
  <div class="memo-new">
    memo new form
    <form @submit.prevent="submit">
      <div class="main">
        <p>
          <label for="title">Titre</label>
          <input id="title" name="title" type="text" />
        </p>
        <p>
          <label for="date">Date</label>
          <input id="date" name="date" type="date" v-model="date" />
        </p>
      </div>
      <div class="content-container">
        <label for="content">Corps</label>
        <div id="content" name="content" class="content" ref="content"></div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { memoService } from '@/services/memo.service'
import { Location } from '@/models/Location'
import { toDateString } from '@/utils/date'
import Quill from 'quill'
import Markdown from 'markdownparser'

@Component
export default class MemoNew extends Vue {
  private title = ''
  private content = ''
  private date: string = toDateString(new Date())
  private location: Location = { lng: 0, lat: 0 }
  private quill: Quill | null = null

  private mounted() {
    this.quill = new Quill('#content', {
      modules: {
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline']]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    })
    this.quill.on('text-change', this.updateContent)
  }

  private beforeDestroy() {
    if (!this.quill) {
      return
    }
    this.quill.off('text-change', this.updateContent)
  }

  private async submit() {
    await memoService.save({
      title: this.title,
      content: this.content,
      date: new Date(this.date),
      location: this.location
    })
  }

  private updateContent() {
    if (!this.$refs.content) {
      return
    }
    const element = [...(this.$refs.content as Element).children].shift()
    let html = element ? element.innerHTML : ''
    if (html === '<p><br></p>') {
      html = ''
    }
    this.content = Markdown.parse(html)
  }
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  & > div {
    margin: 0 10px;
  }

  .main {
    flex: 1;
  }

  .content-container {
    min-width: 350px;
    flex: 1;
  }
}
</style>
