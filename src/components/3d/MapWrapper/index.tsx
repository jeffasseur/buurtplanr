import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { type ReactElement, useEffect, useState } from 'react'

import { BuilderMapBlueprint } from '@/components/molecule/BuilderMap'
import { OverviewMapBlueprint } from '@/components/molecule/OverviewMap'
import { ParamsMapBlueprint } from '@/components/molecule/ParamsMap'
import { type mapOptions, type project } from '@/types/BUURTTYPES'
import { Loader3d } from '@components/molecule/3dloader'

interface MapProps {
  mapType: string
  projectId?: string
  projectData: project[]
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <Loader3d />
  if (status === Status.FAILURE) return <h3>error loading map</h3>
}

/* send coordinates as props to mapblueprint so that the map is reusable */
export const MapWrapper = ({ mapType, projectId, projectData }: MapProps) => {
  const [mapData, setMapData] = useState<mapOptions | null>(null)
  useEffect(() => {
    if (!mapData) {
      // get user coordinates to send in map blueprint to set map camera to user location
      navigator.geolocation.getCurrentPosition((e) => {
        const mapOptions: mapOptions = {
          tilt: 0,
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
  }, [mapData, projectId])

  return (
    <>
      {mapData
        ? <Wrapper render={render} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
          {mapType === 'overview' && <OverviewMapBlueprint mapData={mapData} projectData={projectData} />}
          {mapType === 'builder' && projectData && <BuilderMapBlueprint mapData={mapData} projectData={projectData} />}
          {mapType === 'params' && <ParamsMapBlueprint mapData={mapData} projectData={projects[0]} />}
        </Wrapper>
        : <Loader3d />}
    </>
  )
}
