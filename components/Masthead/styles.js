import glamorous from 'glamorous'

export const Container = glamorous.section({
  backgroundColor: '#0f1e37',
  display: 'flex'
})

export const Wrapper = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: '400px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
})

export const Body = glamorous.div({
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column'
})

export const Heading = glamorous.h1({
  fontSize: '46px',
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: '15px'
})

export const Paragraph = glamorous.p({
  fontSize: '18px',
  color: '#FFFFFF',
  lineHeight: '1.5',
  fontWeight: '400'
})
