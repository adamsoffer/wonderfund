import Link from 'next/link'
import { Container, Wrapper, Body, Heading, Paragraph } from './styles'
import ProjectCard from '../ProjectCard'

export default ({ project }) => (
  <Container>
    <Wrapper>
      <Body>
        <Heading>Decentralized crowdfunding.</Heading>
        <Paragraph>
          Wonderfund is a platform for crowdfunding projects on the Ethereum network.
        </Paragraph>
      </Body>
      <Link href={{ pathname: 'project', query: { slug: project.address } }}>
        <a>
          <ProjectCard project={project} style={{ top: '85px' }} />
        </a>
      </Link>
    </Wrapper>
  </Container>
)
