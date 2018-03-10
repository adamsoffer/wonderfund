import glamorous from 'glamorous'

export const Container = glamorous.section({
  backgroundColor: '#ffffff',
  borderRadius: '3px',
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.20)',
  height: '450px',
  marginBottom: '30px',
  position: 'relative'
})

export const Image = glamorous.div({
  backgroundImage: 'url(http://placehold.it/400x400)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '250px',
  width: '100%'
})

export const Body = glamorous.div({
  padding: '20px'
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
  justifyContent: 'space-between'
})
