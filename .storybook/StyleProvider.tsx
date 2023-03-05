import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--next-font-sans'
})

interface StyleProviderProps {
  children: React.ReactNode
}

const StyleProvider = ({children}: StyleProviderProps) => {
  return (
    <div className={inter.variable}>{children}</div>
  )
}

export default StyleProvider
