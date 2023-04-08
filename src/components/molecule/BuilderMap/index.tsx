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
    BUURTMAP = new BuurtMap(),
    modelType = useDroppedModel(state => state.model);

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) {
      map.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
        latlng.z = 0.5
        mousePosition = { ...latlng }
        BUURTMAP.threeOverlay.requestRedraw()
      })
      BUURTMAP.BuildMap(map, mapData.center)
    }
  }, [map])

  const initProduct = async () => {
    if (modelType && mousePosition) {
      BUURTMAP.updateMousePos(mousePosition).then((res) => {
        BUURTMAP.appendProducts(modelType)
      })
    }
  }

  const onDrop = () => {
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