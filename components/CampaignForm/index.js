import { Container } from './styles'
import Textfield from '../Textfield'
import Textarea from '../Textarea'
import Button from '../Button'

export default ({ handleSubmit }) => (
  <Container>
    <form onSubmit={handleSubmit}>
      <Textfield
        label="Project name"
        type="text"
        name="projectName"
        placeholder="e.g. Oculus Rift"
      />
      <Textfield
        label="Beneficiary"
        type="text"
        name="beneficiary"
        placeholder="e.g. 0xc0ce6e2216A1b8eE98fdDA3244d2aE69FacD36A3"
      />
      <Textfield
        label="Image Url"
        type="text"
        name="imageUrl"
        placeholder="https://s3.amazonaws.com/static.oculus.com/website/2016/03/riftshipping2.jpg"
      />
      <Textfield label="Deadline" type="datetime-local" name="deadline" />
      <Textfield
        label="Funding Goal (ETH)"
        type="number"
        name="fundingGoal"
        placeholder="e.g. 10"
      />
      <Textarea label="Description" type="text" name="description" />
      <Button secondary type="submit">
        Create My Campaign
      </Button>
    </form>
  </Container>
)
