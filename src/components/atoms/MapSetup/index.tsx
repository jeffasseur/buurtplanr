import { use, useEffect, useRef } from 'react'

import { type BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface setupProps {
  BUURTMAP: BuurtMap
  map: google.maps.Map | undefined
}

export const MapSetup = ({ BUURTMAP, map }: setupProps) => {
  const inputBox = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (map && inputBox.current) {
      const searchBox = new google.maps.places.SearchBox(inputBox.current)
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
      })
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        const bounds = new google.maps.LatLngBounds()

        if (places && places.length > 0) {
          places.forEach((place) => {
            if (!place.geometry?.location) return

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
        }
        map.fitBounds(bounds)
        map.setTilt(100)
      })
    }
  }, [map])

  return (
    <div className={styles.setupContainer}>
      <div>
        <p>nieuw project locatie zoeken</p>
        <div className={styles.input}><input ref={inputBox} type='text' id='placeQuery' /></div>
      </div>
      <div>
        <div onClick={() => { BUURTMAP.placeBnds() }} className={styles.btnPrimary}>plaats project locatie op kaart</div>
      </div>
      <div>
        <div onClick={() => { BUURTMAP.placeBnds() }} className={styles.btnPrimary}>place bounds</div>
        <p>bounds left: 10</p>
      </div>
    </div>
  )
}
