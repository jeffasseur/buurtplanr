import { type LatLngTypes } from '@googlemaps/three'
import { useEffect, useRef, useState } from 'react'
import { type Object3D, type Vector3 } from 'three'

import Toolbar from '@/components/molecule/Toolbar'
import { useDroppedModel } from '@/components/zustand/buurtplanrContext'
import { type mapOptions, type project } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'
import { Editor } from '@components/molecule/Editor'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
  projectData: project
}

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [PID, setPID] = useState<number | null>(null)
  const [draggable, setDraggable] = useState<Object3D | null>(null)
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()
  const modelName = useDroppedModel(state => state.model)
  const updateModel = useDroppedModel(state => state.updateModel)
  let mousePosition: Vector3

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = projectData.location.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
    }
  }, [map, mapData, projectData.location.coordinates])

  if (map && BUURTMAP) {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current.getBoundingClientRect()
      const x = e.domEvent.clientX - left
      const y = e.domEvent.clientY - top

      mousePosition.x = 2 * (x / width) - 1
      mousePosition.y = 1 - 2 * (y / height)
    }

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      updateMousePosition(e)
      const intersections = BUURTMAP.threeOverlay.raycast(mousePosition)

      BUURTMAP.dragOBJ = null
      BUURTMAP.mousePosition = mousePosition
      if (intersections.length === 0) return

      let current: THREE.Object3D = intersections[0].object

      while (current?.parent?.parent !== null) {
        current = current.parent
        setDraggable(null)
      }

      if (current.isDraggable) {
        // has clicked on an active obj
        if (PID != null || draggable === current) {
          setPID(null)
          setDraggable(null)
        } else {
          BUURTMAP.dragOBJ = current
          setPID(current.modelID)
          setDraggable(current)
        }
      }
      BUURTMAP.threeOverlay.requestRedraw()
    })

    map.addListener('mousemove', (e: google.maps.MapMouseEvent) => {
      const latlng: LatLngTypes = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
      mousePosition = BUURTMAP.threeOverlay.latLngAltitudeToVector3(latlng)
      BUURTMAP.mousePosition = mousePosition
    })
  }

  const clicker = () => {
    if (modelName !== null) {
      BUURTMAP.appendProducts(modelName)
      updateModel(null)
    }
  }

  return (
    <div className={styles.container}>
      <div ref={mapContainer} onClick={clicker} id='map' className={styles.map}>
        {map && BUURTMAP && <Editor setPID={setPID} activePID={PID} BUURTMAP={BUURTMAP} targetObject={draggable} />}
      </div>
      <div className={styles.navcontainer}>
        {map && <Toolbar />}
      </div>
    </div>
  )
}
