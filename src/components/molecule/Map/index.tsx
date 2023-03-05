import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import styles from './styles.module.css'

const mapOptions = {
  tilt: 25,
  heading: 0,
  zoom: 18,
  center: { lat: 50.8476, lng: 4.3572 },
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  disableDefaultUI: true,
  keyboardShortcuts: false
}

const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <BuurtMap />
    </Wrapper>
  )
}

const BuurtMap = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Object>()

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current!, mapOptions))
  }, [])

  return (
    <div ref={ref} id='map' className={styles.map}>
      <h1>not a title</h1>
    </div>
  )
}

export default MapWrapper
