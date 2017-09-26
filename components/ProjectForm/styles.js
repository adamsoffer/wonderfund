import glamorous from 'glamorous'
import { container } from '../../lib/mixins'

export const Container = glamorous.form({
  ...container,
  borderRadius: '3px'
})

export const Wrapper = glamorous.div({
  display: 'flex'
})

export const Image = glamorous.div({
  backgroundImage: 'url(http://placehold.it/400x400)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '500px',
  width: '60%'
})

export const Body = glamorous.div({
  marginLeft: '40px',
  width: '40%'
})

export const Heading = glamorous.h2({
  marginBottom: '5px'
})

export const Description = glamorous.p({
  color: '#95959E',
  marginBottom: '15px',
  lineHeight: '1.3',
  fontSize: '14px'
})

export const Stat = glamorous.span({
  color: '#95959E',
  display: 'block',
  fontSize: '14px',
  marginBottom: '8px'
})

export const Num = glamorous.span({
  color: '#626369',
  fontWeight: 'bold'
})

export const StatsContainer = glamorous.span({
  display: 'flex',
  flexDirection: 'column'
})
