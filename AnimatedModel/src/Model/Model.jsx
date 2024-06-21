import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import * as THREE from 'three';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Grid } from '@mui/material';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import coloredtexture from '../shaders/peakpx.jpg';
gsap.registerPlugin(ScrollTrigger);

function Model(props) {
  const shaderMaterialRef = useRef(); // Reference to the shader material
  const { nodes } = useGLTF('./assets/shiba/lopoly_dna.gltf');

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      const timeValue = clock.getElapsedTime();
      const colorvalue = Math.sin(timeValue) / 2.0 + 0.3;
      const colorvalue2 = Math.sin(timeValue) / 3.0 + 0.3;
      shaderMaterialRef.current.uniforms.ourColor.value.set(
        0.0,
        colorvalue,
        colorvalue2,
        1.0
      );
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
    uniforms: {
      uTime: { value: 0.0 },
      ourColor: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      color4: { value: new THREE.Color(0xffffff) },
      uTexture: { value: new THREE.TextureLoader().load(coloredtexture) },
    },
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
            <mesh
              geometry={nodes.DNA3.geometry}
              material={shaderMaterial}
            ></mesh>
          </group>
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
          start: 'top center',
          end: 'bottom center',
          duration: 3,
          markers: false,
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div>
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
