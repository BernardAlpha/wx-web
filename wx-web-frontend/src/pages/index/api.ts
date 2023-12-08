import { req } from '@/utils/request'

export const countdownDayInfo = () => {
  return req.POST('/events/latestEvent')
}

