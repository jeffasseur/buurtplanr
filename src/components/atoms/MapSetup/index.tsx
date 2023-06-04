import { useEffect, useRef, useState } from 'react'

import { type BuurtMap } from '@/utils/BuurtMap'
import { useNewProjectForm } from '@components/zustand/buurtplanrContext'

import Button from '../Button'
import Icon from '../Icon'

import styles from './styles.module.css'

interface setupProps {
  BUURTMAP: BuurtMap
  map: google.maps.Map | undefined
}

export const MapSetup = ({ BUURTMAP, map }: setupProps) => {
  const cocreationProgress = useNewProjectForm((state) => state.cocreationProgress)
  const newForm = { ...cocreationProgress }

  const inputBox = useRef<HTMLInputElement | null>(null)
  // let Marker: google.maps.Marker
  const [placedMarker, setPlacedMarker] = useState<boolean>(false)
  const [Marker, setMarker] = useState<google.maps.Marker>()
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
    if (Marker && map) {
      Marker.setMap(map)
      setPlacedMarker(true)
    }
  }, [Marker, map])

  const placeMarker = () => {
    if (map && !placedMarker) {
      setMarker(new google.maps.Marker({
        position: map.getCenter(),
        icon: '/img/map-pin.svg',
        title: 'herplaatsen',
        draggable: true
      }))
    }
  }

  const save = () => {
    if (Marker) {
      newForm.location.coordinates.lat = Marker.getPosition()?.lat()
      newForm.location.coordinates.lng = Marker.getPosition()?.lng()
    }
  }

  return (
    <div className={styles.setupContainer}>
      <h2>Builder Opzet</h2>
      <div className={styles.locationPicker}>
        <p>zoek op locatie en plaats een pin</p>
        <div className={styles.locationInputBox}>
          <div className={styles.input}><input ref={inputBox} type='text' id='placeQuery' /></div>
          <div className={`${placedMarker ? `${styles.locationMark} ${styles.disabled}` : styles.locationMark}  `} onClick={placeMarker}>
            <Icon name='location' />
          </div>
        </div>
      </div>
      <div className={styles.locationPicker}>
        <p>plaats grenzen aan je project</p>
        <div>
          <Button
            as='button'
            size='small'
            theme='Primary'
            onClick={() => { BUURTMAP.placeBnds() }}
          >
            grenzen plaatsen
          </Button>
          <p>overige grenzen: 10</p>
        </div>
      </div>
      <Button
        as='link'
        href='/admin/projects/create'
        size='small'
        append='arrow-right'
        theme='Primary'
      >
        <p onClick={() => { save() }}>
          opslaan
        </p>
      </Button>

    </div>
  )
}
