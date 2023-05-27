import Image from 'next/image'

import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Setup = ({ createFormData, setCreateFormData }) => {
  return (
    <div className={styles.setupContainer}>
      <fieldset className={styles.name}>
        <Title size='h3' weight='semibold'>Projectnaam</Title>
        <Input
          type='text'
          Size='large'
          placeholder='Projectnaam'
          value={createFormData.title}
          onChange={(event) => setCreateFormData({ ...createFormData, title: event.target.value })}
        />
      </fieldset>
      <fieldset className={styles.date}>
        <Title size='h3' weight='semibold'>Datums</Title>
        <div className={styles.publishDate}>
          <label>Publiceer datum</label>
          <Input
            type='date'
            Size='small'
            value={createFormData.dateOfPublish}
            onChange={
              (event) => setCreateFormData({ ...createFormData, dateOfPublish: event.target.value })
            }
          />
        </div>
        <div className={styles.cocreationDate}>
          <div className={styles.cocreationDateStart}>
            <label>Startdatum: Cocreatie</label>
            <Input
              type='date'
              Size='small'
              value={createFormData.dateOfStartCocreation}
              onChange={
                (event) => setCreateFormData({ ...createFormData, dateOfStartCocreation: event.target.value })
              }
            />
          </div>
          <div className={styles.cocreationDateEnd}>
            <label>Einddatum: Cocreatie</label>
            <Input
              type='date'
              Size='small'
              value={createFormData.dateOfEndCocreation}
              onChange={
                (event) => setCreateFormData({ ...createFormData, dateOfEndCocreation: event.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.voteDate}>
          <div className={styles.voteDateStart}>
            <label>Startdatum: Stemmen</label>
            <Input
              type='date'
              Size='small'
              value={createFormData.dateOfStartVote}
              onChange={
                (event) => setCreateFormData({ ...createFormData, dateOfStartVote: event.target.value })
              }
            />
          </div>
          <div className={styles.voteDateEnd}>
            <label>Einddatum: Stemmen</label>
            <Input
              type='date'
              Size='small'
              value={createFormData.dateOfEndVote}
              onChange={
                (event) => setCreateFormData({ ...createFormData, dateOfEndVote: event.target.value })
              }
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Budget</Title>
        <Input
          type='number'
          Size='large'
          placeholder='0'
          value={createFormData.budget}
          onChange={
            (event) => setCreateFormData({ ...createFormData, budget: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <Input
          type='text'
          Size='large'
          placeholder='text editor...'
          value={createFormData.description}
          onChange={
            (event) => setCreateFormData({ ...createFormData, description: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Type</Title>
        <div className={styles.typesContainer}>
          <div>
            <label className={styles.typePlein}>
              <span>Plein</span>
              <Image src='/img/donut.webp' alt='type plein' width={250} height={220} />
              <input type='radio' name='type' id='plein' value='plein' />
            </label>
          </div>
          <div>
            <label className={styles.typePark}>
              <span>Park</span>
              <Image src='/img/donut.webp' alt='type park' width={250} height={220} />
              <input type='radio' name='type' id='park' value='park' />
            </label>
          </div>
          <div>
            <label className={styles.typeStraat}>
              <span>Straat</span>
              <Image src='/img/donut.webp' alt='type straat' width={250} height={220} />
              <input type='radio' name='type' id='straat' value='straat' />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Informatie</Title>
        <Input
          type='text'
          Size='large'
          placeholder='text editor...'
          value={createFormData.info}
          onChange={
            (event) => setCreateFormData({ ...createFormData, info: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Document/ Afbeelding</Title>
        <Input type='file' Size='small' />
      </fieldset>
    </div>
  )
}

export default Setup
