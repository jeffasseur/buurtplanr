import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DroppedModel {
  model: string | null
  updateModel: (model: string | null) => void
  productType: string | null
  updateProductType: (productType: string | null) => void
}

interface User {
  userID: string | null
  updateUID: (userID: string | null) => void
  projectID: string | null
  updatePID: (projectID: string | null) => void
}

export const useDroppedModel = create<DroppedModel>((set) => ({
  model: null,
  updateModel: (el) => { set(() => ({ model: el })) },
  productType: null,
  updateProductType: (el) => { set(() => ({ productType: el })) }
}))

export const useUser = create<User>((set) => ({
  userID: '1',
  updateUID: (el) => { set(() => ({ userID: el })) },
  projectID: null,
  updatePID: (el) => { set(() => ({ projectID: el })) }
}))

interface setup {
  budget: number | undefined
  informatie: string | undefined
  projectData: {
    type: string | undefined
    file: null | undefined
    link: string | undefined
  }
}

interface cocreation {
  location: {
    coordinates: {
      lat: number | undefined
      lng: number | undefined
    }
    postalcode: string | undefined
    city: string | undefined
    street: string | undefined
  }
  border: [{
    lat: number | undefined
    lng: number | undefined
  }]
}

interface newProjectForm {
  formStage: number
  updateFormStage: (params: number) => void
  setupProgress: setup
  setSetupProgress: (params: any) => void
  cocreationProgress: cocreation
  setCocreationProgress: (params: any) => void
  formData: object
  bindFormData: () => void
  resetProgress: () => void
}

export const useNewProjectForm = create<newProjectForm>()(
  persist(
    (set, get) => ({
      formStage: 0,
      updateFormStage: (params: number) => {
        set(() => ({
          formStage: params
        }))
      },

      setupProgress: {
        budget: 0,
        informatie: 'hnieuweraanlaeggabosl',
        projectData: {
          type: 'straat',
          file: null,
          link: 'https://arthuris.online'
        }
      },

      setSetupProgress: (params) => {
        set(() => ({
          setupProgress: params
        }))
      },

      cocreationProgress: {
        location: {
          coordinates: {
            lat: 5,
            lng: 0
          },
          postalcode: '2800',
          city: 'mechelen',
          street: 'vleeshalleSteenweg'
        },
        border: [
          { lat: 0, lng: 0 }
        ]
      },
      setCocreationProgress: (params) => {
        set(() => ({
          cocreationProgress: params
        }))
      },

      formData: {},
      bindFormData: () => {
        set((state) => ({
          formData: { ...state.setupProgress, ...state.cocreationProgress }
        }))
      },

      resetProgress: () => {
        set({
          setupProgress: {
            budget: 0,
            informatie: 'hnieuweraanlaeggabosl',
            projectData: {
              type: 'straat',
              file: null,
              link: 'https://arthuris.online'
            }
          },

          cocreationProgress: {
            location: {
              coordinates: {
                lat: 5,
                lng: 0
              },
              postalcode: '2800',
              city: 'mechelen',
              street: 'vleeshalleSteenweg'
            },
            border: [
              { lat: 0, lng: 0 }
            ]
          },

          formStage: 0,
          formData: undefined
        })
      }
    }),
    { name: 'newProjectData' }
  )
)
