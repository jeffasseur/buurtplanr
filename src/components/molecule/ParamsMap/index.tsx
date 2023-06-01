import { useEffect, useRef, useState } from 'react'

import { MapSetup } from '@/components/atoms/MapSetup'
import { type mapOptions, type projectData } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
  projectData: projectData
}

export const ParamsMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()

  useEffect(() => {
    if (!map) {
      mapData.center = projectData.location.coordinates
      let mapInstance
      if (mapContainer.current) {
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
        setBUURTMAP(new BuurtMap(mapInstance, projectData.location.coordinates))
      }
    }
  }, [map, mapData, projectData.location.coordinates])

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {BUURTMAP && <MapSetup BUURTMAP={BUURTMAP} />}
    </div>
  )
}
