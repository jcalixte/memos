import { CoverPicture } from './CoverPicture'
import { PictureTag } from './PictureTag'
import { Location } from './Location'

export interface Picture extends CoverPicture {
  location: Location | null
  meta: {
    tags: PictureTag
  }
}
