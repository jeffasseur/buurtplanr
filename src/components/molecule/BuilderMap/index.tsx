import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import Toolbar from '@/components/molecule/Toolbar';
import { Editor } from '@/components/atoms/Editor';
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
    [PID, setPID] = useState<number | null>(null),
    [BUURTMAP, setBUURTMAP] = useState<BuurtMap>(),
    modelType = useDroppedModel(state => state.model);

  let activeProductID: number | null = null;

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = projectData.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
    if (map && BUURTMAP) {
      const updateMousePosition = (e) => {
        const { left, top, width, height } = mapContainer.current.getBoundingClientRect();
        const x = e.domEvent.clientX - left;
        const y = e.domEvent.clientY - top;
  
        mousePosition.x = 2 * (x / width) - 1;
        mousePosition.y = 1 - 2 * (y / height);
      }
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        updateMousePosition(e);
  
        const intersections = BUURTMAP.threeOverlay.raycast(mousePosition);
        setPID(null)
  
        if (intersections.length === 0) return;
  
        const highlightedObject = intersections[0].object;

        if(highlightedObject.modelID)
          setPID(highlightedObject.modelID)
        else if(highlightedObject.parent.modelID)
          setPID(highlightedObject.parent.modelID)
  
        BUURTMAP.threeOverlay.requestRedraw();
      })
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
    initProduct()
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map} onDragOver={onDragOver} onDrop={onDrop}>
      {map && BUURTMAP && <Editor activePID={PID} BUURTMAP={BUURTMAP} />}
      {map && <Toolbar />}
    </div>
  )
}