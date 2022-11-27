import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const iam = new GestureDescription('I am')

//Thumb
iam.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0)
iam.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

//Index
iam.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
iam.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)

//Middle
iam.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
iam.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)

//Ring
iam.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
iam.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0)

//Pinky
iam.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
iam.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0)
