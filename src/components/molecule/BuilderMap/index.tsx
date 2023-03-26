import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ThreejsOverlayView from '@ubilabs/threejs-overlay-view';
import * as THREE from 'three'

import styles from './styles.module.css'
import Toolbar from '@/components/molecule/Toolbar';
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';
import { LatLngAltitudeLiteral } from '@ubilabs/threejs-overlay-view/dist/types';

interface MapProps {
  mapData: mapOptions;
  projectData: project | undefined;
}

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    threeOverlay = new ThreejsOverlayView(mapData.center),
    scene = threeOverlay.getScene(),
    model = useDroppedModel(state => state.model),
    loader = new GLTFLoader();
  let newPosition: LatLngAltitudeLiteral = { lat: 0, lng: 0, altitude: 0.5 };

  if (projectData)
    mapData.center = projectData.coordinates

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) {
      createOverlay()
      bindMapEvents()
    }
  }, [map])

  //create 3d overlay
  const createOverlay = () => {
    threeOverlay.setMap(map);
  }

  //append new model on scene
  const appendModel = (loader, el) => {
    loader.load(`/models/${el}.glb`, (gltf) => {
      gltf.scene.scale.set(20, 20, 20);
      gltf.scene.rotation.x = Math.PI / 2;
      threeOverlay.latLngAltToVector3(newPosition, gltf.scene.position)
      scene.add(gltf.scene);
      console.log(scene)
      threeOverlay.requestRedraw();
    });
  }

  //initialize eventlisteners for user inputs
  const bindMapEvents = () => {
    if (map) {
      map.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()))
        latlng.z = 0.5
        newPosition = { ...latlng }
        console.log(newPosition)
        threeOverlay.requestRedraw();
      })
    }
  }

  //overlay update lifecycle
  threeOverlay.update = () => {
    threeOverlay.requestRedraw();
  }

  const onDrop = (e) => {
    appendModel(loader, model);
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