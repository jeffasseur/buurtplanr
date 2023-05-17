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
  id: number
  name: string
  info: {
    description: string
  }
  coordinates: {
    lat: number
    lng: number
    altitude: number
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
