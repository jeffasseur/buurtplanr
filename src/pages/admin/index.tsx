import AdminLayout from '@components/layouts/admin-layout'
import AdminProjects from '@components/organisms/Admin/AdminProjects'

// import styles from './styles.module.css'

const AdminDashboard = () => {
  return (
    <>
      <AdminLayout>
        <AdminProjects />
      </AdminLayout>
    </>
  )
}
export default AdminDashboard
