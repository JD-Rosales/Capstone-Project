import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const n = new GestureDescription("N");

//Thumb
n.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.2);
//n.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0); 
n.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.2); 
//Index
n.addCurl(Finger.Index, FingerCurl.NoCurl, 2.1);
//n.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 1.0);
n.addDirection(Finger.Index, FingerDirection.VerticalDown, 2.0);
//Middle
n.addCurl(Finger.Middle, FingerCurl.NoCurl, 2.1);
// n.addDirection(Finger.Middle, FingerDirection.DiagonalDownRight, 1.0);
// n.addDirection(Finger.Middle, FingerDirection.DiagonalDownLeft, 1.0);
n.addDirection(Finger.Middle, FingerDirection.VerticalDown, 2.2);
//Ring
n.addCurl(Finger.Ring, FingerCurl.FullCurl, 2.0);
n.addDirection(Finger.Ring, FingerDirection.VerticalDown, 2.2);
//Pinky
n.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
n.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 2.2);