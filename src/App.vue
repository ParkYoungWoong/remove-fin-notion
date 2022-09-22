<template> 
  <main>
    <LNB />
    <div class="workspace">
      <header></header>
      <div class="workspace__contents">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import LNB from '~/components/LNB.vue'

export default {
  components: {
    LNB
  },  
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  created() {
    this.workspaceStore.readWorkspaces()
  }
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  height: 100vh;
  .workspace {
    flex-grow: 1;
    border: 10px solid red;
  }
}
</style>
