import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: []
  }),
  actions: {
    readWorkspaces() {
      request({
        method: 'GET'
      })
    }
  }
})

async function request(options) {
  const { id = '', method, body } = options

  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FinTech202207',
      'username': 'ParkYoungWoong'
    },
    method,
    data: body
  })
  console.log(data)
  return data
}
