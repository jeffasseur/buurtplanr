import Footer from '@/components/molecule/Footer'
import Nav from '@/components/molecule/Navigation'

// const baseURL: string = 'http://127.0.0.1:3002/'
// if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
//   baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
// }

// export const fetchUser = async (token: string) => {
//   const res = await fetch(`${baseURL}burgers/id`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': `${baseURL}`,
//       Authorization: `Bearer ${token}`
//     }
//   })
//   const data = await res.json()
//   if (data.status === 'success') {
//     return data.data
//   } else {
//     window.location.href = '/login'
//   }
// }

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
