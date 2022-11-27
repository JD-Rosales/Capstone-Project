import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const money = new GestureDescription('Money')

//Thumb
money.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
money.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
money.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
money.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

//Middle
money.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
money.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)

//Ring
money.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
money.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0)

//Pinky
money.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
money.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0)
