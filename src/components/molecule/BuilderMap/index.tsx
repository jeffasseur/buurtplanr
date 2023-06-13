import { type LatLngTypes } from '@googlemaps/three'
import { useEffect, useRef, useState } from 'react'
import { type Vector2, type Object3D, type Vector3 } from 'three'
import * as THREE from 'three'

import Toolbar from '@/components/molecule/Toolbar'
import { useDroppedModel } from '@/components/zustand/buurtplanrContext'
import { type productUploadData, type ProductModel, type mapOptions, type projectData } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'
import Thermometer from '@components/atoms/Thermometer'
import WebpIcon from '@components/atoms/webpIcons'
import { Editor } from '@components/molecule/Editor'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
  projectData: projectData
  creationData?: productUploadData[]
}

export const BuilderMapBlueprint = ({ projectData, mapData, creationData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const previewProduct = useRef<HTMLDivElement>(null)
  const mouseCapture = useRef<Vector3>()
  const [map, setMap] = useState<google.maps.Map>()
  const [PID, setPID] = useState<number | undefined>(undefined)

  // change productweightchanges budget color && fill
  const [productWeight, setProductWeight] = useState<number>(0)
  const [draggable, setDraggable] = useState<Object3D | null>(null)
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()
  const modelName = useDroppedModel(state => state.model)
  const updateModel = useDroppedModel(state => state.updateModel)
  const productType = useDroppedModel(state => state.productType)
  const updateProductType = useDroppedModel(state => state.updateProductType)
  let mousePosition: Vector3
  const rayMouse: Vector2 = new THREE.Vector2()

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = projectData.location.coordinates
      mapData.tilt = 65
      let mapInstance: google.maps.Map
      if (mapContainer.current) {
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
        setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
      }
    }
    if (BUURTMAP?.scene) {
      BUURTMAP.boundLats = projectData.border
      BUURTMAP.joinBounds()
      creationData?.forEach(el => {
        BUURTMAP.appendProducts(el.modelName, el.latlng)
      })
      if (creationData) setProductWeight(creationData.length * 10)
    }
  }, [BUURTMAP, creationData, map, mapData, projectData.border, projectData.location.coordinates])

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
      BUURTMAP.updateHighlight(false, false)

      // reset if no intersections found
      if (intersections.length === 0) {
        BUURTMAP.updateHighlight(false, false)
        setPID(undefined)
        setDraggable(null)
        return
      }

      let current: ProductModel = intersections[0].object

      // if this item is a highlighter return
      if (current.hasOwnProperty.call('isHighlighter')) return

      // cycle oject upwards until top-level found
      while (current?.parent?.parent !== null && current.parent) {
        current = current.parent
        setDraggable(null)
      }

      if (current.isDraggable) {
        // has clicked on an active obj
        if (PID != null || draggable === current) {
          setPID(undefined)
          setDraggable(null)
        } else {
          BUURTMAP.dragOBJ = current
          BUURTMAP.updateHighlight(true, false)
          setPID(current.modelID)
          setDraggable(current)
        }
      }
      BUURTMAP.threeOverlay.requestRedraw()
    })

    map.addListener('mousemove', (e) => {
      updateMouse(e, 'move')
      const clientX: number = e.domEvent.clientX
      const clientY: number = e.domEvent.clientY

      const x: string = String(clientX + 10)
      const y: string = String(clientY + 10)

      BUURTMAP.updateHighlight(true, true)
      if (previewProduct.current) {
        previewProduct.current.style.display = 'flex'
        previewProduct.current.style.left = `${x}px`
        previewProduct.current.style.top = `${y}px`
      }
    })
  }

  const clicker = () => {
    // check for type of product placement || ground types need multiple markers while others just 1
    if (modelName !== null && productType !== null && BUURTMAP && mouseCapture.current) {
      switch (productType) {
        case 'ground':
          BUURTMAP.gnd = modelName
          BUURTMAP.placeGround(mouseCapture.current)
          updateModel(null)
          updateProductType(null)
          setProductWeight(productWeight + 10)
          break
        default:
          BUURTMAP.appendProducts(modelName, mouseCapture.current)
          updateModel(null)
          updateProductType(null)
          setProductWeight(productWeight + 10)
          break
      }
    }
  }

  return (
    <div className={styles.container}>
      {modelName &&
        <div ref={previewProduct} className={styles.productPreviewContainer}>
          <WebpIcon name={modelName} />
        </div>}
      <div ref={mapContainer} onClick={clicker} id='map' className={styles.map}>
        {map && <Thermometer productWeight={productWeight} />}
        {map && BUURTMAP && <Editor setPID={setPID} activePID={PID} BUURTMAP={BUURTMAP} targetObject={draggable} creationData={creationData} productWeight={productWeight} setProductWeight={setProductWeight} />}
      </div>
      <div className={styles.navcontainer}>
        {map && <Toolbar productWeight={productWeight} />}
      </div>
    </div>
  )
}
