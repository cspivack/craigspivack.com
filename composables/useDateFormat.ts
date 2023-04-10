import { add, format } from 'date-fns'

export const useDateFormat = (dateString: string) => {
  const date = new Date(dateString)
  const minutes = date.getTimezoneOffset()
  return format(add(date, { minutes }), 'MMMM do, y')
}
