
import { Container, Label, Textarea } from './styles'

export default ({ label, name, placeholder }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Textarea name={name} placeholder={placeholder} />
    </Container>
  )
}
