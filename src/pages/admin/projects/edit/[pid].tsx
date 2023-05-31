import { type ParsedUrlQuery } from 'querystring'

import { type GetStaticProps } from 'next'

import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminEditProject from '@components/organisms/Admin/AdminEditProject'

import styles from './styles.module.css'

const EditProject = ({ project }) => {
  return (
    <div className={styles.editProject}>
      <nav className={styles.nav}>
        <Nav />
      </nav>
      <aside className={styles.aside}>
        <SideNav />
      </aside>
      <main className={styles.main}>
        <AdminEditProject project={project} />
      </main>
    </div>
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
