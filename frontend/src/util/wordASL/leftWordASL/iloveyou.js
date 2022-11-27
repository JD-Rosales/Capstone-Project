import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const iloveyou = new GestureDescription('I love you')

//Thumb
iloveyou.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
iloveyou.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
iloveyou.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
iloveyou.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Middle
iloveyou.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
iloveyou.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)

//Ring
iloveyou.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
iloveyou.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.5)

//Pinky
iloveyou.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
iloveyou.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0)
