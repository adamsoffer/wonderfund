import { Container } from './styles'

export default ({
  type,
  children,
  large,
  secondary,
  onClick,
  fullWidth,
  inverse
}) => (
  <Container
    onClick={onClick}
    type={type}
    large={large}
    inverse={inverse}
    secondary={secondary}
    fullWidth={fullWidth}>
    {children}
  </Container>
)
