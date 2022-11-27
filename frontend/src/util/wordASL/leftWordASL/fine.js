import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const fine = new GestureDescription('Fine')

//Thumb
fine.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
fine.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
fine.addCurl(Finger.Index, FingerCurl.FullCurl, 1)
fine.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

//Middle
fine.addCurl(Finger.Middle, FingerCurl.FullCurl, 1)
fine.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0)

//Ring
fine.addCurl(Finger.Ring, FingerCurl.FullCurl, 1)
fine.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0)

//Pinky
fine.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1)
fine.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
