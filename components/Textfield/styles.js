import glamorous from 'glamorous'

export const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '5px'
})

export const Label = glamorous.label({
  color: '#2d2d2d',
  fontSize: '14px',
  marginBottom: '6px'
})

export const Input = glamorous.input({
  padding: '20px 10px',
  background: '#ffffff',
  border: '1px solid #ccd0d9',
  color: '#2a2f35',
  margin: '0 0 10px',
  maxHeight: '55px',
  borderRadius: '5px',
  fontSize: '16px',
  boxShadow: 'none',
  ':focus': {
    borderColor: '#292b4c'
  }
})
