import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '~/routes/index.js'
import loadImage from '~/plugins/loadImage'
import App from './App.vue'
import TheLoader from '~/components/TheLoader.vue'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(loadImage)
  .component('TheLoader', TheLoader)
  .mount('#app')
