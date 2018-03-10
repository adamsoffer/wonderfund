import Link from 'next/link'
import { A, Div, Span } from 'glamorous'
import {
  Container,
  Wrapper,
  Logo,
  Nav,
  LinkContainer,
  SocialContainer,
  SocialItem,
  MetaInfoContainer
} from './styles'
import Button from '../Button'

export default ({ relative, inverse }) => (
  <Container relative={relative} inverse={inverse}>
    <Wrapper>
      <Nav>
        <Link href="/about">
          <LinkContainer>About Us</LinkContainer>
        </Link>
        <Link href="/faq">
          <LinkContainer>FAQ</LinkContainer>
        </Link>
        <Link href="/contact">
          <LinkContainer>Contact Us</LinkContainer>
        </Link>
      </Nav>
      <SocialContainer>
        <Link href="https://facebook.com" passHref>
          <A marginRight="20px" target="_blank" rel="noopener noreferrer">
            <SocialItem src="/static/facebook.svg" />
          </A>
        </Link>
        <Link href="https://twitter.com" passHref>
          <A marginRight="20px" target="_blank" rel="noopener noreferrer">
            <SocialItem src="/static/twitter.svg" />
          </A>
        </Link>
        <Link href="https://instagram.com" passHref>
          <A target="_blank" rel="noopener noreferrer">
            <SocialItem src="/static/instagram.svg" />
          </A>
        </Link>
      </SocialContainer>
      <MetaInfoContainer>
        <Div fontSize="12px">
          <Link href="/privacy-policy" passHref>
            <A color="#fff">Privacy Policy</A>
          </Link>
          <Span color="#fff" margin="0 3px">
            |
          </Span>
          <Link href="/terms-of-use" passHref>
            <A color="#fff">Terms of Use</A>
          </Link>
        </Div>
      </MetaInfoContainer>
    </Wrapper>
  </Container>
)
