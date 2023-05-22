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
  status: string
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
  dateOfCreation: string
  info: {
    fase: string
    description: string
  }
  bounds: LatLngTypes[]
}

export interface productUploadData {
  latlng: LatLngTypes | Vector3
  modelType: string
}

export interface product extends THREE.Group {
  projectId?: number
  modelID?: number
  modelType?: string
  isDraggable?: boolean
}
