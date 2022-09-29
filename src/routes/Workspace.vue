<template>
  <section>
    <div class="inner">
      <TheLoader 
        :loading="loading"
        :size="30"
        :width="4"
        class="loader" />
      <div
        class="poster"
        @click="triggerInput">
        <img
          :src="workspaceStore.workspace.poster"
          alt="POSTER" />
        <input
          ref="input"
          type="file"
          @change="selectPoster" />
      </div>
      <h1
        ref="title"
        class="title"
        placeholder="제목 없음"
        contenteditable
        @blur="onInput('title')">
        {{ workspaceStore.workspace.title }}
      </h1>
      <p
        ref="content"
        class="content"
        contenteditable
        @blur="onInput('content')"
        v-html="workspaceStore.workspace.content"></p>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  },  
  watch: {
    async $route() {
      this.loading = true
      await this.workspaceStore.readWorkspace(this.$route.params.id)  
      this.loading = false
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.workspaceStore.readWorkspace(this.$route.params.id)
      console.log(this.workspaceStore.workspace)
      this.loading = false
    },
    triggerInput() {
      this.$refs.input.dispatchEvent(new MouseEvent('click'))
    },
    async onInput(type) {
      const titleEl = this.$refs.title
      const contentEl = this.$refs.content
      const title = titleEl.textContent // .innerText || .innerHTML
      const content = contentEl.innerHTML

      // console.log(title, content)

      if (!title.trim()) {
        titleEl.innerHTML = ''
      }
      if (!contentEl.textContent.trim()) {
        contentEl.innerHTML = ''
      }
      if (type === 'title' && title === this.workspaceStore.workspace.title) return
      if (type === 'content' && content === this.workspaceStore.workspace.content) return

      await this.workspaceStore.updateWorkspace({
        id: this.$route.params.id,
        title,
        content
      })
      this.workspaceStore.findWorkspacePath(this.$route.params.id)
    },
    selectPoster(event) {
      const files = event.target.files

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        this.loading = true
        reader.addEventListener('load', async e => {
          // console.log(e.target.result)
          this.workspaceStore.updateWorkspace({
            id: this.$route.params.id,
            poster: e.target.result // base64
          })

          if (typeof this.workspaceStore.workspace.poster === 'string') {
            await this.$loadImage(this.workspaceStore.workspace.poster)
          }
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
section {
  padding: 100px 0 150px;
  .inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    .loader {
      position: absolute;
      top: -50px;
    }
    .poster {
      min-height: 30px;
      max-height: 300px;
      margin-bottom: 30px;
      border-radius: 8px;
      background-color: $color-background;
      background-size: cover;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      position: relative;
      &:hover {
        background-color: $color-background--hover1;
      }
      img {
        width: 100%;
      }
      input[type="file"] {
        display: none;
      }
      .delete-poster {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        opacity: .3;
        transition: .2s;
        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }
    [contenteditable] {
      outline: none;
      cursor: text;
      position: relative;
      &.title {
        font-size: 42px;
        line-height: 1.3;
        font-weight: 700;
        margin-bottom: 20px;
      }
      &.content {
        font-size: 16px;
        line-height: 1.8;
      }
      // placeholder
      &:empty::before {
        content: attr(placeholder);
        color: rgba($color-font, .3);
      }
      // focus & hover effect
      &::after {
        content: "";
        width: 4px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -20px;   
      }
      &:hover::after {
        background-color: $color-border;
      }
      &:focus::after {
        background-color: $color-highlight;
      }
    }
  }
}
</style>
  
