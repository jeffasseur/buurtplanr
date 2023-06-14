'use client'

import useSWR from 'swr'

import ProjectCard from '@/components/molecule/ProjectCard/Column'
import ReduxCheck from '@/helpers/ReduxCheck'

const baseURL: string = 'http://127.0.0.1:3002/'
// if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
//   baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
// }

const ProfileBijdragen = () => {
  const authReducer = ReduxCheck()
  const token: string = authReducer.token
  const userId: string = authReducer.data._id

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': `${baseURL}`,
        authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  }

  const { isLoading, data, error } = useSWR(`${baseURL}creaties/burger/${userId}`, fetcher)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {
        data?.status === 'error' &&
        (
          <p>{data.message}</p>
        )
      }
      {data?.data &&
        data.data.map((creatie, index) => (
          <ProjectCard project={creatie.project} key={index} userId={userId} />
        ))}
      {error && <p>Er is iets misgegaan met het ophalen van de gegevens</p>}
    </>
  )
}

export default ProfileBijdragen
