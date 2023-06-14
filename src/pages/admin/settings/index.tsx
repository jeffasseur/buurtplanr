import AdminLayout from '@/components/layouts/admin-layout'
import AdminSettings from '@/components/organisms/Admin/AdminSettings'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const AdminSettingsPage = ({ buurtplanr }) => {
  return (
    <AdminLayout>
      <AdminSettings buurtplanr={buurtplanr} />
    </AdminLayout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${baseURL}buurtplanr/`)
  const data = await res.json()
  const buurtplanr = data.data
  return {
    props: {
      buurtplanr
    }
  }
}

export default AdminSettingsPage
