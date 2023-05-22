import styles from '@/assets/styles/pages/404.module.css'
import Icon from '@components/atoms/Icon'
import Navigation from '@components/molecule/Navigation'

export default function Custom404 () {
  return (
    <>
      <Navigation />
      <div className={styles.errorContainer}>
        <h1>404 - Page Not Found</h1>
        <div className={styles.logoContainer}>
          <Icon name='logo' className={styles.logo} />
        </div>
      </div>
    </>
  )
}
