import { Wrapper } from '@googlemaps/react-wrapper'

import MapBlueprint from '../../atoms/Map'

const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <MapBlueprint />
    </Wrapper>
  )
}

export default MapWrapper
