import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const d = new GestureDescription("D");

//Thumb
d.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.3);
d.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
d.addCurl(Finger.Index, FingerCurl.NoCurl, 2.5);
d.addDirection(Finger.Index, FingerDirection.VerticalUp, 3.0);

//Middle
d.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.3);
d.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.3);

//Ring
d.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.3);
d.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.3);

//Pinky
d.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.3);
d.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.3);

