import glamorous from 'glamorous'

export const Container = glamorous.header(
  {
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 25px',
    position: 'absolute',
    width: '100%'
  },
  props => ({
    position: props.relative ? 'relative' : 'absolute',
    marginBottom: props.relative ? '40px' : '0'
  })
)

export const Logo = glamorous.a(
  {
    color: '#ffffff',
    curor: 'pointer',
    fontSize: '24px',
    fontWeight: '900'
  },
  props => ({
    color: props.inverse ? '#0f1e37' : '#ffffff'
  })
)

export const Nav = glamorous.nav({
  alignItems: 'center',
  display: 'flex'
})

export const LinkContainer = glamorous.a(
  {
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    marginRight: '20px',
    ':last-child': {
      marginRight: 0
    }
  },
  props => ({
    color: props.inverse ? '#000000' : '#ffffff'
  })
)
