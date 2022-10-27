import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const t = new GestureDescription("T");
//Thumb
t.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
t.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Index
t.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
t.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
t.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
t.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
t.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
t.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
t.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
t.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);



