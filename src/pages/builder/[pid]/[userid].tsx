import useSWR from 'swr'

import { MapWrapper } from '@/components/3d/MapWrapper'
import Navigation from '@components/molecule/Navigation'
import { useUser } from '@components/zustand/buurtplanrContext'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

export const getServerSideProps = async (context) => {
  const { pid, userid } = context.query
  return {
    props: { pid, userid }
  }
}

interface serve {
  pid: string
  userid: string
}

export default function Builder ({ pid, userid }: serve) {
  const updateUID = useUser(state => state.updateUID)
  const updatePID = useUser(state => state.updatePID)
  let projectURL: string = '/'
  let creationURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && pid) {
    projectURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/projects/${pid}`
  }
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && userid) {
    creationURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/creaties/${pid}/${userid}`
  }

  const projectData = useSWR(`${projectURL}`, fetcher)
  // const creationData = useSWR(`${creationURL}`, fetcher)
  updateUID(userid)
  updatePID(pid)

  return (
    <>
      <Navigation />
      {projectData.data && <MapWrapper mapType='builder' singleProject={projectData.data.data} />}
    </>
  )
}
