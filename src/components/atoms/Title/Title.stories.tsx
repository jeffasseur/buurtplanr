import Title from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Title> = {
  component: Title
}

export default meta
type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'semibold'
  }
}

export const H1: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h1',
    size: 'h1',
    weight: 'semibold'
  }
}

export const H2: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'semibold'
  }
}

export const H3: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h3',
    size: 'h3',
    weight: 'semibold'
  }
}

export const H4: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h4',
    size: 'h4',
    weight: 'semibold'
  }
}

export const Light: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'light'
  }
}

export const Regular: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'regular'
  }
}

export const Medium: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'medium'
  }
}

export const Semibold: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'semibold'
  }
}

export const Bold: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    as: 'h2',
    size: 'h2',
    weight: 'bold'
  }
}
