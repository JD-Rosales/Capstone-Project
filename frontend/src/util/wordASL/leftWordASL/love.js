import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose'

export const love = new GestureDescription('love')

//Thumb
love.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
love.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//Index
love.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0)
love.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

// //Middle
// love.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
// love.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);

// //Ring
// love.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
// love.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

// //Pinky
// love.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
// love.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
