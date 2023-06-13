import Input from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  component: Input
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    type: 'text',
    value: '',
    onChange: () => {},
    min: '',
    name: '',
    id: ''
  }
}
