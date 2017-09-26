import Link from 'next/link'
import { Container, List, Item } from './styles'
import ProjectCard from '../ProjectCard'

export default ({ projects }) => (
  <Container>
    <List>
      {projects.map((project, i) => {
        return (
          <Item key={i}>
            <Link
              href={{ pathname: 'project', query: { slug: project.address } }}
            >
              <a>
                <ProjectCard project={project} />
              </a>
            </Link>
          </Item>
        )
      })}
    </List>
  </Container>
)
