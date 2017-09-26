import glamorous from 'glamorous'

export const Container = glamorous.button(
  {
    background: '#ffffff',
    borderRadius: '2px',
    boxShadow: '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)',
    color: '#000000',
    cursor: 'pointer',
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '12px 20px'
  },
  (props) => ({
    backgroundColor: props.secondary ? '#f26a81' : '#ffffff',
    color: props.secondary ? '#ffffff' : '#000000',
    width: props.fullWidth ? '100%' : 'auto'
  })
)
