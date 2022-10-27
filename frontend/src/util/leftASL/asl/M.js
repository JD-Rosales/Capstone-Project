import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const m = new GestureDescription("M");

//Thumb
m.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.6);
m.addDirection(Finger.Thumb, FingerDirection.DiagonalLeftDown, 1.2); 

//Index
m.addCurl(Finger.Index, FingerCurl.NoCurl, 1.9);
m.addDirection(Finger.Index, FingerDirection.VerticalDown, 2.2);

//Middle
m.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.9);
m.addDirection(Finger.Middle, FingerDirection.VerticalDown, 2.2);

//Ring
m.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
m.addDirection(Finger.Ring, FingerDirection.VerticalDown, 2.8);

//Pinky
m.addCurl(Finger.Pinky, FingerCurl.FullCurl, 2.0);
m.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 2.2);