import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const s = new GestureDescription("S");

//Thumb
s.addCurl(Finger.Thumb, FingerCurl.FullCurl, 2.1);
s.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 2.1); 

//Index
s.addCurl(Finger.Index, FingerCurl.FullCurl, 2.1);
s.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 2.1);

//Middle
s.addCurl(Finger.Middle, FingerCurl.FullCurl, 2.1);
s.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 2.1);

//Ring
s.addCurl(Finger.Ring, FingerCurl.FullCurl, 2.1);
s.addDirection(Finger.Ring, FingerDirection.VerticalUp, 2.1);

//Pinky
s.addCurl(Finger.Pinky, FingerCurl.FullCurl, 2.1);
s.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 2.1);