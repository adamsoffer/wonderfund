import moment from 'moment'

export function daysRemaining (date) {
  let eventdate = moment(date)
  let todaysdate = moment()
  return eventdate.diff(todaysdate, 'days')
}
