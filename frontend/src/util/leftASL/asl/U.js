import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const u = new GestureDescription("U");

//Thumb
u.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
u.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
u.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
u.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
u.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
u.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
u.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
u.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

//Pinky
u.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
u.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);