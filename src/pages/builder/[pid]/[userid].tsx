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

const Builder = ({ pid, userid }: serve) => {
  const updateUID = useUser(state => state.updateUID)
  const updatePID = useUser(state => state.updatePID)
  const updateCreationID = useUser(state => state.updateCreationID)
  let projectURL: string = '/'
  let creationURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && pid) {
    projectURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/projects/${pid}`
  }
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && userid) {
    creationURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/creaties/${pid}/${userid}`
  }

  const projectData = useSWR(`${projectURL}`, fetcher)
  const creationData = useSWR(`${creationURL}`, fetcher)
  updateUID(userid)
  updatePID(pid)
  return (
    <>
      <Navigation />
      {renderMapping(projectData, creationData, updateCreationID)}
    </>
  )
}

const renderMapping = (projectData, creationData, updateCreationID) => {
  if (projectData.data && creationData.data?.data) {
    updateCreationID(creationData.data.data._id)
    return <MapWrapper mapType='builder' singleProject={projectData.data.data} creationData={creationData.data.data.creation} />
  } else if (projectData.data) {
    return <MapWrapper mapType='builder' singleProject={projectData.data.data} creationData={undefined} />
  }
}

export default Builder
