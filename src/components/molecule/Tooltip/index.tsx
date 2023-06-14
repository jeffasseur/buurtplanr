import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import WebpIcon from '@components/atoms/webpIcons'

import styles from './styles.module.css'

const Tooltip = () => {
  const [isFirstContent, setIsFirstContent] = useState(true)

  useEffect(() => {
    const toggleContent = () => {
      setIsFirstContent(prevValue => !prevValue)
    }

    const interval = setInterval(toggleContent, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={styles.container}>
      {isFirstContent
        ? (
          <div className={styles.shift}>
            klik op een <WebpIcon name='boom-standaard' className={styles.webp} /> en vervlogens op een plaats op de kaart om een nieuw bouwstuk te plaatsen
          </div>
          )
        : (
          <div className={styles.shift}>
            houd <Image src='/img/shift.png' alt='shift' width={52} height={28} /> + linker muis knop ingedrukt om je camera te draaien
          </div>
          )}
    </div>
  )
}

export default Tooltip
