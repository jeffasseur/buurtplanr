import { useRouter } from 'next/router'
import { MapWrapper } from "@/components/3d/MapWrapper"
import { useEffect, useState } from 'react'

const Builder = () => {
  const router = useRouter()
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (router.isReady) {
      let query = router.query.id as string
      let id = parseInt(query[0])
      setProjectId(id)
    }
  }, [router.isReady]);

  return (
    <>
      {
        projectId && <MapWrapper mapType="builder" projectId={projectId} />
      }
    </>
  )
}

export default Builder
