import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import styles from './styles.module.css'

const mapOptions = {
  tilt: 50,
  heading: 0,
  zoom: 20,
  center: { lat: 50.8476, lng: 4.3572 },
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  disableDefaultUI: true,
  keyboardShortcuts: false
}

const MapBlueprint = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const overlay = useRef(null)
  const [map, setMap] = useState<Object>()

  useEffect(() => {
    if (!overlay.current) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapOptions)
      setMap(mapInstance)
      overlay.current = createOverlay(mapInstance)
    }
  }, [])

  const createOverlay = (map) => {
    const overlay = new google.maps.WebGLOverlayView()
    let renderer, camera, scene, loader

    return overlay
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>

    </div>
  )
}

export default MapBlueprint
