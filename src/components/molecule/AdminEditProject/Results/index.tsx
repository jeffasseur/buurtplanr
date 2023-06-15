import useSWR from 'swr'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const AdminEditProjectResults = ({ project }) => {
  const projectID: string = project._id
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': `${baseURL}`
      }
    })
    return await res.json()
  }
  const { isLoading, data, error } = useSWR(`${baseURL}creaties/${projectID}`, fetcher)
  return (
    <div className={styles.resultsContainer}>
      <fieldset className={styles.results}>
        <Title size='h3' weight='semibold'>Resultaten</Title>
        <p>Bekijk de huidige resultaten en filter de ongewenste creaties uit de resultaten</p>
        <div className={styles.btnContainer}>
          <Button as='button' size='medium' theme='Warning'>Filter</Button>
          <Button as='button' size='medium' theme='Primary' disabled>Opslaan</Button>
        </div>
      </fieldset>
      <fieldset className={styles.creatiesWrapper}>
        {
          data?.status !== 'success' &&
          (
            <p>
              Er zijn geen creaties voor dit project
            </p>
          )
        }
        {
          data?.data &&
          (
            data.data.map((creatie, index) => (
              <div className={styles.creatie} key={index}>
                <div className={styles.creatieInfo}>
                  <p className={styles.creatieName}># {index}</p>
                </div>
                <div className={styles.creatieButtons}>
                  <Button as='button' size='small' theme='Warning' onClick={(e) => { console.log(creatie.id) }}>Verwijderen</Button>
                </div>
              </div>
            ))
          )
        }
        {
          isLoading && <p>Loading...</p>
        }
        {
          error && <p>Er is iets misgegaan met het ophalen van de creaties</p>
        }
      </fieldset>
    </div>
  )
}

export default AdminEditProjectResults
