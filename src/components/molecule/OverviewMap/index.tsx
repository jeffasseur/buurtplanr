import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ThreejsOverlayView from '@ubilabs/threejs-overlay-view';
import * as THREE from 'three'

import styles from './styles.module.css'
import { ProjectCard } from '../ProjectCard';

interface MapProps {
  projectData: Array<Object>;
}

interface markersObj {
  [key: string]: any;
}

const mapOptions = {
  tilt: 50,
  heading: 0,
  zoom: 18,
  center: { lat: 51.02342, lng: 4.4841925 },
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  disableDefaultUI: true,
  keyboardShortcuts: false
}

export const OverviewMapBlueprint = ({ projectData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null),
    [map, setMap] = useState<google.maps.Map>(),
    [ActiveProject, setActiveProject] = useState<object | null>(null),
    threeOverlay = new ThreejsOverlayView(mapOptions.center),
    mousePosition = new THREE.Vector2(),
    scene = threeOverlay.getScene(),
    markers: markersObj[] = [];

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(mapContainer.current!, mapOptions)
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
      threeOverlay.latLngAltToVector3({ lat, lng }, gltf.scene.position);
      scene.add(gltf.scene);
      getAllMarkers()
    });
  }

  //collect all marker in scene into an array 
  const getAllMarkers = () => {
    scene.children.find(el => {
      if ("projectId" in el) {
        let admit = markers.findIndex(markers => markers.projectId == el.projectId)
        admit === -1 ? markers.push(el) : console.log("object already exists")
      }
    })
  }

  //initialize eventlisteners for user inputs
  const bindMapEvents = () => {
    const updateMousePosition = (e) => {
      const { left, top, width, height } = mapContainer.current.getBoundingClientRect();
      const x = e.domEvent.clientX - left;
      const y = e.domEvent.clientY - top;

      mousePosition.x = 2 * (x / width) - 1;
      mousePosition.y = 1 - 2 * (y / height);
    }

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
  threeOverlay.update = () => {
    let highlightedObject;
    const intersections = threeOverlay.raycast(mousePosition);

    if (intersections.length) {
      resetMarkerColor();
      highlightedObject = intersections[0].object;
      highlightedObject.material.color.setHex(0xffffff);
      setActiveProject(highlightedObject.parent.projectId)
    } else {
      resetMarkerColor();
      setActiveProject(null)
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