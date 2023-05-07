interface AsProp<C extends React.ElementType> {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = Record<string, unknown>
> = React.PropsWithChildren<Props & AsProp<C>> &
Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
