import { useEffect, useRef, useState } from 'react'

import mapPin from '@/assets/icons/map-pin.svg'
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
  const [ActiveProject, setActiveProject] = useState<projectData | undefined>(undefined)

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
        title: project._id
      })
      Marker.addListener('click', (e) => {
        setActiveProject(projectData.find(pr => pr._id === e.domEvent.target.title))
      })
      Marker.setMap(map)
    })
  }

  console.log(ActiveProject)

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      <ProjectCard project={ActiveProject} />
    </div>
  )
}
