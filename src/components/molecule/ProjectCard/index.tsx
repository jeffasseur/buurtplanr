import Image from 'next/image'

import Button from '@/components/atoms/Button'
import { type projectData } from '@/types/BUURTTYPES'
import { useUser } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

interface ProjectProps {
  project: projectData | undefined
}

const ProjectCard = ({ project }: ProjectProps) => {
  const userID = useUser(state => state.userID)

  return (
    <>
      {project &&
        <div className={styles.cardContainer}>
          <div className={styles.cardImg}>
            {
              (project.projectData.type === 'Park' || project.projectData.type === 'park') &&
              (
                <Image src='/img/types/PARK.png' alt='type park' className={styles.imageBorderRadius} fill />
              )
            }
            {
              (project.projectData.type === 'Straat' || project.projectData.type === 'straat') &&
              (
                <Image src='/img/types/STREET.png' alt='type straat' className={styles.imageBorderRadius} fill />
              )
            }
            {
              (project.projectData.type === 'Dorp' || project.projectData.type === 'dorp') &&
              (
                <Image src='/img/types/TOWN.png' alt='type dorp' className={styles.imageBorderRadius} fill />
              )
            }
            {project.fase === 'Fase 2: Cocreatie' && (<div className={`${styles.faseBoundNotice} ${styles.faseBoundNotice__green}`}><p>breng je idee in beeld</p></div>)}
            {project.fase === 'Fase 3: Stemmen' && (<div className={`${styles.faseBoundNotice} ${styles.faseBoundNotice__blue}`}><p>stem op het beste idee</p></div>)}
          </div>
          <div className={styles.cardHeader}>
            <h3>{project.title}</h3>
            <div className={styles.subCardHeader}>
              <p className={styles.date}>23.04.2023</p>
              <p className={styles.fase}>{project.fase}</p>
            </div>
          </div>
          <div className={styles.cardDescription}>
            <p>{project.description}</p>
          </div>
          <div className={styles.btnContainer}>
            {userID && (
              <>
                <Button as='link' theme='Secondary' append='arrow-right' size='small' href={`/project/${project._id}`}>
                  <span>Meer lezen</span>
                </Button>
                {
                  project.fase === 'Fase 2: Cocreatie' &&
                  (
                    <Button as='link' size='small' append='builder' href={`/builder/${project._id}/${userID}`}>
                      <span>Deelnemen</span>
                    </Button>
                  )
                }
                {
                  project.fase === 'Fase 3: Stemmen' &&
                  (
                    <Button as='link' size='small' append='medal-star' href={`/builder/${project._id}/${userID}`}>
                      <span>Deelnemen</span>
                    </Button>
                  )
                }
              </>
            )}
          </div>
        </div>}
    </>
  )
}

export default ProjectCard
