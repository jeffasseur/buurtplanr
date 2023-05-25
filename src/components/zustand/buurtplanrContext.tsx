import { create } from 'zustand'

interface DroppedModel {
  model: string | null
  updateModel: (model: string | null) => void
}

interface User {
  userID: string | null
  updateUID: (userID: string | null) => void
  projectID: string | null
  updatePID: (projectID: string | null) => void
}

export const useDroppedModel = create<DroppedModel>((set) => ({
  model: null,
  updateModel: (el) => { set(() => ({ model: el })) }
}))

export const useUser = create<User>((set) => ({
  userID: '1',
  updateUID: (el) => { set(() => ({ userID: el })) },
  projectID: null,
  updatePID: (el) => { set(() => ({ projectID: el })) }
}))
