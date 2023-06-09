import useSWR from 'swr'

import { MapWrapper } from '@/components/3d/MapWrapper'
import { type productUploadData } from '@/types/BUURTTYPES'
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
  // let creationURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && pid) {
    projectURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/projects/${pid}`
  }
  // if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && userid) {
  //   creationURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}/creaties/${pid}/${userid}`
  // }

  const projectData = useSWR(`${projectURL}`, fetcher)
  // const creationData = useSWR(`${creationURL}`, fetcher)
  updateUID(userid)
  updatePID(pid)
  // console.log(creationData)
  const creationData: productUploadData[] = [
    {
      latlng: { x: 23.15546146688442, y: -4.344285009320903, z: 2 },
      modelName: 'tree'
    },
    {
      latlng: { x: -44.06736484110051, y: -8.598570871488736, z: 2 },
      modelName: 'car-charge'
    },
    {
      latlng: { x: 2.6046947214169807, y: -43.43562401604701, z: 2 },
      modelName: 'water-pole'
    }
  ]

  return (
    <>
      <Navigation />
      {projectData.data && <MapWrapper mapType='builder' singleProject={projectData.data.data} creationData={creationData} />}
    </>
  )
}
