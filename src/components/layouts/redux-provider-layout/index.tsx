import ReduxProvider from '@/redux/provider'

const ReduxProviderLayout = ({ children }) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}

export default ReduxProviderLayout
