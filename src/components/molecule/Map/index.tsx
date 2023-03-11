import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import styles from './styles.module.css'

const mapOptions = {
  tilt: 50,
  heading: 0,
  zoom: 20,
  center: { lat: 51.02342, lng: 4.4841925 },
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

      // clickevent retrieving data like latlng on user click
      // mapInstance.addListener("click", (e) => {
      //   console.log(e)
      // })

      setMap(mapInstance)
      overlay.current = createOverlay(mapInstance)
    }
  }, [])

  const createOverlay = (map) => {
    const glOverlay = new google.maps.WebGLOverlayView()
    let renderer, camera, scene, loader;

    glOverlay.onAdd = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera();
      const light = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(light);
    }

    glOverlay.onContextRestored = ({ gl }) => {
      renderer = new THREE.WebGL1Renderer({
        canvas: gl.canvas,
        context: gl,
        ...gl.getContextAttributes()
      });

      renderer.autoClear = false;
      renderer.autoClearDepth = false;
    }

    glOverlay.onDraw = ({ transformer }) => {
      const matrix = transformer.fromLatLngAltitude({
        lat: mapOptions.center.lat,
        lng: mapOptions.center.lng,
        altitude: 0
      })
    }
    glOverlay.setMap(map)
    return glOverlay
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}></div>
  )
}

export default MapBlueprint
