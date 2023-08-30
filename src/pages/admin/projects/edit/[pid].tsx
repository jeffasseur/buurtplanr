// import { type ParsedUrlQuery } from 'querystring'

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

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const pid = params?.pid as string
  const project = await fetch(`${baseURL}projects/${pid}`).then(async res => await res.json())
  return {
    props: {
      pid,
      project: project.data
    }
  }
}

export default EditProject
