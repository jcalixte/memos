export interface Attachment {
  [key: string]: {
    content_type: string
    digest: string
    stub: boolean
    data: Blob
  }
}
