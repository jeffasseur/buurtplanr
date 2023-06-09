import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Setup = ({ FormData, setFormData }) => {
  return (
    <div className={styles.setupContainer}>
      <fieldset className={styles.name}>
        <Title size='h3' weight='semibold'>Projectnaam</Title>
        <Input
          type='text'
          Size='large'
          placeholder='Projectnaam'
          autoFocus
          required
          value={FormData.title}
          onChange={(event) => setFormData({ ...FormData, title: event.target.value })}
        />
      </fieldset>
      <fieldset className={styles.date}>
        <Title size='h3' weight='semibold'>Datums</Title>
        <div className={styles.publishDate}>
          <Title size='h4' weight='regular'>Publiceer datum</Title>
          <Input
            type='date'
            Size='small'
            placeholder='dd-mm-yyyy'
            min='2023-05-30'
            value={FormData.dateOfPublication}
            onChange={
              (event) => setFormData({ ...FormData, dateOfPublication: event.target.value })
            }
          />
        </div>
        <div className={styles.cocreationDate}>
          <div className={styles.cocreationDateStart}>
            <Title size='h4' weight='regular'>Startdatum: Cocreatie</Title>
            <Input
              type='date'
              Size='small'
              placeholder='dd-mm-yyyy'
              min='2023-05-30'
              value={FormData.dateOfStartCocreation}
              onChange={
                (event) => setFormData({ ...FormData, dateOfStartCocreation: event.target.value })
              }
            />
          </div>
          <div className={styles.cocreationDateEnd}>
            <Title size='h4' weight='regular'>Einddatum: Cocreatie</Title>
            <Input
              type='date'
              Size='small'
              placeholder='dd-mm-yyyy'
              min='2023-05-30'
              value={FormData.dateOfEndCocreatio}
              onChange={
                (event) => setFormData({ ...FormData, dateOfEndCocreation: event.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.voteDate}>
          <div className={styles.voteDateStart}>
            <Title size='h4' weight='regular'>Startdatum: Stemmen</Title>
            <Input
              type='date'
              Size='small'
              placeholder='dd-mm-yyyy'
              min='2023-05-30'
              value={FormData.dateOfStartVote}
              onChange={
                (event) => setFormData({ ...FormData, dateOfStartVote: event.target.value })
              }
            />
          </div>
          <div className={styles.voteDateEnd}>
            <Title size='h4' weight='regular'>Einddatum: Stemmen</Title>
            <Input
              type='date'
              Size='small'
              placeholder='dd-mm-yyyy'
              min='2023-05-30'
              value={FormData.dateOfEndVote}
              onChange={
                (event) => setFormData({ ...FormData, dateOfEndVote: event.target.value })
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
          value={FormData.budget}
          onChange={
            (event) => setFormData({ ...FormData, budget: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <Input
          type='text'
          Size='large'
          placeholder='text editor...'
          value={FormData.description}
          onChange={
            (event) => setFormData({ ...FormData, description: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Type</Title>
        <div className={styles.typesContainer}>
          <div>
            <label className={styles.typePlein}>
              <span>Plein</span>
              <div className={styles.imgContainer}>
                <Image src='/img/types/TOWN.png' alt='type dorp' fill />
              </div>
              <input type='radio' name='type' id='dorp' value='dorp' />
              <Checkbox.Root className={styles.CheckboxRoot} id='c1'>
                <Checkbox.Indicator className={styles.CheckboxIndicator}>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </label>
          </div>
          <div>
            <label className={styles.typePark}>
              <span>Park</span>
              <div className={styles.imgContainer}>
                <Image src='/img/types/PARK.png' alt='type park' fill />
              </div>
              <input type='radio' name='type' id='park' value='park' />
              <Checkbox.Root className={styles.CheckboxRoot} id='c1'>
                <Checkbox.Indicator className={styles.CheckboxIndicator}>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </label>
          </div>
          <div>
            <label className={styles.typeStraat}>
              <span>Straat</span>
              <div className={styles.imgContainer}>
                <Image src='/img/types/STREET.png' alt='type straat' fill />
              </div>
              <input type='radio' name='type' id='straat' value='straat' />
              <Checkbox.Root className={styles.CheckboxRoot} id='c1'>
                <Checkbox.Indicator className={styles.CheckboxIndicator}>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </label>
          </div>
        </div>
      </fieldset>
      <div className={styles.info}>
        <Title size='h3' weight='semibold'>Informatie</Title>
      </div>
      <fieldset>
        <Title size='h4' weight='regular'>Infotekst</Title>
        <Input
          type='text'
          Size='large'
          placeholder='text editor...'
          value={FormData.information}
          onChange={
            (event) => setFormData({ ...FormData, informatie: event.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <Title size='h4' weight='regular'>Document/ Afbeelding</Title>
        <Input
          type='file'
          Size='small'
          onChange={
            (event) => {
              setFormData({ ...FormData, document: event.target.files[0] })
            }
          }
        />
      </fieldset>
    </div>
  )
}

export default Setup
