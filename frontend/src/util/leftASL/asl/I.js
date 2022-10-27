import  {Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

export const i = new GestureDescription("I");


//Thumb
i.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.5);
i.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.5); 

//Index
i.addCurl(Finger.Index, FingerCurl.FullCurl, 1.5);
i.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.5);

//Middle
i.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.5);
i.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.5);

//Ring
i.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.5);
i.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.5);

//Pinky
i.addCurl(Finger.Pinky, FingerCurl.NoCurl, 2.1);
i.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 3.1);