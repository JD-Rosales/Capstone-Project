import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const hello = new GestureDescription('Hello')

//Thumb
hello.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9)
hello.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
// hello.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//Index
hello.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
hello.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.8)
// hello.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
hello.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
hello.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
// hello.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

//Ring
hello.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
hello.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0)
// hello.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

//Pinky
hello.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
hello.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.8)
