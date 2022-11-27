import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const father = new GestureDescription('Father')

//Thumb
father.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9)
father.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
father.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
father.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

//Middle
father.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
father.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0)

//Ring
father.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
father.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0)

//Pinky
father.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0)
father.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
