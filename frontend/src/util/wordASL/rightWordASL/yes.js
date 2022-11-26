import  { Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'

export const yes = new GestureDescription("Yes")

//Thumb
yes.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
yes.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1); 

//Index
yes.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
yes.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
yes.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
yes.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Ring
yes.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
yes.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Pinky
yes.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
yes.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);