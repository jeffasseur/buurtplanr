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
  _id: string
  fase: string
  dateOfCreation: string
  title: string
  description: string
  dateOfStart: string
  dateOfEnd: string
  __v: number
}

export interface productUploadData {
  latlng: LatLngTypes | Vector3
  modelType: string
}
