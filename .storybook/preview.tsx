import StyleProvider from './StyleProvider'
import '../src/assets/styles/main.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  nextjs: {
    appDirectory: true
  }
}

export const decorators = [
  (Story) => (
    <StyleProvider>
      <Story />
    </StyleProvider>
  )
]
