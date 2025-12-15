import { HandLandmarker } from '@mediapipe/tasks-vision';

// 初始化手势识别
export async function initHandGestureRecognition(videoElement) {
  const fileset = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
  const handLandmarker = await HandLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
    },
    runningMode: 'VIDEO',
    numHands: 1,
  });

  videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });

  function detectHandGestures() {
    const landmarks = handLandmarker.detectForVideo(videoElement);
    if (landmarks.length > 0) {
      // 手势识别逻辑：握拳、张开手、捏合
      const gesture = classifyGesture(landmarks[0]);
      handleGesture(gesture);
    }
    requestAnimationFrame(detectHandGestures);
  }

  detectHandGestures();
}

function classifyGesture(landmarks) {
  // 根据关键点分类手势（握拳、张开手、捏合）
  // 这里可以加入更复杂的逻辑，例如使用阈值来避免误识别
}

function handleGesture(gesture) {
  if (gesture === 'OPEN') {
    // 手势识别为“张开”，可以触发粒子效果扩散
  } else if (gesture === 'FIST') {
    // 手势识别为“握拳”，聚合粒子
  } else if (gesture === 'PINCH') {
    // 手势识别为“捏合”，可以触发照片挂树
  }
}
