export function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 将照片挂到树上
        const photoTexture = new THREE.Texture(img);
        photoTexture.needsUpdate = true;

        const photoMaterial = new THREE.MeshBasicMaterial({ map: photoTexture });
        const photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), photoMaterial);

        // 放置照片的位置（比如挂到树的某个地方）
        photoMesh.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, 0);
        scene.add(photoMesh);
      };
      reader.readAsDataURL(file);
    };
  }
}
