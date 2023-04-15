import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import Toolbar from '@/components/molecule/Toolbar';
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';
import { BuurtMap } from '@/utils/BuurtMap';

interface MapProps {
  mapData: mapOptions;
  projectData: project;
}

let mousePosition: google.maps.LatLngAltitudeLiteral;

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [BUURTMAP, setBUURTMAP] = useState<BuurtMap>(),
    modelType = useDroppedModel(state => state.model);

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
    if (map && BUURTMAP) {
      map.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
        latlng.z = 1
        mousePosition = { ...latlng }
        BUURTMAP.threeOverlay.requestRedraw()
      })
    }
  }, [map])

  const initProduct = async () => {
    if (BUURTMAP && modelType) {
      BUURTMAP.updateMousePosition(mousePosition).then((res) => {
        BUURTMAP.appendProducts(modelType)
      })
    }
  }

  const onDrop = (e) => {
    console.log(e)
    initProduct()
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map} onDragOver={onDragOver} onDrop={onDrop}>
      {map && <Toolbar />}
    </div >
  )
}