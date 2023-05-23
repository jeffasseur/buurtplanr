import useSWR from 'swr'

import { MapWrapper } from '@/components/3d/MapWrapper'
import Navigation from '@components/molecule/Navigation'
import { useUser } from '@components/zustand/buurtplanrContext'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

Builder.getInitialProps = async ({ query }) => {
  const { pid, userid } = query
  return { pid, userid }
}

export default function Builder ({ pid, userid }) {
  const updateUID = useUser(state => state.updateUID)
  const updatePID = useUser(state => state.updatePID)
  const baseURL = process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()
  const { data } = useSWR(`${baseURL}projects/${pid}`, fetcher)
  updateUID(userid)
  updatePID(pid)

  return (
    <>
      <Navigation />
      {data && <MapWrapper mapType='builder' projectData={data.message} />}
    </>
  )
}
