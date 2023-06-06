import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'
import { useNewProjectForm } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

const objects = [
  {
    id: 0,
    value: 'Bank',
    path: '/img/productThumbnails/bench-simple.webp',
    checked: false,
    weight: 10,
    projectID: 1,
    objectPath: ''
  },
  {
    id: 1,
    value: 'Laadpaal Auto',
    path: '/img/productThumbnails/car-charge.webp',
    checked: false,
    weight: 10
  },
  {
    id: 2,
    value: 'Fontijn',
    path: '/img/productThumbnails/fountain.webp',
    checked: false,
    weight: 10
  },
  {
    id: 3,
    value: 'Tuin Lantaarn',
    path: '/img/productThumbnails/garden-light.webp',
    checked: false,
    weight: 10
  },
  {
    id: 4,
    value: 'Gras',
    path: '/img/productThumbnails/grass.webp',
    checked: false,
    weight: 10
  },
  {
    id: 5,
    value: 'Gravel',
    path: '/img/productThumbnails/gravel.webp',
    checked: false,
    weight: 10
  }
]

const Cocreation = ({ FormData, setFormData, updateFormStage }) => {
  const bindFormData = useNewProjectForm((state) => state.bindFormData)
  return (
    <div className={styles.cocreationContainer}>
      <fieldset className={styles.cocreation}>
        <Title size='h3' weight='semibold'>Cocreatie</Title>
        <Button as='link' href='/admin/projects/create/location' size='small' append='builder'>Cocreatie configureren</Button>
      </fieldset>
      <fieldset className={styles.buildingpieces}>
        <Title size='h3' weight='semibold'>Bouwstukken</Title>
        <p>Kies welke bouwstukken de gebruikers mee mogen werken</p>
        <div className={styles.objectContainer}>
          {
            objects.map((object, index) => (
              <label htmlFor='object' className={styles.buildingPiece} key={index}>
                <Image src={object.path} alt={object.value} width={120} height={120} />
                <Checkbox.Root className='CheckboxRoot' defaultChecked id='c1'>
                  <Checkbox.Indicator className='CheckboxIndicator'>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                {/* <Input type='checkbox' name='object' id={object.value} /> */}
              </label>
            ))
          }
        </div>
      </fieldset>
      <fieldset className={styles.checkedBuildingPieces}>
        <Title size='h3' weight='semibold'>Vereisten</Title>
        <p>Kies hier de hoeveelheid bouwstukken dat u wilt dat minstens aanwezig  moet zijn in de creaties</p>
        <div>
          <div className={styles.checkedBuildingPiecesContainer}>
            {
              objects.map((object, index) => (
                <label key={index} className={styles.checkedBuildingPiece}>
                  <div className={styles.imgContainer}>
                    <Image src={object.path} alt='bouwstuk' width={120} height={120} />
                  </div>
                  <Input type='number' Size='small' placeholder='0' />
                </label>
              ))
            }
          </div>
        </div>
      </fieldset>
      <div className={styles.footer}>
        <Button
          as='button'
          size='small'
          prepend='arrow-left'
          theme='Primary'
          onClick={() => {
            updateFormStage(0)
          }}
        >vorige stap
        </Button>
        <Button
          as='button'
          size='small'
          append='arrow-right'
          theme='Primary'
          onClick={() => {
            bindFormData()
            updateFormStage(2)
          }}
        >volgende stap
        </Button>
      </div>
    </div>
  )
}

export default Cocreation
