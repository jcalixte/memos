import { Location } from '@/models/Location'
import { Picture } from '@/models/Picture'
import { CoverPicture } from '@/models/CoverPicture'
import { Model } from '@/models/Model'

type PictureOmit = 'file' | 'objectUrl'

export interface Memo extends Model {
  title: string
  content: string
  date: Date
  location: Location
  coverPicture: CoverPicture | null
  pictures: Picture[]
}

export interface MemoModel extends Model {
  title: string
  content: string
  date: Date
  location: Location
  coverPicture: Omit<CoverPicture, PictureOmit> | null
  pictures: Omit<Picture, PictureOmit>[]
}
