import Link from 'next/link'
import { Container, Logo, Nav, LinkContainer } from './styles'
import Button from '../Button'

export default ({ relative, inverse }) => {
  return (
    <Container relative={relative} inverse={inverse}>
      <Link prefetch href="/">
        <Logo inverse={inverse}>WONDΞRFUND</Logo>
      </Link>
      <Nav>
        <Link href="/about">
          <LinkContainer inverse={inverse}>About Us</LinkContainer>
        </Link>
        <Link href="/startACampaign" as="start-a-campaign">
          <LinkContainer inverse={inverse}>
            <Button secondary={!inverse}>Start a Campaign</Button>
          </LinkContainer>
        </Link>
      </Nav>
    </Container>
  )
}
