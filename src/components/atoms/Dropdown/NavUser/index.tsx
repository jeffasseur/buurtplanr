import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Button from '@/components/atoms/Button'

import styles from './styles.module.css'

const admin: boolean = false

const DropdownNavUser = () => {
  const [display, setDisplay] = useState('none')
  const [active, setActive] = useState('var(--color-grey-100)')
  const [color, setColor] = useState('var(--color-black)')
  const toggleDropdown = () => {
    if (display === 'none') {
      setDisplay('flex')
      setActive('var(--color-blue-500)')
      setColor('var(--color-white)')
    } else if (display === 'flex') {
      setDisplay('none')
      setActive('var(--color-grey-100)')
      setColor('var(--color-black)')
    }
  }
  return (
    <div className={styles.dropdownWrapper}>
      <Button id='Dropdown' append='chevron-down' size='small' className={styles.button} style={{ background: active, color }} onClick={toggleDropdown}>
        <div className={styles.buttonInfo}>
          <Image src='/img/productThumbnails/donut.webp' alt='profielfoto' width={24} height={24} />
          Username
        </div>
      </Button>
      <div id='Dropdown' className={styles.dropdownMenu} style={{ display }}>
        <Link href='/' className={styles.mobile}>Home</Link>
        {
          admin &&
          (
            <Link href='/admin'>Admin</Link>
          )
        }
        <Link href='/profile'>Profiel</Link>
        <Link href='/profile' className={styles.mobile}>Meldingen</Link>
        <Link href='/profile'>Projecten</Link>
        <Link href='/profile'>Instellingen</Link>
        <Link href='/'>Afmelden</Link>
      </div>
    </div>
  )
}

export default DropdownNavUser
