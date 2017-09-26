import glamorous from 'glamorous'

export const Container = glamorous.header(
  {
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    position: 'absolute',
    width: '100%'
  },
  props => ({
    position: props.relative ? 'relative' : 'absolute',
    marginBottom: props.relative ? '40px' : '0',
    boxShadow: props.relative ? '0 2px 6px 0 rgba(0,0,0,0.17)' : 'none',
    backgroundColor: props.inverse ? 'white' : 'transparent'
  })
)

export const Logo = glamorous.span(
  {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  props => ({
    color: props.inverse ? '#000000' : '#ffffff'
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
    marginRight: '20px'
  },
  props => ({
    color: props.inverse ? '#000000' : '#ffffff'
  })
)
