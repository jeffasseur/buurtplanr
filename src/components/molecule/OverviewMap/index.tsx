import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import styles from './styles.module.css'
import { mapOptions, project } from '@/components/3d/MapWrapper';
import { ProjectCard } from '../ProjectCard';
import { BuurtMap } from '@/utils/BuurtMap';

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
    BUURTMAP = new BuurtMap(),
    [ActiveProject, setActiveProject] = useState<project | undefined>(undefined),
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

  const createOverlay = () => {
    //create 3d overlay
    BUURTMAP.BuildMap(map, mapData.center)

    //create markers for each project ++ append to three-js-overlayview
    projectData.forEach(el => {
      BUURTMAP.appendModel(el);
      getAllMarkers()
    });
  }

  //collect all marker in scene into an array 
  const getAllMarkers = () => {
    BUURTMAP.scene.children.find(el => {
      if ("projectId" in el) {
        let admit = markers.findIndex(markers => markers.projectId == el.projectId)
        if (admit === -1) markers.push(el)
      }
    })
  }

  //initialize eventlisteners for user inputs ++ raycaster
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
        BUURTMAP.threeOverlay.requestRedraw();
      })
  }

  //reset marker color
  const resetMarkerColor = () => {
    markers.forEach(el => {
      el.children[0].material.color.setHex(0xff0000);
    })
  }

  //overlay update lifecycle
  BUURTMAP.threeOverlay.onBeforeDraw = () => {
    let highlightedObject;
    const intersections = BUURTMAP.threeOverlay.raycast(mousePosition);

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