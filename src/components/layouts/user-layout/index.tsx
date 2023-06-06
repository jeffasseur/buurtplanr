import Footer from '@/components/molecule/Footer'
import Nav from '@/components/molecule/Navigation'

export const getStaticProps = async () => {

}

const UserLayout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default UserLayout
