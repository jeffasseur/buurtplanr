import * as RadioGroup from '@radix-ui/react-radio-group'
import Image from 'next/image'

import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

interface CreatieSelectorProps {
  creaties: any[]
  creatie?: string
  onChange?: (creatie: string) => void
}

const CreatieSelector = ({ creaties, creatie, onChange }: CreatieSelectorProps) => {
  return (
    <form>
      <RadioGroup.Root
        className={styles.RadioGroupRoot}
        value={creatie ?? undefined}
        onValueChange={onChange}
        aria-label='View density'
      >
        {creaties.map((creatieItem, index) => {
          return (
            <label htmlFor={`r${index}`} key={index} className={styles.background}>
              <div className={styles['image-container']}>
                <Image
                  src='/img/straat.png'
                  alt='street'
                  fill
                  className={styles.image}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <RadioGroup.Item className={styles.RadioGroupItem} value={creatieItem._id} id={`r${index}`}>
                  <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                </RadioGroup.Item>
              </div>
              <Title as='h3' size='h3' weight='semibold'>Creatie #{index}</Title>
            </label>
          )
        })}
      </RadioGroup.Root>
    </form>
  )
}

export default CreatieSelector
