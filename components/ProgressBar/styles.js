import glamorous from 'glamorous'

export const Container = glamorous.span({
  backgroundColor: '#E6E7E8',
  borderRadius: '4px',
  display: 'block',
  height: '8px',
  marginBottom: '20px',
  overflow: 'hidden',
  width: '100%'
})

export const Fill = glamorous.span(
  {
    backgroundColor: '#f26a81',
    borderRadius: '4px',
    display: 'block',
    height: '100%'
  },
  (props) => ({
    width: props.width ? props.width : 0
  })
)
