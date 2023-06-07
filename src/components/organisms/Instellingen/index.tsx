import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'
import Image from 'next/image'

import Button from '@components/atoms/Button'
import Input from '@components/molecule/Input'

import styles from './styles.module.css'

interface instellingenProps {
  profileInfo: {
    username: string
    email: string
    adress: string
    postalcode: string
    housenummer: string
    password: string
    profilePicture: string
  }
  background: 'park' | 'street' | 'square'
}

const instellingen = ({ profileInfo, background }: instellingenProps) => {
  const className = cx([styles.container, styles[background]])

  return (
    <div className={className}>
      <Image src={profileInfo.profilePicture} alt={profileInfo.username} width={250} height={250} className={styles.profile} />
      <div className={styles.subContainer}>
        <Input label='Username' text={profileInfo.username} icon='user' />
        <Input label='Email' text={profileInfo.email} icon='mail' />
        <Input label='Adress' text={profileInfo.adress} icon='location' />
        <Input label='Postalcode' text={profileInfo.postalcode} icon='location' />
        <Input label='Housenummer' text={profileInfo.housenummer} icon='location' />
        <span>Profiel achtergrond</span>
        <div className={styles['background-selector']}>
          <label className={styles.background}>
            <div className={styles['image-container']}>
              <Image src='/img/park.png' alt='park' fill className={styles.image} />
            </div>
            <Checkbox.Root className={styles.CheckboxRoot} defaultChecked={background === 'park'} id='c1'>
              <Checkbox.Indicator className={styles.CheckboxIndicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </label>
          <label className={styles.background}>
            <div className={styles['image-container']}>
              <Image src='/img/street.png' alt='street' fill className={styles.image} />
            </div>
            <Checkbox.Root className={styles.CheckboxRoot} defaultChecked={background === 'street'} id='c2'>
              <Checkbox.Indicator className={styles.CheckboxIndicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </label>
          <label className={styles.background}>
            <div className={styles['image-container']}>
              <Image src='/img/square.png' alt='square' fill className={styles.image} />
            </div>
            <Checkbox.Root className={styles.CheckboxRoot} defaultChecked={background === 'square'} id='c3'>
              <Checkbox.Indicator className={styles.CheckboxIndicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </label>
        </div>
        <Button size='small' append='shield-security'>
          wachtwoord wijzigen
        </Button>
        <Button size='small' theme='Warning'>
          account verwijderen
        </Button>
        <Button size='small' append='save'>
          wijzigigen opslaan
        </Button>
      </div>
    </div>
  )
}

export default instellingen
