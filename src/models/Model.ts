import { Attachment } from '@/models/Attachment'

export interface Model {
  _id?: string
  _rev?: string
  _deleted?: boolean
  _attachments?: Attachment
}
