import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <p className={styles.title}>
            Navigatie
          </p>
          <Link href='/'>Home</Link>
          <Link href='/'>Projecten</Link>
          <Link href='/'>Events</Link>
        </div>
        <div className={styles.nav}>
          <p className={styles.title}>
            Account
          </p>
          <Link href='/profile'>Profiel</Link>
          <Link href='/profile'>Je Projecten</Link>
          <Link href='/profile/Instellingen'>Instellingen</Link>
        </div>
        <div className={styles.logo}>
          <Image src='/img/logo.svg' alt='Logo' width={216} height={40} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
