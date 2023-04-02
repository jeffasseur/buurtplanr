import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeJSOverlayView } from "@googlemaps/three";

import styles from './styles.module.css'
import Toolbar from '@/components/molecule/Toolbar';
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';

interface MapProps {
  mapData: mapOptions;
  projectData: project;
}

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const
    mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [mousePosition, setMousePosition] = useState<google.maps.LatLngAltitudeLiteral>({ lat: 0, lng: 0, altitude: 1 }),
    threeOverlay = new ThreeJSOverlayView({ map, animationMode: "always", upAxis: "Z" }),
    modelType = useDroppedModel(state => state.model),
    loader = new GLTFLoader();

  useEffect(() => {
    if (!map) {
      mapData.mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_FLAT_MAP_ID
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) {
      threeOverlay.setMap(map)
      initScene()
    }
  }, [map])

  const initScene = () => {
    threeOverlay.setAnchor({ ...projectData.coordinates, altitude: 0 });

    //initialize eventlisteners for user inputs
    if (map)
      map.addListener("mousemove", (e) => {
        const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()));
        latlng.altitude = 0.5
        setMousePosition(latlng)
      })
  }

  const getModel = () => {
    loader.load(`/models/${modelType}.glb`, (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(25);
      model.rotation.set(Math.PI / 2, 0, 0);
      model.position.copy(threeOverlay.latLngAltitudeToVector3(mousePosition));
      threeOverlay.scene.add(model);
      threeOverlay.requestRedraw();
    })
  }

  const onDrop = () => {
    getModel()
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