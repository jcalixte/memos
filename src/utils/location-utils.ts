import { Location } from '@/models/Location'
import { DMSLocation } from '@/models/DMSLocation'

const convertToDMSLocation = ({
  degrees,
  minutes,
  seconds,
  direction
}: DMSLocation) => {
  let decimalDegrees = degrees + minutes / 60 + seconds / (60 * 60)

  if (direction == 'S' || direction == 'W') {
    decimalDegrees = decimalDegrees * -1
  }

  return decimalDegrees
}

export const getLocation = (
  latitude: DMSLocation,
  longitude: DMSLocation
): Location => {
  return {
    lat: convertToDMSLocation(latitude),
    lng: convertToDMSLocation(longitude)
  }
}
