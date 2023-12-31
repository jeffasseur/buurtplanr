import { type GetStaticProps } from 'next'
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

const ProjectVotingPage = ({ pid, creaties }) => {
  const [displayedComponent, setDisplayedComponent] = useState('Start')
  const handleComponentChange = (component: string) => { setDisplayedComponent(component) }
  const projectId: string = pid

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

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const pid = params?.pid as string
  const creaties = await fetch(`${baseURL}creaties/voting/${pid}`).then(async res => await res.json()).then((data) => { return data })
  return {
    props: {
      pid,
      creaties: creaties.data
    }
  }
}

export default ProjectVotingPage
