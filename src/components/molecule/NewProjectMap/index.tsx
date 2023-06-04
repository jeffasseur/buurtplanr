import { useEffect, useRef, useState } from 'react'

import { MapSetup } from '@/components/atoms/MapSetup'
import { type mapOptions } from '@/types/BUURTTYPES'
import { BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface MapProps {
  mapData: mapOptions
}

export const NewProjectMapBlueprint = ({ mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [BUURTMAP, setBUURTMAP] = useState<BuurtMap>()

  useEffect(() => {
    if (!map) {
      let mapInstance: google.maps.Map
      if (mapContainer.current) {
        mapData.tilt = 65
        mapInstance = new window.google.maps.Map(mapContainer.current, mapData)
        setMap(mapInstance)
        setBUURTMAP(new BuurtMap(mapInstance, mapData.center))
      }
    }
  }, [map, mapData])

  return (
    <div className={styles.container}>
      <div ref={mapContainer} id='map' className={styles.map}>
        {BUURTMAP && <MapSetup BUURTMAP={BUURTMAP} map={map} />}
      </div>
    </div>
  )
}
