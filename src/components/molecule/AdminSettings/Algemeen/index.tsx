import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const submitBuurtplanr = async (data) => {
  const dataString = JSON.stringify(data)
  const response = await fetch(`${baseURL}/buurtplanr/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${baseURL}`,
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: dataString
  })
  const responseData = await response.json()
  return responseData
}

const Algemeen = ({ buurtplanr }) => {
  const [FormData, setFormData] = useState({
    name: buurtplanr.name,
    link: buurtplanr.link,
    logo: buurtplanr.logo
  })
  return (
    <div className={styles.algemeenContainer}>
      <Title size='h2' weight='semibold'>Algemene instellingen</Title>
      <form action='#' method='POST'>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Naam van stad, gemeente of organisatie</label>
          <Input
            value={FormData.name}
            type='text'
            Size='medium'
            placeholder='Buurtplanr'
            onChange={(e) => { setFormData({ ...FormData, name: e.target.value }) }}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Link naar website van uw stad, gemeente of dorp</label>
          <Input
            value={FormData.link}
            type='text'
            Size='medium'
            placeholder='https://buurtplanr.com'
            onChange={(e) => { setFormData({ ...FormData, link: e.target.value }) }}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Logo uploaden</label>
          <Input type='file' Size='medium' accept='image/*' />
        </fieldset>
        <Button
          as='button'
          theme='Primary'
          size='small'
          onClick={() => { void submitBuurtplanr(FormData) }}
        >Opslaan
        </Button>
      </form>
    </div>
  )
}

export default Algemeen
