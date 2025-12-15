import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function GestureTree() {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current?.appendChild(renderer.domElement);
    camera.position.z = 5;

    // 创建粒子系统
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.03,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    // 初始化手势识别
    (async () => {
      const fileset = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const handLandmarker = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        const detectLoop = async () => {
          const now = performance.now();
          const res = handLandmarker.detectForVideo(videoRef.current!, now);
          if (res.landmarks?.length) {
            // 根据手势控制粒子效果
          }
          requestAnimationFrame(detectLoop);
        };
        detectLoop();
      }
    })();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        playsInline
        muted
      />
      <div ref={mountRef} />
    </>
  );
}
