<template> 
  <main>
    <LNB />
    <div class="workspace">
      <TheHeader />
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
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    LNB,
    TheHeader
  },  
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  async created() {
    await this.workspaceStore.readWorkspaces()
    this.workspaceStore.findWorkspacePath(this.$route.params.id)
  }
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  height: 100vh;
  .workspace {
    flex-grow: 1;
  }
}
</style>
