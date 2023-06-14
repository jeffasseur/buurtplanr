import styles from '@/assets/styles/pages/404.module.css'
import Button from '@/components/atoms/Button'
import UserLayout from '@/components/layouts/user-layout'
import Title from '@components/atoms/Title'

const Custom404 = () => {
  return (
    <>
      <UserLayout>
        <div className={styles.errorContainer}>
          <Title as='h1' size='h3' weight='light'>404 - Het lijkt er op dat er iets is misgelopen</Title>
          <div className={styles.logoContainer}>
            <Button as='link' size='large' prepend='home' theme='Primary' href='/'>Go back home</Button>
          </div>
        </div>
      </UserLayout>
    </>
  )
}

export default Custom404
