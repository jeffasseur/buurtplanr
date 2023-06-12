import { type LatLngTypes } from '@googlemaps/three'
import { type Vector3 } from 'three'

export interface mapOptions {
  tilt: number
  heading: number
  zoom: number
  center: {
    lat: number
    lng: number
    altitude: number
  }
  mapId: string | undefined
  disableDefaultUI: boolean
  keyboardShortcuts: boolean
}

export interface project {
  data: {
    location: {
      coordinates: {
        lat: number
        lng: number
        altitude: number
      }
      postalcode: string
      city: string
      street: string
    }
    delete: {
      isDeleted: boolean
      whenDeleted: string
    }
    _id: string
    fase: string
    dateOfCreation: string
    title: string
    description: string
    dateOfStart: string
    dateOfEnd: string
    __v: number
  }
  id: number
  title: string
  info: {
    fase: string
    description: string
  }
  bounds: LatLngTypes[]
}

export interface projectData {
  location: {
    coordinates: {
      lat: number
      lng: number
      altitude: number
    }
    postalcode: string
    city: string
    street: string
  }
  delete: {
    isDeleted: boolean
    whenDeleted: string
  }
  projectData: {
    type: string
    file: string
    description: string
    link: string
  }
  _id: string
  fase: string
  dateOfCreation: string
  title: string
  description: string
  dateOfStart: string
  dateOfEnd: string
  __v: number
  border: object[]
}

export interface newProjectFormData {
  title: string
  description: string
  dateOfPublication: string
  dateOfStartCocreation: string
  dateOfEndCocreation: string
  dateOfStartVote: string
  dateOfEndVote: string
  budget: number
  informatie: string
  document: object
  location: {
    coordinates: {
      lat: number
      lng: number
    }
    postalcode: string
    city: string
    street: string
  }
  border: object
  projectData: {
    type: string
    file: null
    description: string
    link: string
  }

}

export interface productUploadData {
  latlng: LatLngTypes | Vector3
  modelName: string
}

export interface productName {
  name: string
  productType: string | null
}

export interface buurtmarker extends google.maps.MarkerOptions {
  project_id: string
}

export interface ProductMesh extends THREE.Mesh {
  modelID?: number
  isDraggable?: boolean
  modelName?: string
  isHighlighter?: boolean
  bndNumber?: number
}

export interface ProductModel extends THREE.Object3D {
  modelName?: string
  modelID?: number
  isDraggable?: boolean
  isHighlighter?: boolean
  bndNumber?: number
}

export interface ProductGroup extends THREE.Group {
  projectId?: number
  modelID?: number
  modelType?: string
  isDraggable?: boolean
  modelName?: string
  bndNumber?: number
}
