import glamorous from 'glamorous'
import { container } from '../../lib/mixins'

export const Container = glamorous.section({
  backgroundColor: '#0f1e37',
  padding: '80px 0'
})

export const Wrapper = glamorous.section({
  ...container
})

export const Logo = glamorous.img({
  width: '100px',
  cursor: 'pointer',
  marginBottom: '20px'
})

export const Nav = glamorous.nav({
  display: 'flex',
  marginBottom: '30px'
})

export const LinkContainer = glamorous.a({
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
  marginRight: '20px',
  ':last-child': {
    marginRight: 0
  }
})

export const SocialContainer = glamorous.div({
  display: 'flex',
  marginBottom: '50px'
})

export const SocialItem = glamorous.img({
  width: '30px',
  height: '30px',
  marginRight: '20px',
  ':last-child': {
    marginRight: 0
  }
})

export const MetaInfoContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between'
})
