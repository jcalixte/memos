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
        <p>
          <label for="date">Localisation</label>
          <EarthMap :define-location="true" @located="located" />
        </p>
        <div>
          <label for="pictures">Photo de couverture</label>
          <input id="pictures" type="file" @change="previewCoverPicture" />
          <div v-if="coverPicture">
            <img
              :src="coverPicture.objectUrl"
              :alt="coverPicture.file.name"
              class="cover-picture"
            />
          </div>
        </div>
        <div>
          <label for="pictures">Photos</label>
          <input id="pictures" type="file" multiple @change="previewPictures" />
          <section v-if="pictures.length" class="picture-container">
            <img
              v-for="(picture, k) in pictures"
              :key="k"
              :src="picture.objectUrl"
              :alt="picture.file.name"
              class="picture"
            />
          </section>
        </div>
      </div>
      <div class="content-container">
        <label for="content">Corps</label>
        <article
          id="content"
          name="content"
          class="content"
          ref="content"
        ></article>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Quill from 'quill'
import Markdown from 'markdownparser'

import { memoService } from '@/services/memo.service'
import { Location } from '@/models/Location'
import { toDateString } from '@/utils/date'

import EarthMap from '@/components/EarthMap.vue'

interface Picture {
  objectUrl: string
  file: File
}

@Component({
  components: {
    EarthMap
  }
})
export default class MemoNew extends Vue {
  private title = ''
  private content = ''
  private date: string = toDateString(new Date())
  private location: Location = { lng: 0, lat: 0 }
  private quill: Quill | null = null
  private coverPicture: Picture | null = null
  private pictures: Picture[] = []

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
    this.clearPictures(this.coverPicture, ...this.pictures)
  }

  private located(location: Location) {
    this.location = location
  }

  private previewCoverPicture(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files) {
      this.clearPictures(this.coverPicture)
      const file = target.files[0]
      this.coverPicture = {
        objectUrl: URL.createObjectURL(file),
        file
      }
    }
  }

  private previewPictures(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files) {
      this.clearPictures(...this.pictures)
      this.pictures = []
      for (const file of target.files) {
        this.pictures.push({
          objectUrl: URL.createObjectURL(file),
          file
        })
      }
    }
  }

  private clearPictures(...pictures: Array<Picture | null>) {
    pictures.forEach((picture) => {
      if (picture) {
        URL.revokeObjectURL(picture.objectUrl)
      }
    })
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

  .picture-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-height: 400px;
    overflow-y: auto;
  }

  .cover-picture,
  .picture {
    max-width: 200px;
    height: auto;
    margin: 5px;
  }
}
</style>
