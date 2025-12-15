import { createTreeScene } from './tree.js';
import { initHandGestureRecognition } from './gesture.js';
import { handlePhotoUpload } from './upload.js';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// 初始化3D圣诞树和手势识别
createTreeScene(canvas);
initHandGestureRecognition(video);

// 处理照片上传功能
const photoUploadInput = document.getElementById('photo-upload');
photoUploadInput.addEventListener('change', handlePhotoUpload);
