import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'
import WebpIcon from '@/components/atoms/webpIcons'
import productList from '@/helpers/ProductList.json'
import { useNewProjectForm } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

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
            productList.list.map((object, index) => (
              <label htmlFor='object' className={styles.buildingPiece} key={index}>
                <WebpIcon name={object.name} />
                <Checkbox.Root className={styles.CheckboxRoot} defaultChecked id='c1'>
                  <Checkbox.Indicator className={styles.CheckboxIndicator}>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
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
              productList.list.map((object, index) => (
                <label key={index} className={styles.checkedBuildingPiece}>
                  <div className={styles.imgContainer}>
                    <WebpIcon name={object.name} />
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
