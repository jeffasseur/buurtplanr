import ReduxProviderLayout from '../redux-provider-layout'

const AuthLayout = ({ children }) => {
  return (
    <ReduxProviderLayout>
      {children}
    </ReduxProviderLayout>
  )
}

export default AuthLayout
