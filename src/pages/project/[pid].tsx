import Router from 'next/router'

import Button from '@components/atoms/Button'
import Title from '@components/atoms/Title'
import UserLayout from '@components/layouts/user-layout'
import Tracker from '@components/molecule/ProjectDetailsTracker'
import Fase1 from '@components/organisms/ProjectDetails/Fase1'

import styles from './styles.module.css'

const ProjectDetailPage = () => {
  return (
    <>
      <UserLayout>
        <header className={styles.header}>
          <Button
            as='link'
            href='#GoBack'
            onClick={(e) => {
              // e.preventDefault()
              Router.back()
              // window.history.back()
            }}
            prepend='arrow-left'
            theme='Transparent'
            size='small'
            className={styles.goBack}
          >Terug
          </Button>
          <Title as='h1' size='h1' weight='semibold'>Project detail title</Title>
          <Tracker step={0} />
        </header>
        <main className={styles.main}>
          <Fase1 />
        </main>
      </UserLayout>
    </>
  )
}

export default ProjectDetailPage
