import { Wrapper } from '@googlemaps/react-wrapper';

import MapBlueprint from '@/components/molecule/Map';
import { ProjectCard } from '@/components/molecule/ProjectCard';

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
    name: "kruidtuin",
    info: {
      description: "lorem ipsummed lorem",

    },
    coordinates: {
      lat: 51.03342,
      lng: 4.4841925,
    }
  }
]

const mapCoord = {
  lat: 51.0259,
  lng: 4.4776
}

{/* send coordinates as props to mapblueprint so that the map is reusable */ }
export const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <ProjectCard />
      <MapBlueprint />
    </Wrapper>
  )
}