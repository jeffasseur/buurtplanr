import { type LatLngTypes } from '@googlemaps/three'
import { useEffect, useRef, useState } from 'react'
import { type Vec2, type Object3D, type Vector3 } from 'three'

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
  const [targetArea, setTargetArea] = useState<Vec2>()
  const modelType = useDroppedModel(state => state.model)
  let mousePosition: Vector3

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = projectData.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
  }, [map, mapData, projectData.coordinates])

  if (map && BUURTMAP) {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current.getBoundingClientRect()
      const x = e.domEvent.clientX - left
      const y = e.domEvent.clientY - top

      setTargetArea({ x, y })

      mousePosition.x = 2 * (x / width) - 1
      mousePosition.y = 1 - 2 * (y / height)
    }

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      updateMousePosition(e)

      BUURTMAP.dragOBJ = null
      const intersections = BUURTMAP.threeOverlay.raycast(mousePosition)
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

  const initProduct = async () => {
    if (BUURTMAP && modelType) {
      BUURTMAP.mousePosition = mousePosition
      BUURTMAP.appendProducts(modelType)
    }
  }

  const onDrop = (e) => {
    initProduct().catch((err) => { console.log(err) })
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map} onDragOver={onDragOver} onDrop={onDrop}>
      {map && BUURTMAP && PID && draggable && <Editor setPID={setPID} activePID={PID} BUURTMAP={BUURTMAP} targetObject={draggable} targetArea={targetArea} />}
      {map && <Toolbar />}
    </div>
  )
}
