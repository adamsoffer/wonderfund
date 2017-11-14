import moment from 'moment'
import {
  Container,
  Wrapper,
  Image,
  Body,
  Heading,
  Description,
  StatsContainer,
  Stat,
  Num
} from './styles'
import { daysRemaining } from '../../lib/utilities'
import ProgressBar from '../ProgressBar'
import Textfield from '../Textfield'
import Button from '../Button'

export default ({ project, handleSubmit }) => {
  let body

  // If the project was a success
  if (project.successfullyFunded) {
    body = (
      <Body>
        <Description>This project was successfully funded!</Description>
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
        </StatsContainer>
      </Body>
    )
  } else if (
    moment(project.deadline).unix() < moment().unix() &&
    !project.successfullyFunded
  ) {
    body = (
      <Body>
        <Description>This project did not meet it's goal</Description>
        <Button
          onClick={() => {
            this.claimRefund()
          }}>
          Claim Refund
        </Button>
      </Body>
    )
  } else {
    body = (
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
        <Textfield
          label="Contribution (ETH):"
          type="number"
          name="contribution"
          placeholder="e.g 1"
        />
        <Button secondary fullWidth type="submit">
          Fund
        </Button>
      </Body>
    )
  }
  return (
    <Container onSubmit={handleSubmit}>
      <Wrapper>
        <Image style={{ backgroundImage: `url(${project.imageUrl})` }} />
        {body}
      </Wrapper>
    </Container>
  )
}
