import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const mother = new GestureDescription('Mother')

//Thumb
mother.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
mother.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0)

//Index
mother.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
mother.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

//Middle
mother.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
mother.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0)

//Ring
mother.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0)
mother.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0)

//Pinky
mother.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
mother.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
