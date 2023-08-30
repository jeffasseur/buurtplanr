import Image from 'next/image'

import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const ProjectDetailsFase1 = ({ project }) => {
  return (
    <>
      <div className={styles.faseWrapper}>
        <Title as='h2' size='h2' weight='semibold' className={styles.title}>Informatie</Title>
        {
          project.description &&
          (
            <div className={styles.descriptionContainer}>
              <Title as='h3' size='h3' weight='medium' className={styles.descriptionTitle}>Beschrijving</Title>
              <p className={styles.descriptionText}>
                {project.description}
              </p>
            </div>
          )
        }
        {
          (project.informatie && project.projectData.file === null) &&
          (
            <div className={styles.descriptionContainer}>
              <Title as='h3' size='h3' weight='medium' className={styles.descriptionTitle}>Extra informatie</Title>
              <p className={styles.descriptionText}>
                {project.informatie}
              </p>
            </div>
          )
        }
        {
          (project.informatie && project.projectData.file !== null) &&
          (
            <div className={styles.descriptionImageContainer}>
              <div className={styles.descriptionContainer}>
                <Title as='h3' size='h3' weight='medium' className={styles.descriptionTitle}>Extra informatie</Title>
                <p className={styles.descriptionText}>
                  {project.informatie}
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image src={project.projectData.file} alt='project' fill className={styles.image} />
              </div>

            </div>
          )
        }
        {
          (project.projectData.link !== null || project.projectData.link !== '') &&
          (
            <div className={styles.link}>
              <iframe src={project.projectData.link} className={styles.iframe} />
            </div>
          )
        }
      </div>
    </>
  )
}

export default ProjectDetailsFase1
