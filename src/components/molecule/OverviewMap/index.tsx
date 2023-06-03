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
  const [ActiveProject, setActiveProject] = useState<projectData | undefined>(undefined)

  useEffect(() => {
    if (!map) {
      let mapInstance: google.maps.Map
      if (mapContainer.current) {
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
      }
    }
  }, [map, mapData])

  if (map) {
    projectData.forEach((project) => {
      const Marker = new google.maps.Marker({
        position: project.location.coordinates,
        title: project._id,
        icon: '/img/map-pin.svg'
      })
      Marker.addListener('click', () => {
        setActiveProject(projectData.find(pr => pr._id === Marker.get('title')))
      })
      if (map) { Marker.setMap(map) }
    })
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {ActiveProject && <ProjectCard project={ActiveProject} />}
    </div>
  )
}
