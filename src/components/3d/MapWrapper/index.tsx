import { Wrapper } from '@googlemaps/react-wrapper';

import { OverviewMapBlueprint } from '@/components/molecule/OverviewMap';
import { BuilderMapBlueprint } from '@/components/molecule/BuilderMap';

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
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {mapType === "overview" && <OverviewMapBlueprint projectData={projects} />}
      {/* {mapType === "builder" && <BuilderMapBlueprint projectData={projects} />} */}
    </Wrapper>
  )
}