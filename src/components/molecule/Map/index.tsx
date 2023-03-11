import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ThreejsOverlayView from '@ubilabs/threejs-overlay-view';
import * as THREE from 'three'

import styles from './styles.module.css'

interface MapProps {
  projectData: array
}

const mapOptions = {
  tilt: 50,
  heading: 0,
  zoom: 18,
  center: { lat: 51.02342, lng: 4.4841925 },
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  disableDefaultUI: true,
  keyboardShortcuts: false
}

const MapBlueprint = ({ projectData }: MapProps) => {
  console.log(projectData)
  const mapContainer = useRef<HTMLDivElement>(null)
  const overlay = useRef(null)
  const [map, setMap] = useState<Object>()
  const threeOverlay = new ThreejsOverlayView(mapOptions.center);
  const scene = threeOverlay.getScene()

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
    //create markers for each project
    projectData.forEach(el => {
      const loader = new GLTFLoader();
      createMarkers(loader, el);
    });
    threeOverlay.setMap(map);
  }

  threeOverlay.update = () => {
    const time = performance.now();
    threeOverlay.requestRedraw();
  };

  const createMarkers = (loader, el) => {
    loader.load("/models/marker.glb", (gltf) => {
      gltf.scene.projectId = el.id;
      gltf.scene.scale.set(20, 20, 20);
      gltf.scene.rotation.x = Math.PI / 2;
      const lat = el.coordinates.lat
      const lng = el.coordinates.lng
      threeOverlay.latLngAltToVector3({ lat, lng }, gltf.scene.position);
      scene.add(gltf.scene);
    });
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}></div>
  )
}

export default MapBlueprint
