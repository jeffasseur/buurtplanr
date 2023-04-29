import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView } from "@googlemaps/three";

import styles from './styles.module.css';
import { mapOptions, project } from '@/types/BUURTTYPES';

interface MapProps {
  mapData: mapOptions;
}

export const ParamsMapBlueprint = ({ mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [ActiveProject, setActiveProject] = useState<project | undefined>(undefined),
    threeOverlay = new ThreeJSOverlayView(),
    mousePosition = new THREE.Vector3();

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) {
      createOverlay()
    }
  }, [map])

  //create 3d overlay
  const createOverlay = () => {
    threeOverlay.setMap(map);
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}></div>
  )
}