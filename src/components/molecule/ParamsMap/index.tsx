import { ThreeJSOverlayView } from '@googlemaps/three'
import { useEffect, useRef, useState } from 'react'

import { MapSetup } from '@/components/atoms/MapSetup'
import { type mapOptions, type project } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

import type * as THREE from 'three'

interface MapProps {
  mapData: mapOptions
  projectData: project
}

let mousePosition: THREE.Vector2

export const ParamsMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [draggable, setDraggable] = useState<THREE.Object3D | null>(null)
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()

  useEffect(() => {
    if (!map) {
      mapData.center = projectData.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
  }, [map])

  if (map && BUURTMAP) {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current!.getBoundingClientRect()
      const x = e.domEvent.clientX - left
      const y = e.domEvent.clientY - top

      mousePosition.x = 2 * (x / width) - 1
      mousePosition.y = 1 - 2 * (y / height)
    }

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      updateMousePosition(e)

      const intersections = BUURTMAP.threeOverlay.raycast(mousePosition)
      if (intersections.length === 0) return

      const current = intersections[0].object

      // has clicked on an active obj
      if (BUURTMAP.dragOBJ == current) {
        BUURTMAP.dragOBJ = null
      } else {
        BUURTMAP.dragOBJ = current
      }
      BUURTMAP.threeOverlay.requestRedraw()
    })

    map.addListener('mousemove', (e: google.maps.MapMouseEvent) => {
      const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
      latlng.z = 1
      mousePosition = { ...latlng }

      BUURTMAP.updateMousePosition(latlng)
      BUURTMAP.updateProductPosition()
    })
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {BUURTMAP && <MapSetup BUURTMAP={BUURTMAP} />}
    </div>
  )
}
