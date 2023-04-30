import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView } from "@googlemaps/three";

import styles from './styles.module.css';
import { mapOptions, project } from '@/types/BUURTTYPES';
import { BuurtMap } from '@/utils/BuurtMap';
import { MapSetup } from '@/components/atoms/MapSetup';

interface MapProps {
  mapData: mapOptions;
  projectData: project;
}

let mousePosition: THREE.Vector2;

export const ParamsMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [draggable, setDraggable] = useState<THREE.Object3D | null>(null),
    [BUURTMAP, setBUURTMAP] = useState<BuurtMap>();

  useEffect(() => {
    if (!map) {
      mapData.center = projectData.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
  }, [map])

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {BUURTMAP && <MapSetup BUURTMAP={BUURTMAP} />}
    </div>
  )
}