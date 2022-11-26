import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const airplane = new GestureDescription("Airplane");

//Thumb
airplane.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);
airplane.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
airplane.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
airplane.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
airplane.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
airplane.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0); 

//Ring
airplane.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
airplane.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

//Pinky
airplane.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
airplane.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);