import { useRouter } from 'next/router'

import { MapWrapper } from "@/components/3d/MapWrapper"

const Builder = () => {
  const router = useRouter()
  const { params } = router.query

  return (
    <MapWrapper mapType="builder" />
  )
}

export default Builder
