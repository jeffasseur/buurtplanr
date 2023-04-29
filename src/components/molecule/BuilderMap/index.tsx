import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import Toolbar from '@/components/molecule/Toolbar';
import { Editor } from '@/components/atoms/Editor';
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';
import { BuurtMap } from '@/utils/BuurtMap';
import { Object3D, Vector2 } from 'three';

interface MapProps {
  mapData: mapOptions;
  projectData: project;
}

let mousePosition: Vector2;

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [PID, setPID] = useState<number | null>(null),
    [draggable, setDraggable] = useState<Object3D | null>(null),
    [BUURTMAP, setBUURTMAP] = useState<BuurtMap>(),
    modelType = useDroppedModel(state => state.model);

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      mapData.center = projectData.coordinates
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
      setBUURTMAP(new BuurtMap(mapInstance, projectData.coordinates))
    }
  }, [map])

  if (map && BUURTMAP) {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current!.getBoundingClientRect();
      const x = e.domEvent.clientX - left;
      const y = e.domEvent.clientY - top;

      mousePosition.x = 2 * (x / width) - 1;
      mousePosition.y = 1 - 2 * (y / height);
    }

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      updateMousePosition(e);

      const intersections = BUURTMAP.threeOverlay.raycast(mousePosition);
      if (intersections.length === 0) return

      let current = intersections[0].object;

      while (current.parent.parent !== null) {
        current = current.parent;
        setDraggable(null)
      }

      if (current.isDraggable) {
        // has clicked on an active obj
        if (PID != null || draggable == current) {
          BUURTMAP.dragOBJ = null
          setPID(null)
          setDraggable(null)
        } else {
          BUURTMAP.dragOBJ = current
          setPID(current.modelID)
          setDraggable(current)
        }
      }
      BUURTMAP.threeOverlay.requestRedraw();
    })

    map.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
      const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
      latlng.z = 1
      mousePosition = { ...latlng }

      BUURTMAP.updateMousePosition(latlng);
      BUURTMAP.updateProductPosition()
    })
  }

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
      {map && BUURTMAP && <Editor setPID={setPID} activePID={PID} BUURTMAP={BUURTMAP} />}
      {map && <Toolbar />}
    </div>
  )
}