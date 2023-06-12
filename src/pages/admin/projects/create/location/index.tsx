import { MapWrapper } from '@/components/3d/MapWrapper'
import Navigation from '@components/molecule/Navigation'

const Builder = () => {
  return (
    <>
      <Navigation />
      <MapWrapper mapType='NewProject' />
    </>
  )
}

export default Builder
