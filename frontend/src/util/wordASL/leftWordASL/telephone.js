import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const telephone = new GestureDescription('Telephone')

//Thumb
telephone.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
telephone.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
// telephone.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0)
// telephone.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)

// //Middle
// telephone.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
// telephone.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0)

// //Ring
// telephone.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
// telephone.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0)

//Pinky
telephone.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
telephone.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
