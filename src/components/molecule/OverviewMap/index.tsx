import { useEffect, useRef, useState } from 'react'

import { type mapOptions, type projectData } from '@/types/BUURTTYPES'

import { ProjectCard } from '../ProjectCard'

import styles from './styles.module.css'

interface MapProps {
  projectData: projectData[]
  mapData: mapOptions
}

export const OverviewMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) { initMarkers() }
  }, [map, mapData])

  const initMarkers = () => {
    projectData.forEach((project) => {
      const Marker = new google.maps.Marker({
        position: project.location.coordinates,
        title: 'new'
      })
      Marker.setMap(map)
    })
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {/* {BUURTMAP && <ProjectCard project={ActiveProject} />} */}
    </div>
  )
}
