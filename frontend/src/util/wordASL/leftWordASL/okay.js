import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const okay = new GestureDescription('okay')

//Thumb
okay.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
okay.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

//Index
okay.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
okay.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

//Middle
okay.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
okay.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0)

//Ring
okay.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
okay.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0)

//Pinky
okay.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
okay.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
