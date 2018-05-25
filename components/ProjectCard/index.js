import ProgressBar from '../ProgressBar'
import { daysRemaining } from '../../lib/utilities'
import {
  Container,
  Image,
  Body,
  Heading,
  Description,
  StatsContainer,
  Stat,
  Num
} from './styles'

export default ({ project, style }) => {
  if (!project) {
    return <Container style={style} />
  }

  return (
    console.log(project),
    (
      <Container style={style}>
        <Image style={{ backgroundImage: `url(${project.imageUrl})` }} />
        <Body>
          <Heading>{project.name}</Heading>
          <Description>{project.description}</Description>
          <ProgressBar
            width={`${project.amountRaised / project.fundingGoal * 100}%`}
          />
          <StatsContainer>
            <Stat>
              <Num>{project.amountRaised} ETH</Num> pledged
            </Stat>
            <Stat>
              <Num>
                {Math.round(project.amountRaised / project.fundingGoal * 100)}%
              </Num>{' '}
              funded
            </Stat>
            <Stat>
              <Num>{daysRemaining(project.deadline)}</Num> days to go
            </Stat>
          </StatsContainer>
        </Body>
      </Container>
    )
  )
}
