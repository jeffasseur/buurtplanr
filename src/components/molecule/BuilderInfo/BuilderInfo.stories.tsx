import BuilderInfo from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BuilderInfo> = {
  component: BuilderInfo
}

export default meta
type Story = StoryObj<typeof BuilderInfo>

export const Default: Story = {
  args: {}
}
