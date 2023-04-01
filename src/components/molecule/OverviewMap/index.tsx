import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { ThreeJSOverlayView } from "@googlemaps/three";

import styles from './styles.module.css'
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { ProjectCard } from '../ProjectCard';

interface MapProps {
  projectData: project[];
  mapData: mapOptions;
}

interface markersObj {
  [key: string]: any;
}

export const OverviewMapBlueprint = ({ projectData, mapData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [ActiveProject, setActiveProject] = useState<project | undefined>(undefined),
    threeOverlay = new ThreeJSOverlayView(),
    mousePosition = new THREE.Vector2(),
    markers: markersObj[] = [];

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
    //create markers for each project
    projectData.forEach(el => {
      const loader = new GLTFLoader();
      createMarkers(loader, el);
    });
    threeOverlay.setMap(map);
  }

  //append markers on scene
  const createMarkers = (loader, el) => {
    loader.load("/models/marker.glb", (gltf) => {
      gltf.scene.projectId = el.id;
      gltf.scene.scale.set(20, 20, 20);
      gltf.scene.rotation.x = Math.PI / 2;
      const lat = el.coordinates.lat;
      const lng = el.coordinates.lng;
      threeOverlay.latLngAltitudeToVector3({ lat, lng }, gltf.scene.position);
      threeOverlay.scene.add(gltf.scene);
      getAllMarkers()
    });
  }

  //collect all marker in scene into an array 
  const getAllMarkers = () => {
    threeOverlay.scene.children.find(el => {
      if ("projectId" in el) {
        let admit = markers.findIndex(markers => markers.projectId == el.projectId)
        admit === -1 ? markers.push(el) : console.log("object already exists")
      }
    })
  }

  //initialize eventlisteners for user inputs
  const bindMapEvents = () => {
    const updateMousePosition = (e) => {
      if (mapContainer.current) {
        const { left, top, width, height } = mapContainer.current.getBoundingClientRect();
        const x = e.domEvent.clientX - left;
        const y = e.domEvent.clientY - top;

        mousePosition.x = 2 * (x / width) - 1;
        mousePosition.y = 1 - 2 * (y / height);
      }
    }

    if (map)
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        updateMousePosition(e);
        threeOverlay.requestRedraw();
      })
  }

  //reset marker color
  const resetMarkerColor = () => {
    markers.forEach(el => {
      el.children[0].material.color.setHex(0xff0000);
    })
  }

  //overlay update lifecycle
  threeOverlay.onBeforeDraw = () => {
    let highlightedObject;
    const intersections = threeOverlay.raycast(mousePosition);

    if (intersections.length) {
      resetMarkerColor();
      highlightedObject = intersections[0].object;
      highlightedObject.material.color.setHex(0xffffff);
      setActiveProject(highlightedObject.parent.projectId)
    } else {
      resetMarkerColor();
      setActiveProject(undefined)
    }
  }

  return (
    <div ref={mapContainer} id='map' className={styles.map}>
      {typeof ActiveProject === "number" &&
        <ProjectCard project={projectData.find(el => el.id == ActiveProject)} />
      }
    </div>
  )
}