import * as RadioGroup from '@radix-ui/react-radio-group'
import Image from 'next/image'
import { useState } from 'react'

import Title from '@/components/atoms/Title'
import { type project } from '@/types/BUURTTYPES'
import { MapWrapper } from '@components/3d/MapWrapper'
import Icon from '@components/atoms/Icon'

import styles from './styles.module.css'

interface CreatieSelectorProps {
  creaties: any[]
  creatie?: string
  onChange?: (creatie: string) => void
}

const CreatieSelector = ({ creaties, creatie, onChange }: CreatieSelectorProps) => {
  const [peakView, setPeakView] = useState<project | undefined>(undefined)

  return (
    <>
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
                  <div onClick={() => { setPeakView(creatieItem) }} className={styles.viewIcon}><Icon name='eye' /></div>
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
      {peakView && (
        <div className={styles.peakContainer}>
          <div className={styles.peak_backface} />
          <div className={styles.peak_overlay}> <MapWrapper mapType='minimal' votingProject={peakView} /> </div>
          <div className={styles.peak_close} onClick={() => { setPeakView(undefined) }}><Icon name='close-circle' /></div>
        </div>
      )}
    </>
  )
}

export default CreatieSelector
