import  {Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

export const j = new GestureDescription("J");

//Thumb
j.addCurl(Finger.Thumb, FingerCurl.FullCurl, 2.1);
j.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 2.1); 

//Index
j.addCurl(Finger.Index, FingerCurl.FullCurl, 2.1);
j.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 2.1);

//Middle
j.addCurl(Finger.Middle, FingerCurl.FullCurl, 2.1);
j.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 2.1);

//Ring
j.addCurl(Finger.Ring, FingerCurl.FullCurl, 2.1);
j.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 2.1);

//Pinky
j.addCurl(Finger.Pinky, FingerCurl.NoCurl, 2.1);
j.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 4.1);