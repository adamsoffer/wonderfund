import Truncate from 'react-truncate'
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
    <Container style={style}>
      <Image style={{backgroundImage: `url(${project.imageUrl})`}} />
      <Body>
        <Heading>{project.name}</Heading>
        <Description>
          <Truncate lines={2} ellipsis={<span>...</span>}>
            {project.description}
          </Truncate>
        </Description>
        <ProgressBar width={`${project.amountRaised / project.fundingGoal * 100}%`} />
        <StatsContainer>
          <Stat>
            <Num>{project.amountRaised} ETH</Num> pledged
          </Stat>
          <Stat>
            <Num>{Math.round(project.amountRaised / project.fundingGoal * 100)}%</Num> funded
          </Stat>
          <Stat>
            <Num>{daysRemaining(project.deadline)}</Num> days to go
          </Stat>
        </StatsContainer>
      </Body>
    </Container>
  )
}
