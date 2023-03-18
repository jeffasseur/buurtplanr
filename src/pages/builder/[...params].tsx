import { useRouter } from 'next/router'

import { MapWrapper } from "@/components/3d/DashboardMap"

const Builder = () => {
  const router = useRouter()
  const { params } = router.query

  return (
    <MapWrapper />
  )
}

export default Builder
