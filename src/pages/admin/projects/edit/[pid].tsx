import { type ParsedUrlQuery } from 'querystring'

import { type GetStaticProps } from 'next'

import AdminLayout from '@/components/layouts/admin-layout'
import AdminEditProject from '@components/organisms/Admin/AdminEditProject'

// import styles from './styles.module.css'

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
  const res = await fetch('http://127.0.0.1:3002/projects/')
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
  const apiUrl: string = `http://127.0.0.1:3002/projects/${pid}`
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3002'
    }
  })
  const data = await res.json()
  return { props: { project: data.data } }
}

export default EditProject
