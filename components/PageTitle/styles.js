import glamorous from 'glamorous'
import { container } from '../../lib/mixins'

export const Container = glamorous.div({
  ...container,
  textAlign: 'center',
  paddingTop: '60px',
  paddingBottom: '80px'
})

export const Heading = glamorous.h2({
  color: '#202020',
  fontSize: '38px',
  marginBottom: '20px'
})

export const Subheading = glamorous.h2({
  color: '#202020',
  fontSize: '24px',
  fontWeight: '500'
})
