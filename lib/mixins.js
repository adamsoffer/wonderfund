import { screens } from './constants'

export const container = {
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingLeft: '15px',
  paddingRight: '15px',
  [`@media (min-width: ${screens.small})`]: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '750px'
  },
  [`@media (min-width: ${screens.medium})`]: {
    width: '970px'
  },
  [`@media (min-width: ${screens.large})`]: {
    width: '1170px'
  }
}
