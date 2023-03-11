import { Wrapper } from '@googlemaps/react-wrapper';

import MapBlueprint from '@/components/molecule/Map';

export const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <MapBlueprint />
    </Wrapper>
  )
}