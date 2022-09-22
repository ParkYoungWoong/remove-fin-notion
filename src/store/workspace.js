import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: [],
    workspace: {}
  }),
  actions: {
    async readWorkspaces() {
      this.workspaces = await request({
        method: 'GET'
      })
    },
    async readWorkspace(id) {
      this.workspace = await request({
        method: 'GET',
        id
      })
    },
    async createWorkspace(payload = {}) {
      const { parentId } = payload
      const workspace = await request({
        method: 'POST',
        body: {
          parentId,
          title: ''
        }
      })
      this.readWorkspaces()
      return workspace
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
