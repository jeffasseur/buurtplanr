import { type ParsedUrlQuery } from 'querystring'

import { redirect } from 'next/dist/server/api-utils'
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

let baseURL: string = '/'
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
          <Title as='h1' size='h1' weight='semibold'>{project.title}</Title>
          <Tracker step={faseNumberInt} />
        </header>
        <main className={styles.main}>
          {
            faseNumberInt > 1 &&
            (
              <>
                {pageElements[faseNumberInt - 2]}
              </>
            )
          }
          <Fase1 project={project} />
        </main>
      </UserLayout>
    </>
  )
}

interface Params extends ParsedUrlQuery {
  pid: string
}

export const getStaticProps = async (context) => {
  const { pid } = context.params as Params
  if (pid) {
    const res = await fetch(`${baseURL}projects/${pid}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': `${baseURL}`
      }
    })
    const data = await res.json()

    if (data.status === 'success') {
      return { props: { project: data.data } }
    } else {
      redirect(data, 404, '/')
    }
  }
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

export default ProjectDetailPage
