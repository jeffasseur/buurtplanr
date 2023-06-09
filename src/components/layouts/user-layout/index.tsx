import { useSession } from 'next-auth/client'

import Footer from '@/components/molecule/Footer'
import Nav from '@/components/molecule/Navigation'

const UserLayout = ({ children }) => {
  const [session, loading] = useSession()
  return (
    <>
      {
        loading && <div>Loading...</div>
      }
      <Nav burger={session.burger} />
      {children}
      <Footer />
    </>
  )
}

export default UserLayout
