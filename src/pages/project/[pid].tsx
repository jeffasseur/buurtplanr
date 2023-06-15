import { type ParsedUrlQuery } from 'querystring'

import Image from 'next/image'
import Router from 'next/router'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import UserLayout from '@/components/layouts/user-layout'
import Tracker from '@/components/molecule/ProjectDetailsTracker'
import Fase1 from '@/components/organisms/ProjectDetails/Fase1'
import Fase2 from '@/components/organisms/ProjectDetails/Fase2'
import Fase3 from '@/components/organisms/ProjectDetails/Fase3'
import Fase4 from '@/components/organisms/ProjectDetails/Fase4'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const ProjectDetailPage = ({ project }) => {
  const fase = project.fase.split(' ')[1]
  const faseNumberString = fase.split(':')[0]
  const faseNumberInt = parseInt(faseNumberString)
  const pageElements = [<Fase2 key={2} project={project} />, <Fase3 key={3} project={project} />, <Fase4 key={4} project={project} />]
  return (
    <>
      <UserLayout>
        <header className={styles.header}>
          {
            (project.projectData.type === 'Park' || project.projectData.type === 'park') &&
            (
              <Image src='/img/types/PARK.png' alt='type park' fill className={styles.bgImage} />
            )
          }
          {
            (project.projectData.type === 'Straat' || project.projectData.type === 'straat') &&
            (
              <Image src='/img/types/STREET.png' alt='type straat' fill className={styles.bgImage} />
            )
          }
          {
            (project.projectData.type === 'Dorp' || project.projectData.type === 'dorp') &&
            (
              <Image src='/img/types/TOWN.png' alt='type dorp' fill className={styles.bgImage} />
            )
          }
          <Button
            as='link'
            href=''
            onClick={() => { Router.back() }}
            prepend='arrow-left'
            theme='Transparent'
            size='small'
            className={styles.goBack}
          >Terug
          </Button>
          <Title as='h1' size='h1' weight='semibold' className={styles.title}>{project.title}</Title>
          <Tracker step={faseNumberInt} />
        </header>
        <main className={styles.main}>
          {
            (faseNumberInt > 1 && faseNumberInt < 4) &&
            (
              <>
                {pageElements[faseNumberInt - 2]}
              </>
            )
          }
          <Fase1 project={project} />
          {
            faseNumberInt === 4 &&
            (
              <>
                {pageElements[faseNumberInt - 2]}
              </>
            )
          }
        </main>
      </UserLayout>
    </>
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

export const getStaticProps = async (context) => {
  const { pid } = context.params as Params
  const res = await fetch(`${baseURL}projects/${pid}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${baseURL}`
      // authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  if (data.status === 'success') {
    return { props: { project: data.data }, revalidate: 60 }
  } else if (data.status === 'error' || data.status !== 'success') {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}

export default ProjectDetailPage
