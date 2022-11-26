import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const ihateyou = new GestureDescription("I hate you");

//Thumb
ihateyou.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ihateyou.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);


//Index
ihateyou.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ihateyou.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
ihateyou.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
ihateyou.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);


//Ring
ihateyou.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
ihateyou.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
ihateyou.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
ihateyou.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
