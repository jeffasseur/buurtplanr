import '@/assets/styles/main.css'

import ReduxProvider from '@/redux/provider'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  )
}

export default App
