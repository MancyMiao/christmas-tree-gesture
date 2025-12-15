import * as THREE from 'three';

// 生成圣诞树的粒子效果
export function createTreeScene(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.width, canvas.height);

  // 创建粒子效果的圣诞树
  const geometry = new THREE.BufferGeometry();
  const particleCount = 10000;
  const particles = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particles[i * 3] = Math.random() * 2 - 1;
    particles[i * 3 + 1] = Math.random() * 2 - 1;
    particles[i * 3 + 2] = Math.random() * 2 - 1;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

  const material = new THREE.PointsMaterial({ size: 0.05, color: 0x00ff00 });
  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);

  // 配置相机位置
  camera.position.z = 5;

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate);
    pointCloud.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
