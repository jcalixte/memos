import { v4 as uuid } from 'uuid'
import Exif from 'exif-js'
import { getLocation } from './location-utils'
import { PictureTag } from '@/models/PictureTag'
import { Picture } from '@/models/Picture'
import { Location } from '@/models/Location'
import { CoverPicture } from '@/models/CoverPicture'

export const getCoverPictureFromFile = (file: File): CoverPicture => {
  const extension = file.name.split('.').pop()
  return {
    uuid: `${uuid()}.${extension}`,
    objectUrl: URL.createObjectURL(file),
    file
  }
}

export const getPictureFromFile = (file: File): Promise<Picture> => {
  const promise = new Promise<Picture>((resolve) => {
    Exif.getData((file as unknown) as string, function(this: string) {
      const tags: PictureTag = Exif.getAllTags(this)

      const hasGPSInfo =
        !!tags.GPSLatitude &&
        !!tags.GPSLatitudeRef &&
        !!tags.GPSLongitude &&
        !!tags.GPSLongitudeRef

      let location: Location | null = null

      if (hasGPSInfo) {
        const [latDegrees, latMinutes, latSeconds] = tags.GPSLatitude
        const latDirection = tags.GPSLatitudeRef

        const [lngDegrees, lngMinutes, lngSeconds] = tags.GPSLongitude
        const lngDirection = tags.GPSLongitudeRef

        location = getLocation(
          {
            degrees: latDegrees,
            minutes: latMinutes,
            seconds: latSeconds,
            direction: latDirection
          },
          {
            degrees: lngDegrees,
            minutes: lngMinutes,
            seconds: lngSeconds,
            direction: lngDirection
          }
        )
      }

      const extension = file.name.split('.').pop()

      resolve({
        uuid: `${uuid()}.${extension}`,
        objectUrl: URL.createObjectURL(file),
        file,
        location,
        meta: { tags }
      })
    })
  })
  return promise
}
