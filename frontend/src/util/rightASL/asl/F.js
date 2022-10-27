import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const f = new GestureDescription("F");


//Thumb
f.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
f.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.5); 


//Index
f.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
f.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.5);

//Middle
f.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.9);


//Ring
f.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.9);

//Pinky
f.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.9);
