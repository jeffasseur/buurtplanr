import { useRouter } from 'next/router'

import { MapWrapper } from "@/components/3d/MapWrapper"

const Builder = () => {
  const router = useRouter()
  const { params } = router.query
  console.log(params)
  return (
    <MapWrapper mapType="builder" projectId={params[0]} />
  )
}

export default Builder
