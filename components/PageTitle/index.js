import Link from 'next/link'
import { Container, Heading } from './styles'
import Button from '../Button'

export default ({ heading }) => (
  <Container>
    <Heading>{heading}</Heading>
  </Container>
)
