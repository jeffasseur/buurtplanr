import Map from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Map> = {
  component: Map
}

export default meta
type Story = StoryObj<typeof Map>

export const Default: Story = {
  args: {}
}
