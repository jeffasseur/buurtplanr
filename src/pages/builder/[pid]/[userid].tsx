import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { MapWrapper } from '@/components/3d/MapWrapper'

export default function Builder () {
  const router = useRouter()
  const [projectId, setProjectId] = useState<string | undefined>()

  useEffect(() => {
    if (router.isReady) {
      setProjectId(router.query.pid?.toString())
    }
  }, [router.isReady, router.query])

  return (
    projectId && <MapWrapper mapType='builder' projectId={projectId} />
  )
}
