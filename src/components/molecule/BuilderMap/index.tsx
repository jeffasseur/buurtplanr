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
  projectData: project;
}

export const BuilderMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    threeOverlay = new ThreejsOverlayView(projectData.coordinates),
    scene = threeOverlay.getScene(),
    modelType = useDroppedModel(state => state.model),
    loader = new GLTFLoader()
  let mousePosition: LatLngAltitudeLiteral = ({
    ...projectData.coordinates, altitude: 0.5
  }),
    modelPos: THREE.Vector3

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapData)
      setMap(mapInstance)
    }
    if (map) {
      threeOverlay.setMap(map);
      initScene()
    }
  }, [map])

  const initScene = () => {
    console.log(mousePosition)
    threeOverlay.update = () => {
      modelPos = threeOverlay.latLngAltToVector3(mousePosition);
      threeOverlay.requestRedraw();
    }

    //initialize eventlisteners for user inputs
    if (map) {
      map.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        const latlng = JSON.parse(JSON.stringify(e.latLng?.toJSON()));
        latlng.z = 0.5;
        mousePosition = { ...latlng }
      })
    }
  }

  const getModel = (model) => {
    loader.load(`/models/${model}.glb`, (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(25);
      model.rotation.set(Math.PI / 2, 0, 0);
      model.position.set(modelPos.x, modelPos.y, modelPos.z);
      console.log(model);
      scene.add(model);
    })
  }

  const onDrop = () => {
    getModel(modelType)
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