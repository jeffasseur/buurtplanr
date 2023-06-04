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

export const useNewProjectForm = create(
  persist(
    (set, get) => ({
      formStage: 0,
      updateFormStage: (params) => {
        set((state) => ({
          formStage: params
        }))
      },

      setupInit: {
        // title: '',
        // description: '',
        // dateOfPublication: '',
        // dateOfStartCocreation: '',
        // dateOfEndCocreation: '',
        // dateOfStartVote: '',
        // dateOfEndVote: '',
        budget: 0,
        informatie: 'hnieuweraanlaeggabosl',
        // document: '',
        projectData: {
          type: 'straat',
          file: null,
          // description: '',
          link: 'https://arthuris.online'
        }
      },

      setupProgress: {},
      setSetupProgress: (params) => {
        set((state) => ({
          setupProgress: params
        }))
      },

      cocreationInit: {
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

      cocreationProgress: {},
      setCocreationProgress: (params) => {
        set((state) => ({
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
        set((state) => ({
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
          formData: null
        }))
      }
    }),
    { name: 'newProjectData' }
  )
)
