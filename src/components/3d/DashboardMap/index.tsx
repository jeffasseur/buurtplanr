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
export const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <ProjectCard projectData={projects} />
      <MapBlueprint projectData={projects} />
    </Wrapper>
  )
}