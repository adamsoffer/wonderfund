
import { Container, Label, Input } from './styles'

export default ({ label, type, name, placeholder }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </Container>
  )
}
