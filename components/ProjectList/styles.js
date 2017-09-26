import glamorous from 'glamorous'
import { gutterWidth } from '../../lib/constants'

export const Container = glamorous.section({
  margin: '0 auto',
  maxWidth: '1200px',
  flexWrap: 'wrap',
  marginTop: '100px'
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
