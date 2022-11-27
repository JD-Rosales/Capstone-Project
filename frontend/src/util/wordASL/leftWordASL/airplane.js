import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const airplane = new GestureDescription('Airplane')

//Thumb
airplane.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
airplane.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
airplane.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
airplane.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

//Middle
airplane.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
airplane.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0)

//Ring
airplane.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
airplane.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0)

//Pinky
airplane.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
airplane.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0)
