import Button from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'A button',
    append: 'trash',
    theme: 'Primary'
  }
}

export const IconLeft: Story = {
  args: {
    children: 'A button',
    prepend: 'trash',
    theme: 'Primary'
  }
}

export const IconRight: Story = {
  args: {
    children: 'A button',
    append: 'trash',
    theme: 'Primary'
  }
}

export const Link: Story = {
  args: {
    children: 'A link',
    as: 'link',
    href: '#'
  }
}

export const ExternalLink: Story = {
  args: {
    children: 'An external link',
    as: 'externalLink',
    href: '#'
  }
}

export const Disabled: Story = {
  args: {
    children: 'A disabled button',
    disabled: true
  }
}

export const Primary: Story = {
  args: {
    children: 'A primary button',
    theme: 'Primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'A secondary button',
    theme: 'Secondary'
  }
}

export const Tertiary: Story = {
  args: {
    children: 'A tertiary button',
    theme: 'Tertiary'
  }
}

export const Warning: Story = {

  args: {
    children: 'A warning button',
    theme: 'Warning'
  }
}

export const Large: Story = {
  args: {
    children: 'A large button',
    size: 'large'
  }
}

export const Medium: Story = {
  args: {
    children: 'A medium button',
    size: 'medium'
  }
}

export const Small: Story = {
  args: {
    children: 'A small button',
    size: 'small'
  }
}
