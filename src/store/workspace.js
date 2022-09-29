import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: [],
    workspace: {},
    currentWorkspacePath: []
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
    },
    async updateWorkspace(payload) {
      const { id, poster, title, content } = payload
      const updatedWorkspace = await request({
        id,
        method: 'PUT',
        body: {
          title, 
          content,
          poster
        }
      })
      this.workspace = updatedWorkspace
      if (title) {
        await this.readWorkspaces
      }
    },
    findWorkspacePath(currentWorkspaceId) {
      const find = (workspace, parents) => {
        if (currentWorkspaceId === workspace.id) {
          this.currentWorkspacePath = [...parents, workspace]
        }
        if (workspace.children) {
          workspace.children.forEach(ws => {
            find(ws, [...parents, workspace])
          })
        }
      }
      this.workspaces.forEach(workspace => {
        find(workspace, [])
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
