export interface mapOptions {
  tilt: number,
  heading: number,
  zoom: number,
  center: {
    lat: number,
    lng: number,
    altitude: number
  },
  mapId: string | undefined,
  disableDefaultUI: boolean,
  keyboardShortcuts: boolean
}

export interface project {
  id: number,
  name: string,
  info: {
    description: string,

  },
  coordinates: {
    lat: number,
    lng: number,
    altitude: number
  }
}

export interface objectUploadData {

}