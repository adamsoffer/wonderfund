import Link from 'next/link'
import { Container, Logo, Nav, LinkContainer } from './styles'
import Button from '../Button'

export default ({ relative, inverse }) => (
  <Container relative={relative} inverse={inverse}>
    <Link prefetch href='/'>
      <a>
        <Logo inverse={inverse}>
          WOND&Xi;RFUND
        </Logo>
      </a>
    </Link>
    <Nav>
      <Link href='/startACampaign' as='start-a-campaign'>
        <LinkContainer inverse={inverse}>
          <Button inverse={inverse} secondary={inverse}>Start a Campaign</Button>
        </LinkContainer>
      </Link>
      <Link>
        <LinkContainer href='mailto:ads1018@gmail.com' target='_blank' inverse={inverse}>Contact</LinkContainer>
      </Link>
    </Nav>
  </Container>
)
