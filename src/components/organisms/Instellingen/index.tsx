import { cx } from 'class-variance-authority'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@components/atoms/Button'
import Input from '@components/molecule/Input'
import TypeSelector from '@components/molecule/TypeSelector'

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

const Instellingen = ({ profileInfo, background }: instellingenProps) => {
  const [backgroundState, setBackgroundState] = useState(background)
  const className = cx([styles.container, styles[backgroundState]])

  const handleBackgroundChange = (background: 'park' | 'street' | 'square') => {
    setBackgroundState(background)
  }

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
        <TypeSelector background={backgroundState} onChange={handleBackgroundChange} />
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

export default Instellingen
