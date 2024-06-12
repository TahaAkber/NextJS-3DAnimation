'use client';

import * as THREE from 'three';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrthographicCamera } from '@react-three/drei';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { ShaderMaterial } from 'three';
import { gsap } from 'gsap';

function Model(props) {
  const ref = useRef(null);
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime));

  useEffect(() => {
    console.log('Default position:', ModelRef.current.position);
  }, []);
  const { nodes } = useGLTF('./assets/shiba/lopoly_dna.gltf');

  const ModelRef = useRef();

  useFrame(() => {
    if (ModelRef.current) {
      if (ModelRef.current.rotation.y > -1 || ModelRef.current.rotation.y < 0) {
        ModelRef.current.rotation.x += 0.01;
      }
    }
  });

  const customShader = new ShaderMaterial({
    uniforms: {
      uTime: { value: 1 }, // Initial value can be set here
      color2: { value: new THREE.Color('#FFFF00') },
      color1: { value: new THREE.Color('#FFA5FF') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(sin(vUv.y + uTime) * mix(color1, color2, vUv.y), 1.5);
      }
    `,
  });

  return (
    <group {...props} dispose={null}>
      <group ref={ModelRef} />
      <group ref={ModelRef} {...props} dispose={null}>
        <group scale={0.01} ref={ref}>
          <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={9}>
            <mesh geometry={nodes.DNA3.geometry} material={customShader}>
              <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL.geometry}
                  material={nodes.Sphere_CTRL.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_1.geometry}
                  material={nodes.Sphere_CTRL_1.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_2.geometry}
                  material={nodes.Sphere_CTRL_2.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[0, 0, 0.436]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_3.geometry}
                  material={nodes.Sphere_CTRL_3.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_4.geometry}
                  material={nodes.Sphere_CTRL_4.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[0, 0, 0.436]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_5.geometry}
                  material={nodes.Sphere_CTRL_5.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[1, 1, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_6.geometry}
                  material={nodes.Sphere_CTRL_6.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[1, 1, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_7.geometry}
                  material={nodes.Sphere_CTRL_7.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[1, 1, 0.436]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_8.geometry}
                  material={nodes.Sphere_CTRL_8.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[1, 1, 10]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_9.geometry}
                  material={nodes.Sphere_CTRL_9.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 0]} rotation={[1, 1, 10]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_10.geometry}
                  material={nodes.Sphere_CTRL_10.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 0, 2.401]} rotation={[1, 1, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_11.geometry}
                  material={nodes.Sphere_CTRL_11.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 2.552, 0]} rotation={[1, 1, 0]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_12.geometry}
                  material={nodes.Sphere_CTRL_12.material}
                  scale={0.7}
                />
              </group>
              <group position={[0, 1.939, 0]} rotation={[0, 0, 1]} scale={0}>
                <mesh
                  geometry={nodes.Sphere_CTRL_13.geometry}
                  material={nodes.Sphere_CTRL_13.material}
                  scale={0.7}
                />
              </group>
            </mesh>
            <mesh geometry={nodes.Cube.geometry} material={nodes} />
          </group>
          <OrthographicCamera
            makeDefault={false}
            far={100000}
            near={0}
            position={[-965.593, -1742.45, 188.687]}
            rotation={[1.569, -0.629, 1.568]}
          />{' '}
        </group>
      </group>
    </group>
  );
}

function NewApp() {
  const imgref = useRef(null);

  useEffect(() => {
    const currentImgRef = imgref.current;
    gsap.fromTo(
      currentImgRef,
      { rotation: 0 },
      {
        rotation: 90,
        scrollTrigger: {
          trigger: currentImgRef,
          start: 'top center ',
          end: 'bottom  center',
          duration: 3,
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="">
      <Canvas
        ref={imgref}
        style={{
          width: '100vw',
          height: '110vh',
          minHeight: '10vh',
        }}
      >
        <Suspense fallback={null}>
          <mesh>
            <Model />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default NewApp;
