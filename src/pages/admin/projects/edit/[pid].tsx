import { type ParsedUrlQuery } from 'querystring'

import { type GetStaticProps } from 'next'

import AdminLayout from '@/components/layouts/admin-layout'
import AdminEditProject from '@components/organisms/Admin/AdminEditProject'

// import styles from './styles.module.css'

let baseURL: string = '/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const EditProject = ({ project }) => {
  return (
    <AdminLayout>
      <AdminEditProject project={project} />
    </AdminLayout>
  )
}

interface Params extends ParsedUrlQuery {
  pid: string
}

export const getStaticPaths = async () => {
  const res = await fetch(`${baseURL}projects/`)
  const data = await res.json()

  const paths: object = data.data.map(project => {
    return {
      params: {
        pid: project._id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params as Params
  const apiUrl: string = `${baseURL}projects/${pid}`
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${baseURL}`
    }
  })
  const data = await res.json()
  return { props: { project: data.data }, revalidate: 60 }
}

export default EditProject
