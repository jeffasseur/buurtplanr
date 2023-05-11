import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { MapWrapper } from '@/components/3d/MapWrapper'

const Builder = () => {
  const router = useRouter()
  const [projectId, setProjectId] = useState<number | null>(null)

  useEffect(() => {
    if (router.isReady) {
      const query = router.query.id as string
      const id = parseInt(query[0])
      setProjectId(id)
    }
  }, [router.isReady, router.query])

  return (
    projectId && <MapWrapper mapType='builder' projectId={projectId} />
  )
}

export default Builder
