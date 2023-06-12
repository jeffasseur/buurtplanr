import * as RadioGroup from '@radix-ui/react-radio-group'
import { cx } from 'class-variance-authority'
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
        <label htmlFor='r1' className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/park.png'
              alt='park'
              fill
              className={cx([styles.image, background === 'park' && styles.border])}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <RadioGroup.Item className={styles.RadioGroupItem} value='park' id='r1'>
              <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
            </RadioGroup.Item>
          </div>
        </label>
        <label htmlFor='r2' className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/street.png'
              alt='street'
              fill
              className={cx([styles.image, background === 'street' && styles.border])}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <RadioGroup.Item className={styles.RadioGroupItem} value='street' id='r2'>
              <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
            </RadioGroup.Item>
          </div>
        </label>
        <label htmlFor='r3' className={styles.background}>
          <div className={styles['image-container']}>
            <Image
              src='/img/square.png'
              alt='square'
              fill
              className={cx([styles.image, background === 'square' && styles.border])}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <RadioGroup.Item className={styles.RadioGroupItem} value='square' id='r3'>
              <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
            </RadioGroup.Item>
          </div>
        </label>
      </RadioGroup.Root>
    </form>
  )
}

export default TypeSelector
