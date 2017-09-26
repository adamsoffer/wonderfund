import { Container } from './styles'

export default ({type, children, secondary, onClick, fullWidth}) => (
  <Container onClick={onClick} type={type} secondary={secondary} fullWidth={fullWidth}>
    {children}
  </Container>
)
