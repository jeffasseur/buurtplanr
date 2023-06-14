import Tooltip from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {}
}
