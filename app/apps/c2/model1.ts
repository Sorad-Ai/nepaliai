import { NormalizedLandmark } from '@mediapipe/hands';
/**
 * Detects if the hand is in a fist gesture except for the thumb.
 * Returns true if the landmarks of fingers (index, middle, ring, pinky) are below their respective knuckles.
 */
export function dUp(landmarks: NormalizedLandmark[]): boolean {
  // Ensure that all required landmarks are available
  if (landmarks.length < 21) return false;

  // Check if landmark 8 (index fingertip) is above landmark 5 (index knuckle)
  // and landmarks 12, 16, 20 (middle, ring, pinky fingertips) are below their respective knuckles (9, 13, 17)
  const isUp =
    landmarks[8].y < landmarks[5].y &&  // Index finger raised
    landmarks[12].y > landmarks[9].y &&  // Middle finger down
    landmarks[16].y > landmarks[13].y && // Ring finger down
    landmarks[20].y > landmarks[17].y;   // Pinky finger down

  return isUp;
}


export function dDown(landmarks: NormalizedLandmark[]): boolean {
  // Ensure that all required landmarks are available
  if (landmarks.length < 21) return false;

  // Check if landmarks 8, 12, 16, 20 (fingertips) are below landmarks 5, 9, 13, 17 (knuckles)
  const isDown =
    landmarks[8].y > landmarks[5].y &&  // Index finger
    landmarks[12].y > landmarks[9].y &&  // Middle finger
    landmarks[16].y > landmarks[13].y && // Ring finger
    landmarks[20].y > landmarks[17].y;   // Pinky finger

  return isDown;
}
/**
* 4. Angle Between Landmarks
*/
export function d_LR_Angle(landmarks: NormalizedLandmark[]): string {
  if (landmarks.length < 21) return 'None'; // Ensure all landmarks are available

  // Get the coordinates of wrist (Landmark 0), middle finger tip (Landmark 12), and ring finger tip (Landmark 16)
  const wristX = landmarks[0].x;
  const middleFingerX = landmarks[12].x;
  const ringFingerX = landmarks[16].x;

  // Calculate the horizontal differences between the fingers and the wrist
  const deltaX_middle = middleFingerX - wristX; // Horizontal difference for middle finger
  const deltaX_ring = ringFingerX - wristX;     // Horizontal difference for ring finger

  // Debugging: Log the calculated values for deltaX
  console.log(`Wrist X: ${wristX}, Middle Finger X: ${middleFingerX}, Delta X Middle: ${deltaX_middle}`);
  console.log(`Wrist X: ${wristX}, Ring Finger X: ${ringFingerX}, Delta X Ring: ${deltaX_ring}`);

  // Define stricter thresholds for left and right detection based on horizontal shift
  const rightThreshold = 0.1;  // Minimum horizontal distance for rightward detection using middle finger
  const leftThreshold = -0.1;  // Minimum horizontal distance for leftward detection using ring finger

  // Check conditions to detect left or right gestures
  if (deltaX_middle > rightThreshold) {
    return 'Right'; // Middle finger is significantly to the right of the wrist
  } else if (deltaX_ring < leftThreshold) {
    return 'Left'; // Ring finger is significantly to the left of the wrist
  }

  return 'None'; // Hand is within the neutral (vertical) zone
}

export function dReload(landmarks: NormalizedLandmark[]): boolean {
  // Ensure that all required landmarks are available
  if (landmarks.length < 21) return false;

  // Check if landmarks 8, 20 (index and pinky fingertips) are above landmarks 5, 17 (index and pinky knuckles)
  // and landmarks 12, 16 (middle and ring fingertips) are below their respective knuckles (9, 13)
  const isReload =
    landmarks[8].y < landmarks[5].y &&  // Index finger raised
    landmarks[20].y < landmarks[17].y && // Pinky finger raised
    landmarks[12].y > landmarks[9].y &&  // Middle finger down
    landmarks[16].y > landmarks[13].y &&  // Ring finger down
    landmarks[20].y < landmarks[6].y;   //pinky properly up

  return isReload;
}

export function dAttack(landmarks: NormalizedLandmark[]): boolean {
  // Ensure that all required landmarks are available
  if (landmarks.length < 21) return false;

  // Check if landmarks 8 (index fingertip) and 12 (middle fingertip) are above their respective knuckles (5 and 9)
  // and landmarks 16 (ring fingertip) and 20 (pinky fingertip) are below their respective knuckles (13 and 17)
  // Also, check that middle finger is above index finger
  const isAttack =
    landmarks[8].y < landmarks[5].y &&   // Index finger raised
    landmarks[12].y < landmarks[9].y &&  // Middle finger raised
    landmarks[12].y < landmarks[8].y &&  // Middle finger tip is above index finger tip
    landmarks[16].y > landmarks[13].y && // Ring finger down
    landmarks[20].y > landmarks[17].y;   // Pinky finger down

  return isAttack;
}


export function dPause(landmarks: NormalizedLandmark[]): boolean {
  // Ensure that all required landmarks are available
  if (landmarks.length < 21) return false;

  // Check if landmarks 4 (thumb tip) and 20 (pinky tip) are above landmarks 2 (thumb knuckle) and 17 (pinky knuckle)
  // and landmarks 8, 12, 16 (index, middle, ring fingertips) are below their respective knuckles (5, 9, 13)
  const isPause =
    landmarks[4].y < landmarks[2].y &&   // Thumb raised
    landmarks[20].y < landmarks[17].y && // Pinky raised
    landmarks[8].y > landmarks[5].y &&   // Index finger down
    landmarks[12].y > landmarks[9].y &&  // Middle finger down
    landmarks[16].y > landmarks[13].y;   // Ring finger down

  return isPause;
}
