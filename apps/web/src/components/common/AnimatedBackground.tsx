'use client';

import { createLoaderTexture } from '@/lib/three/createLoaderTexture';
import { createLogoTexture } from '@/lib/three/createLogoTexture';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedBackgroundProps {
  loading?: boolean;
}

export function AnimatedBackground({ loading }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      clientWidth / clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;
    camera.lookAt(0, 0, 0);

    // Create left part of logo
    const leftLogoGroup = new THREE.Group();
    scene.add(leftLogoGroup);

    const leftLogoTexture = createLogoTexture('<G4M3>');
    const leftLogoMaterial = new THREE.MeshBasicMaterial({
      map: leftLogoTexture,
      transparent: true,
    });

    const logoWidth = 2.8;
    const logoHeight = logoWidth * (256 / 1024);

    const widthSegments = 64;
    const heightSegments = 16;
    const leftLogoGeometry = new THREE.PlaneGeometry(
      logoWidth,
      logoHeight,
      widthSegments,
      heightSegments
    );
    const leftLogoMesh = new THREE.Mesh(leftLogoGeometry, leftLogoMaterial);
    leftLogoGroup.add(leftLogoMesh);

    // Create right part of logo
    const rightLogoGroup = new THREE.Group();
    scene.add(rightLogoGroup);

    const rightLogoTexture = createLogoTexture('adv1s0r');
    const rightLogoMaterial = new THREE.MeshBasicMaterial({
      map: rightLogoTexture,
      transparent: true,
    });

    const rightLogoGeometry = new THREE.PlaneGeometry(
      logoWidth,
      logoHeight,
      widthSegments,
      heightSegments
    );
    const rightLogoMesh = new THREE.Mesh(rightLogoGeometry, rightLogoMaterial);
    rightLogoGroup.add(rightLogoMesh);

    const idleGap = 2.5;
    const loadingGap = 5.0;

    // Initial positions for split logos
    leftLogoGroup.position.set(-idleGap / 2, 0, 0);
    rightLogoGroup.position.set(idleGap / 2, 0, 0);

    // Create loader
    const loaderGroup = new THREE.Group();
    scene.add(loaderGroup);

    const loaderTexture = createLoaderTexture();
    const loaderMaterial = new THREE.MeshBasicMaterial({
      map: loaderTexture,
      transparent: true,
      opacity: 0,
    });

    const loaderGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const loaderMesh = new THREE.Mesh(loaderGeometry, loaderMaterial);
    loaderGroup.add(loaderMesh);
    loaderGroup.position.set(0, 0, 0);

    // Store base positions for glitch effect
    const leftPositionAttr = leftLogoGeometry.attributes
      .position as THREE.BufferAttribute;
    const leftBasePositions = new Float32Array(leftPositionAttr.array.length);
    leftBasePositions.set(leftPositionAttr.array as Float32Array);

    const rightPositionAttr = rightLogoGeometry.attributes
      .position as THREE.BufferAttribute;
    const rightBasePositions = new Float32Array(rightPositionAttr.array.length);
    rightBasePositions.set(rightPositionAttr.array as Float32Array);

    const rows = heightSegments + 1;
    const cols = widthSegments + 1;

    let glitchTimeRemaining = 0;
    let nextGlitchCooldown = 0.4;
    const rowOffsets = new Float32Array(rows);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const targetRotation = { x: 0, y: 0 };
    let loadingTransition = 0; // 0 = together, 1 = split

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotation.y = x * 0.12;
      targetRotation.x = -y * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateBackground = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Animate loading transition
      const targetTransition = loadingRef.current ? 1 : 0;
      loadingTransition += (targetTransition - loadingTransition) * 0.08;

      // Calculate target positions
      const leftTargetX = loadingRef.current ? -loadingGap / 2 : -idleGap / 2;
      const rightTargetX = loadingRef.current ? loadingGap / 2 : idleGap / 2;

      // Idle float
      const baseY = Math.sin(elapsed * 0.3) * 0.08;
      leftLogoGroup.position.y = baseY;
      rightLogoGroup.position.y = baseY - 0.35;

      // Smooth position transitions
      leftLogoGroup.position.x +=
        (leftTargetX - leftLogoGroup.position.x) * 0.08;
      rightLogoGroup.position.x +=
        (rightTargetX - rightLogoGroup.position.x) * 0.08;

      // Smooth parallax rotation
      leftLogoGroup.rotation.y +=
        (targetRotation.y - leftLogoGroup.rotation.y) * 0.06;
      leftLogoGroup.rotation.x +=
        (targetRotation.x - leftLogoGroup.rotation.x) * 0.06;
      rightLogoGroup.rotation.y +=
        (targetRotation.y - rightLogoGroup.rotation.y) * 0.06;
      rightLogoGroup.rotation.x +=
        (targetRotation.x - rightLogoGroup.rotation.x) * 0.06;

      leftLogoGroup.rotation.z = Math.sin(elapsed * 0.05) * 0.02;
      rightLogoGroup.rotation.z = Math.sin(elapsed * 0.05) * 0.02;

      // Loader animation
      loaderMaterial.opacity +=
        (loadingTransition - loaderMaterial.opacity) * 0.1;
      loaderGroup.rotation.z = elapsed * 1.5;

      // Glitchy scale pulse for loader
      const loaderGlitchPulse = 1 + Math.sin(elapsed * 8) * 0.05;
      loaderGroup.scale.set(
        loaderGlitchPulse,
        loaderGlitchPulse,
        loaderGlitchPulse
      );

      // Random loader position jitter when loading
      if (loadingRef.current && Math.random() < 0.1) {
        loaderGroup.position.x = (Math.random() - 0.5) * 0.03;
        loaderGroup.position.y = baseY + (Math.random() - 0.5) * 0.03;
      } else {
        loaderGroup.position.x += (0 - loaderGroup.position.x) * 0.15;
        loaderGroup.position.y += (baseY - loaderGroup.position.y) * 0.15;
      }

      // Glitch effect management
      if (glitchTimeRemaining > 0) {
        glitchTimeRemaining -= delta;
      } else {
        nextGlitchCooldown -= delta;
        if (nextGlitchCooldown <= 0) {
          if (Math.random() < 0.25) {
            glitchTimeRemaining = 0.08 + Math.random() * 0.12;
            nextGlitchCooldown = 0.4 + Math.random() * 1.3;

            for (let r = 0; r < rows; r++) {
              if (Math.random() < 0.5) {
                const dir = Math.random() < 0.5 ? -1 : 1;
                rowOffsets[r] = dir * (0.05 + Math.random() * 0.08);
              } else {
                rowOffsets[r] = 0;
              }
            }
          } else {
            nextGlitchCooldown = 0.3 + Math.random() * 0.4;
          }
        }
      }

      // Apply glitch to both logos
      const applyGlitch = (
        positionAttribute: THREE.BufferAttribute,
        basePositions: Float32Array
      ) => {
        const arr = positionAttribute.array as Float32Array;
        const vertexCount = positionAttribute.count;

        if (glitchTimeRemaining > 0) {
          const glitchStrengthFade =
            glitchTimeRemaining < 0.05 ? glitchTimeRemaining / 0.05 : 1;

          for (let i = 0; i < vertexCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const x0 = basePositions[ix];
            const y0 = basePositions[iy];
            const z0 = basePositions[iz];

            const rowIndex = Math.floor(i / cols);
            const offsetX = rowOffsets[rowIndex] * glitchStrengthFade;

            arr[ix] = x0 + offsetX;
            arr[iy] = y0;
            arr[iz] = z0;
          }
        } else {
          for (let i = 0; i < vertexCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            arr[ix] = basePositions[ix];
            arr[iy] = basePositions[iy];
            arr[iz] = basePositions[iz];
          }
        }

        positionAttribute.needsUpdate = true;
      };

      applyGlitch(leftPositionAttr, leftBasePositions);
      applyGlitch(rightPositionAttr, rightBasePositions);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateBackground);
    };

    animateBackground();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }

      leftLogoGeometry.dispose();
      leftLogoMaterial.map?.dispose();
      leftLogoMaterial.dispose();

      rightLogoGeometry.dispose();
      rightLogoMaterial.map?.dispose();
      rightLogoMaterial.dispose();

      loaderGeometry.dispose();
      loaderMaterial.map?.dispose();
      loaderMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}
