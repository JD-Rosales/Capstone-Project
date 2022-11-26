import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const sorry = new GestureDescription("Sorry");

//Thumb
sorry.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);
sorry.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
sorry.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
sorry.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
sorry.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
sorry.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0); 

//Ring
sorry.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
sorry.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0);

//Pinky
sorry.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
sorry.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);