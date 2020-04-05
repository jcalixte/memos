export interface PictureTag {
  ImageWidth: number
  ImageHeight: number
  Make: string
  Model: string
  Orientation: number
  ResolutionUnit: number
  DateTime: string
  YCbCrPositioning: number
  ExifIFDPointer: number
  GPSInfoIFDPointer: number
  ExposureProgram: string
  ISOSpeedRatings: number
  ExifVersion: string
  DateTimeOriginal: string
  DateTimeDigitized: string
  ComponentsConfiguration: string
  ShutterSpeedValue: number
  BrightnessValue: number
  ExposureBias: number
  MeteringMode: string
  LightSource: string
  Flash: string
  SubsecTime: string
  SubsecTimeOriginal: string
  SubsecTimeDigitized: string
  FlashpixVersion: string
  ColorSpace: number
  PixelXDimension: number
  PixelYDimension: number
  InteroperabilityIFDPointer: number
  SensingMethod: string
  SceneType: string
  ExposureMode: number
  WhiteBalance: string
  FocalLengthIn35mmFilm: number
  SceneCaptureType: string
  GPSLatitudeRef: 'N' | 'S'
  GPSLatitude: [number, number, number]
  GPSLongitudeRef: 'W' | 'E'
  GPSLongitude: [number, number, number]
  GPSAltitudeRef: number
  GPSTimeStamp: [number, number, number]
  GPSProcessingMethod: number[]
  GPSDateStamp: string
  thumbnail: {
    Compression: number
    Orientation: number
    ResolutionUnit: number
    JpegIFOffset: number
    JpegIFByteCount: number
  }
}
