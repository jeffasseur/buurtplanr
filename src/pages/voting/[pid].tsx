import { type ParsedUrlQuery } from 'querystring'

import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import UserLayout from '@/components/layouts/user-layout'
import VotingEnd from '@/components/molecule/Voting/End'
import VotingSelection from '@/components/molecule/Voting/Selection'
import VotingStart from '@/components/molecule/Voting/Start'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const ProjectVotingPage = ({ creaties }) => {
  const creatiesCheck = () => {
    if (!creaties) {
      window.location.href = '/404'
    }
  }
  creatiesCheck()
  const [displayedComponent, setDisplayedComponent] = useState('Start')
  const handleComponentChange = (component: string) => { setDisplayedComponent(component) }
  const projectId: string = creaties[0].project._id

  return (
    <>
      <UserLayout>
        <header className={styles.header}>
          {
            (creaties[0].project.projectData.type === 'Park' || creaties[0].project.projectData.type === 'park') &&
            (
              <Image src='/img/types/PARK.png' alt='type park' fill className={styles.bgImage} />
            )
          }
          {
            (creaties[0].project.projectData.type === 'Straat' || creaties[0].project.projectData.type === 'straat') &&
            (
              <Image src='/img/types/STREET.png' alt='type straat' fill className={styles.bgImage} />
            )
          }
          {
            (creaties[0].project.projectData.type === 'Dorp' || creaties[0].project.projectData.type === 'dorp') &&
            (
              <Image src='/img/types/TOWN.png' alt='type dorp' fill className={styles.bgImage} />
            )
          }
          <Button
            as='link'
            href={`/project/${projectId}`}
            prepend='arrow-left'
            theme='Transparent'
            size='small'
            className={styles.goBack}
          >Terug
          </Button>
          <Title as='h1' size='h1' weight='medium' className={styles.title}>{creaties[0].project.title}</Title>
        </header>
        <main className={styles.main}>
          {
            displayedComponent === 'Start' && (
              <VotingStart handleComponentChange={handleComponentChange} />
            )
          }
          {
            displayedComponent === 'Selection' && (
              <VotingSelection creaties={creaties} creatie='' handleComponentChange={handleComponentChange} />
            )
          }
          {
            displayedComponent === 'End' && (
              <VotingEnd />
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
  const res = await fetch(`${baseURL}projects/voting`)
  const data = await res.json()
  // Geef nog in de body mee dat hem projecten gaat die Fase 3 zijn, anders haalt die projecten op waar nog geen creaties aan zijn gekoppeld
  // Pas backend nog aan zodat als er een req.body.fase is dat die daar mee op filtert
  if (data.data.length > 0) {
    const paths: object = data.data.map(project => {
      return {
        params: {
          pid: project._id
        }
      }
    })

    return {
      paths,
      fallback: true
    }
  }
}

export const getStaticProps = async (context) => {
  const { pid } = context.params as Params
  const res = await fetch(`${baseURL}creaties/voting/${pid}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${baseURL}`
    }
  })
  const data = await res.json()
  if (data.status === 'success') {
    if (data.data.length === 0) {
      return false
    }
    const creaties: any[] = data.data
    return { props: { creaties } }
  } else if (data.status === 'error' || data.status !== 'success') {
    return false
  }
}

export default ProjectVotingPage
