import * as RadioGroup from '@radix-ui/react-radio-group'
import Image from 'next/image'

import styles from './styles.module.css'

interface TypeSelectorProps {
  background?: 'park' | 'street' | 'square'
  onChange?: (background: 'park' | 'street' | 'square') => void
}

const TypeSelector = ({ background, onChange }: TypeSelectorProps) => {
  return (
    <form>
      <RadioGroup.Root
        className={styles.RadioGroupRoot}
        value={background ?? undefined}
        onValueChange={onChange}
        aria-label='View density'
      >
        <label className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/park.png'
              alt='park'
              fill
              className={styles.image}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <RadioGroup.Item className={styles.RadioGroupItem} value='park' id='r1'>
            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
          </RadioGroup.Item>
        </label>
        <label className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/street.png'
              alt='street'
              fill
              className={styles.image}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <RadioGroup.Item className={styles.RadioGroupItem} value='street' id='r1'>
            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
          </RadioGroup.Item>
        </label>
        <label className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/square.png'
              alt='square'
              fill
              className={styles.image}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <RadioGroup.Item className={styles.RadioGroupItem} value='square' id='r1'>
            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
          </RadioGroup.Item>
        </label>
      </RadioGroup.Root>
    </form>
  )
}

export default TypeSelector
