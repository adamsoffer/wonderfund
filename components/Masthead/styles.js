import glamorous from 'glamorous'

export const Container = glamorous.section({
  backgroundColor: '#0f1e37',
  backgroundSize: 'cover'
})

export const Wrapper = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: '600px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
})

export const Body = glamorous.div({
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto'
})

export const Heading = glamorous.h1({
  fontSize: '44px',
  fontWeight: '700',
  color: '#FFFFFF',
  marginBottom: '15px'
})

export const Paragraph = glamorous.p({
  fontSize: '22px',
  color: '#FFFFFF',
  fontWeight: '500',
  lineHeight: '34px',
  marginBottom: '30px'
})
