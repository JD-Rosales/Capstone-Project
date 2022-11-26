import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const water = new GestureDescription("Water");

//Thumb
water.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);
water.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
water.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
water.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
water.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
water.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0); 

//Ring
water.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
water.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

//Pinky
water.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
water.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);