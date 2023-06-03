import AdminLayout from '@/components/layouts/admin-layout'
import AdminUsers from '@components/organisms/Admin/AdminUsers'

// import styles from './styles.module.css'

const AdminUsersDashboard = () => {
  return (
    <>
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    </>
  )
}
export default AdminUsersDashboard
