import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(), // HTML5 mode
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes: [
     {
      path: '/workspaces/:id',
      component: () => import('~/routes/Workspace.vue')
     }
  ]
})
