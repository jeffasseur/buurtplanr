import { useEffect, useRef, useState } from 'react'

import { type mapOptions } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
  votingProject: any
  mapType: string
}

export const MinimalMapBlueprint = ({ mapData, votingProject, mapType }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = votingProject.project.location.coordinates
      mapData.tilt = 65
      let mapInstance: google.maps.Map
      if (mapContainer.current) {
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
        setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
      }
    }
    if (BUURTMAP?.scene) {
      BUURTMAP.boundLats = votingProject.project.border
      BUURTMAP.joinBounds()
      votingProject.creation.forEach(el => {
        BUURTMAP.appendProducts(el.modelName, el.latlng)
      })
    }
  }, [BUURTMAP, map, mapData, votingProject.creation, votingProject.project.border, votingProject.project.location.coordinates])

  return (
    <div className={styles.container}>
      <div ref={mapContainer} id='map' className={styles.map} />
    </div>
  )
}
