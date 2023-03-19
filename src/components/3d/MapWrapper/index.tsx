import { Wrapper } from '@googlemaps/react-wrapper';

import { OverviewMapBlueprint } from '@/components/molecule/OverviewMap';
import { BuilderMapBlueprint } from '@/components/molecule/BuilderMap';
import { useEffect, useState } from 'react';

interface MapProps {
  mapType: string;
}

const projects = [
  {
    id: 1,
    name: "kruidtuin",
    info: {
      description: "lorem ipsummed lorem",

    },
    coordinates: {
      lat: 51.02342,
      lng: 4.4841925,
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
    }
  }
]

{/* send coordinates as props to mapblueprint so that the map is reusable */ }
export const MapWrapper = ({ mapType }: MapProps) => {
  // const [latlng, setLatLng] = useState<object | null>(null);
  const [mapData, setMapData] = useState<object | null>(null);

  useEffect(() => {
    if (!mapData) {
      //get user coordinates to send in map blueprint to set map camera to user location
      navigator.geolocation.getCurrentPosition((e) => {
        const mapOptions = {
          tilt: 50,
          heading: 0,
          zoom: 18,
          center: { lat: e.coords.latitude, lng: e.coords.longitude },
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
          disableDefaultUI: true,
          keyboardShortcuts: false
        }
        setMapData(mapOptions)
      })
    }
  })

  return <>
    {mapData && (
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {mapType === "overview" && <OverviewMapBlueprint mapData={mapData} projectData={projects} />}
        {mapType === "builder" && <BuilderMapBlueprint mapData={mapData} projectData={projects} />}
      </Wrapper>
    )}
  </>
}