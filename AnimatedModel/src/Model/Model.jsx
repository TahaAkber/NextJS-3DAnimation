import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import * as THREE from 'three';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
} from '@react-three/drei';
import { Grid } from '@mui/material';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function Model(props) {
  const shaderMaterialRef = useRef(); // Reference to the shader material
  const { nodes } = useGLTF('./assets/shiba/lopoly_dna.gltf');

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useFrame(() => {
    if (groupRef.current) {
      if (groupRef.current.rotation.y > -1) {
        groupRef.current.rotation.x += 0.02;
      }
      const fixedPosition = new THREE.Vector3(0, 0, 0);
      groupRef.current.position.copy(fixedPosition);
    }
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0.0 } },
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  useEffect(() => {
    if (nodes && nodes.DNA3 && nodes.DNA3.material) {
      nodes.DNA3.material = shaderMaterial; // Use custom shader material
      shaderMaterialRef.current = shaderMaterial; // Assign the ref
    }
  }, [nodes, shaderMaterial]);

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef} />
      <group ref={groupRef} {...props} dispose={null}>
        <group scale={0.01}>
          <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={15}>
            <mesh geometry={nodes.DNA3.geometry} material={shaderMaterial}>
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
          <PerspectiveCamera
            makeDefault={false}
            far={100000}
            near={70}
            fov={5}
            position={[0, 20, 513.86]}
            rotation={[-0.03, 0.023, 0.001]}
          />
          <OrthographicCamera
            makeDefault={false}
            far={100000}
            near={0}
            position={[-965.593, -1742.45, 188.687]}
            rotation={[1.569, -0.629, 1.568]}
          />
        </group>
      </group>
    </group>
  );
}

function Appp() {
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
          end: 'bottom center',
          duration: 3,
          markers: false,
          scrub: true,
          toggleActions: 'play , none , none , reverse',
        },
      }
    );
  }, []);
  return (
    <div className="">
      <Grid container justifyContent="start">
        <Grid item xs={12} md={4}>
          <Canvas
            ref={imgref}
            style={{ width: '100vw', height: '110vh', minHeight: '10vh' }}
          >
            <OrbitControls
              autoRotateSpeed={4}
              enableZoom={false}
              enablePan={true}
              target={[0, 0, 0]}
            />
            <Suspense fallback={null}>
              <directionalLight position={[1, 1, 1]} intensity={1} />
              <spotLight position={[0.5, 0.5, 1]} angle={10} penumbra={10} />
              <mesh>
                <Model />
              </mesh>
            </Suspense>
          </Canvas>
        </Grid>
      </Grid>
    </div>
  );
}

export default Appp;
