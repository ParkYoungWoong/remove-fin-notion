<template>
  <section>
    <div class="inner">
      <div class="poster">
        <img
          :src="workspaceStore.workspace.poster"
          alt="POSTER" />
        <input
          type="file"
          @change="selectPoster" />
      </div>
      <h1
        class="title"
        contenteditable></h1>
      <p
        class="content"
        contenteditable></p>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore)
  },  
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.workspaceStore.readWorkspace(this.$route.params.id)
      console.log(this.workspaceStore.workspace)
    },
    selectPoster() {

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
  
