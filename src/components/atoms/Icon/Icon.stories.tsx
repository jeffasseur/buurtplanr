import Icon from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Icon> = {
  component: Icon
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'chevron-down',
    className: ''
  }
}
