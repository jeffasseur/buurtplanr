import { type GetStaticProps } from 'next'
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
  const pageElements = [<Fase2 key={2} project={project} />, <Fase3 key={3} project={project} />, <Fase4 key={4} winner={null} />]

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
            as='button'
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

export default ProjectDetailPage
