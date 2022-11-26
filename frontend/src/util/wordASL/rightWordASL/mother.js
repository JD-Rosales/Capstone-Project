import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const mother = new GestureDescription("Mother");

//Thumb
mother.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);
mother.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0); 

//Index
mother.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
mother.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
mother.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
mother.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0); 

//Ring
mother.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
mother.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

//Pinky
mother.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
mother.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);