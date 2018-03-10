import glamorous from 'glamorous'

export const Container = glamorous.button(
  {
    background: '#0f1e37',
    borderRadius: '100px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    padding: '12px 20px'
  },
  props => {
    if (props.secondary) {
      return {
        backgroundColor: 'transparent',
        width: props.fullWidth ? '100%' : 'auto',
        fontSize: props.large ? '18px' : '16px',
        padding: props.large ? '16px 32px' : '12px 20px',
        border: '1px solid #ffffff'
      }
    }
    if (props.inverse) {
      return {
        backgroundColor: '#ffffff',
        color: '#0f1e37',
        fontSize: props.large ? '18px' : '16px',
        padding: props.large ? '16px 32px' : '12px 20px',
        width: props.fullWidth ? '100%' : 'auto'
      }
    }
  }
)
