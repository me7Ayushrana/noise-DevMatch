"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;

        if (hovered) {
            meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
        } else {
            meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere
                ref={meshRef}
                args={[1, 100, 100]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0}
                    emissive="#4338ca"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
}

function Particles() {
    const points = useRef<THREE.Points>(null!);

    useFrame((state) => {
        points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <AnimatedSphere />
                <Particles />

                {/* Subtle ground reflection effect */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial
                        color="#050505"
                        transparent
                        opacity={0.5}
                        roughness={1}
                    />
                </mesh>
            </Canvas>
        </div>
    );
}
