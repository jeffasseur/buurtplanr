import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { type ReactElement, useEffect, useState } from 'react'

import { BuilderMapBlueprint } from '@/components/molecule/BuilderMap'
import { OverviewMapBlueprint } from '@/components/molecule/OverviewMap'
import { type mapOptions, type projectData } from '@/types/BUURTTYPES'
import { Loader3d } from '@components/molecule/3dloader'
import { NewProjectMapBlueprint } from '@components/molecule/NewProjectMap'

interface MapProps {
  mapType: string
  projectId?: string
  projectArray?: projectData[]
  singleProject?: projectData
}

const render = (status: Status): ReactElement => {
  let render
  switch (status) {
    case Status.LOADING:
      render = <Loader3d />
      break
    case Status.FAILURE:
      render = <h3>error loading map</h3>
      break
  }
  return render
}

/* send coordinates as props to mapblueprint so that the map is reusable */
export const MapWrapper = ({ mapType, projectId, projectArray, singleProject }: MapProps) => {
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
      {!mapData
        ? <Loader3d />
        : (
          <Wrapper render={render} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
            {mapType === 'overview' && projectArray && <OverviewMapBlueprint mapData={mapData} projectData={projectArray} />}
            {mapType === 'builder' && singleProject && <BuilderMapBlueprint mapData={mapData} projectData={singleProject} />}
            {mapType === 'NewProject' && <NewProjectMapBlueprint mapData={mapData} />}
          </Wrapper>
          )}
    </>
  )
}
