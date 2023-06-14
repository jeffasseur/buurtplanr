import AdminLayout from '@/components/layouts/admin-layout'
import AdminSettings from '@/components/organisms/Admin/AdminSettings'

// import styles from './styles.module.css'

const AdminSettingsPage = ({ buurtplanr }) => {
  return (
    <AdminLayout>
      <AdminSettings buurtplanr={buurtplanr} />
    </AdminLayout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://127.0.0.1:3002/buurtplanr/')
  const data = await res.json()
  const buurtplanr = data.data
  return {
    props: {
      buurtplanr
    }
  }
}

export default AdminSettingsPage
