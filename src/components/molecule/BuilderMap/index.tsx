import { type LatLngTypes } from '@googlemaps/three'
import { useEffect, useRef, useState } from 'react'
import { type Vector2, type Object3D, type Vector3 } from 'three'

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
  const mouseCapture = useRef<Vector3>()
  const [map, setMap] = useState<google.maps.Map>()
  const [PID, setPID] = useState<number | null>(null)
  const [draggable, setDraggable] = useState<Object3D | null>(null)
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()
  const modelName = useDroppedModel(state => state.model)
  const updateModel = useDroppedModel(state => state.updateModel)
  const productType = useDroppedModel(state => state.productType)
  const updateProductType = useDroppedModel(state => state.updateProductType)
  let mousePosition: Vector3
  let rayMouse: Vector2

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
    const updateRayMouse = (e) => {
      // calculation to get raycaster right
      const { left, top, width, height } = mapContainer.current.getBoundingClientRect()
      const x = e.domEvent.clientX - left
      const y = e.domEvent.clientY - top

      rayMouse = { x: 2 * (x / width) - 1, y: 1 - 2 * (y / height) }
    }

    const updateMouse = (e: google.maps.MapMouseEvent, updateType: string) => {
      // calculation to get location right
      const latlng: LatLngTypes = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
      mousePosition = BUURTMAP.threeOverlay.latLngAltitudeToVector3(latlng)
      BUURTMAP.mousePosition = mousePosition

      // change mouse position for placing products on click position
      if (updateType === 'click') { mouseCapture.current = mousePosition }
    }

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      updateRayMouse(e)
      updateMouse(e, 'click')

      // see if user is placing a ground type product on map
      if (BUURTMAP.initgndPos) {
        BUURTMAP.placeGround(mouseCapture.current)
        return
      }

      // raycast fn
      const intersections = BUURTMAP.threeOverlay.raycast(rayMouse)

      // place obj on map after repositioning product
      BUURTMAP.dragOBJ = null

      // reset if no intersections found
      if (intersections.length === 0) {
        setPID(null)
        setDraggable(null)
        return
      }

      let current: THREE.Object3D = intersections[0].object

      // cycle oject upwards until top-level found
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
      updateMouse(e, 'move')
    })
  }

  const clicker = () => {
    // check for type of product placement || ground types need multiple markers while others just 1
    if (modelName !== null && productType !== null && BUURTMAP) {
      switch (productType) {
        case 'ground':
          BUURTMAP.gnd = modelName
          BUURTMAP.placeGround(mouseCapture.current)
          updateModel(null)
          updateProductType(null)
          break
        default:
          BUURTMAP.appendProducts(modelName, mouseCapture.current)
          updateModel(null)
          updateProductType(null)
          break
      }
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
