import { Wrapper } from '@googlemaps/react-wrapper';

import { OverviewMapBlueprint } from '@/components/molecule/OverviewMap';
import { BuilderMapBlueprint } from '@/components/molecule/BuilderMap';
import { useEffect, useState } from 'react';
import { ParamsMapBlueprint } from '@/components/molecule/ParamsMap';

interface MapProps {
  mapType: string;
  projectId?: number;
}

export interface mapOptions {
  tilt: number,
  heading: number,
  zoom: number,
  center: {
    lat: number,
    lng: number,
    altitude: number
  },
  mapId: string | undefined,
  disableDefaultUI: boolean,
  keyboardShortcuts: boolean
}

export interface project {
  id: number,
  name: string,
  info: {
    description: string,

  },
  coordinates: {
    lat: number,
    lng: number,
    altitude: number
  }
}

const projects: project[] = [
  {
    id: 1,
    name: "kruidtuin",
    info: {
      description: "lorem ipsummed lorem",

    },
    coordinates: {
      lat: 51.02342,
      lng: 4.4841925,
      altitude: 1
    }
  },
  {
    id: 2,
    name: "vleeshalle",
    info: {
      description: "lorem ipsummed lorem",

    },
    coordinates: {
      lat: 51.026431091650224,
      lng: 4.484253696734126,
      altitude: 1
    }
  }
]

{/* send coordinates as props to mapblueprint so that the map is reusable */ }
export const MapWrapper = ({ mapType, projectId }: MapProps) => {
  const [mapData, setMapData] = useState<mapOptions | null>(null);
  const [projectData, setProjectData] = useState<project>();

  useEffect(() => {
    if (!mapData) {
      //get user coordinates to send in map blueprint to set map camera to user location
      navigator.geolocation.getCurrentPosition((e) => {
        const mapOptions: mapOptions = {
          tilt: 50,
          heading: 0,
          zoom: 18,
          center: { lat: e.coords.latitude, lng: e.coords.longitude, altitude: 1 },
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_DEFAULT_MAP_ID,
          disableDefaultUI: true,
          keyboardShortcuts: false
        }
        setMapData(mapOptions)
      })
    }
    if (projectId)
      setProjectData(projects.find(el => el.id == projectId))
  })

  return <>
    {mapData && (
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {mapType === "overview" && <OverviewMapBlueprint mapData={mapData} projectData={projects} />}
        {mapType === "builder" && projectData && <BuilderMapBlueprint mapData={mapData} projectData={projectData} />}
        {mapType === "params" && <ParamsMapBlueprint mapData={mapData} />}
      </Wrapper>
    )}
  </>
}