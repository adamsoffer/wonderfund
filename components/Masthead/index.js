import Link from 'next/link'
import { Container, Wrapper, Body, Heading, Paragraph } from './styles'
import Button from '../Button'

export default () => (
  <Container>
    <Wrapper>
      <Body>
        <Heading>Wonderfund</Heading>
        <Paragraph>Directly fund projects around the world.</Paragraph>
        <Button large inverse>
          Discover a Project
        </Button>
      </Body>
    </Wrapper>
  </Container>
)
