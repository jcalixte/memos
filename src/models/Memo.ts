import { Location } from '@/models/Location'

export interface Memo {
  _id: string
  _rev?: string
  _deleted?: boolean
  title: string
  content: string
  date: Date
  location: Location
}
