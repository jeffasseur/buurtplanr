import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { type mapOptions, type project } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import { ProjectCard } from '../ProjectCard'

import styles from './styles.module.css'

interface MapProps {
  projectData: project[]
  mapData: mapOptions
}

export const OverviewMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()
  const [ActiveProject, setActiveProject] = useState<project | undefined>(undefined)
  const mousePosition = new THREE.Vector2()
  const markers: THREE.Object3D[] = []
  let highlightedObject: THREE.Object3D<THREE.Event> | null = null

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
    }

    if (map) {
      appendMarkers()
      bindMapEvents()
    }
  }, [map])

  const bindMapEvents = () => {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current!.getBoundingClientRect()
      const x = e.domEvent.clientX - left
      const y = e.domEvent.clientY - top

      mousePosition.x = 2 * (x / width) - 1
      mousePosition.y = 1 - 2 * (y / height)
    }

    if (map && BUURTMAP) {
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        updateMousePosition(e)

        const intersections = BUURTMAP.threeOverlay.raycast(mousePosition)
        setActiveProject(undefined)

        if (highlightedObject) highlightedObject.material.color.setHex(0xff0000)

        if (intersections.length === 0) return

        highlightedObject = intersections[0].object
        setActiveProject(projectData.find(pr => pr.id === highlightedObject.parent.projectId))
        highlightedObject.material.color.setHex(0xffffff)

        BUURTMAP.threeOverlay.requestRedraw()
      })
    }
  }

  const appendMarkers = () => {
    // create markers for each project ++ append to three-js-overlayview
    projectData.forEach(el => {
      if (BUURTMAP) { BUURTMAP.appendModel(el) }
      getAllMarkers()
    })
  }

  // collect all marker in scene into an array
  const getAllMarkers = () => {
    if (BUURTMAP) {
      BUURTMAP.scene.children.find(el => {
        if ('projectId' in el) {
          const admit = markers.findIndex(markers => markers.projectId === el.projectId)
          if (admit === -1) markers.push(el)
        }
      })
    }
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {BUURTMAP && <ProjectCard project={ActiveProject} />}
    </div>
  )
}
