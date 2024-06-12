import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  let direction = 1;
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/shiba/lopoly_dna.gltf', (gltfScene) => {
      loadedModel = gltfScene;

      if (loadedModel.scene.material) {
        loadedModel.scene.material.color = new THREE.Color(0xff0000); // Set to red
      } else {
        loadedModel.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.color = new THREE.Color(0x00ffff); // Set to green
          }
        });
      }

      // Position and scale adjustments
      loadedModel.scene.position.set(-7, 4, 0);
      loadedModel.scene.scale.set(3, 3, 5);
      test.scene.add(loadedModel.scene);
    });

    let direction = 1; // 1 for increasing, -1 for decreasing

    const speed = 0.005; // Smaller speed for smoother transition

    const animate = () => {
      if (loadedModel) {
        // Adjust rotation based on direction
        loadedModel.scene.rotation.x += direction * speed;

        // Switch direction at boundaries
        if (loadedModel.scene.rotation.x <= 0) {
          direction = 1; // Switch to decreasing
        } else if (loadedModel.scene.rotation.x >= 0.5) {
          direction = -1; // Switch to increasing
        }

        loadedModel.scene.rotation.y = 0;
        loadedModel.scene.rotation.z = 0;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
