import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { MapSetup } from '@/components/atoms/MapSetup'
import { type mapOptions, type ProductModel } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
}

export const NewProjectMapBlueprint = ({ mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()
  const rayMouse: THREE.Vector2 = new THREE.Vector2()

  useEffect(() => {
    if (!map) {
      let mapInstance: google.maps.Map
      if (mapContainer.current) {
        mapData.tilt = 65
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
        setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
      }
    }
  }, [map, mapData])

  if (map && BUURTMAP) {
    const updateRayMouse = (e) => {
      // calculation to get raycaster right
      const bounding = mapContainer.current?.getBoundingClientRect()
      if (bounding) {
        const x = e.domEvent.clientX - bounding.left
        const y = e.domEvent.clientY - bounding.top

        rayMouse.x = 2 * (x / bounding.width) - 1
        rayMouse.y = 1 - 2 * (y / bounding.height)
      }
    }

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      updateRayMouse(e)

      const intersections = BUURTMAP.threeOverlay.raycast(rayMouse)
      if (intersections.length === 0) {
        return
      }

      const current: ProductModel = intersections[0].object

      // if selected is a bound mesh then don't drag
      if (current.parent?.type === 'Group') return

      // has clicked on an active obj
      if (BUURTMAP.dragOBJ === current) {
        BUURTMAP.dragOBJ = null
      } else {
        BUURTMAP.dragOBJ = current
      }

      // retrieve latlng of markers and store them in a const for later use in formdata
      if (BUURTMAP.boundLats.length <= 0) {
        BUURTMAP.boundLats.push({ lat: e.latLng?.lat(), lng: e.latLng?.lng() })
      } else if (current.bndNumber) {
        BUURTMAP.boundLats[current.bndNumber] = { lat: e.latLng?.lat(), lng: e.latLng?.lng() }
        BUURTMAP.joinBounds()
      }

      BUURTMAP.threeOverlay.requestRedraw()
    })

    map.addListener('mousemove', (e: google.maps.MapMouseEvent) => {
      const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
      latlng.z = 1
      BUURTMAP.mousePosition = BUURTMAP.threeOverlay.latLngAltitudeToVector3(latlng)
      BUURTMAP.updateProductPosition()
    })
  }

  return (
    <div className={styles.container}>
      <div ref={mapContainer} id='map' className={styles.map}>
        {BUURTMAP && <MapSetup BUURTMAP={BUURTMAP} map={map} />}
      </div>
    </div>
  )
}
