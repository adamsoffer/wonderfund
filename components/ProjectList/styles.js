import glamorous from 'glamorous'
import { gutterWidth } from '../../lib/constants'
import { container } from '../../lib/mixins'

export const Container = glamorous.section({
  ...container,
  flexWrap: 'wrap',
  marginBottom: '40px'
})

export const List = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: `0 calc(-${gutterWidth} / 2)`
})

export const Item = glamorous.div({
  flex: '33%',
  padding: `0 calc(${gutterWidth} / 2)`,
  maxWidth: '33%'
})
