import { type GetStaticProps } from 'next'

import { MapWrapper } from '@/components/3d/MapWrapper'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const ProjectDetailsFase4 = ({ winner }) => {
  return (
    <>
      <div className={styles.vervolgWrapper}>
        <Title as='h2' size='h2' weight='semibold' className={styles.title}>Winnaar</Title>
        <div className={styles.winnaar}>
          {
            winner &&
            (
              <>
                <Title as='h4' size='h4' weight='regular' className={styles.winnaarTitle}>{winner._id}</Title>
              </>
            )
          }
          {!winner &&
            (
              <>
                <Title as='h4' size='h4' weight='regular' className={styles.winnaarTitle}>De winnaar is nog niet bekend.</Title>
              </>
            )}
          <MapWrapper mapType='minimal' votingProject={winner} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const pid = params?.pid as string
  const url = `${baseURL}creaties/voting/winner/${pid}`
  const creatie = await fetch(url)
    .then(async res => await res.json())
  return {
    props: {
      pid,
      winner: creatie.data
    }
  }
}

export default ProjectDetailsFase4
