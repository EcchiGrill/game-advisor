'use client';

import { createLogoTexture } from '@/lib/three/createLogoTexture';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const logoTexture = createLogoTexture('<G4M3> adv1s0r');
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
    });

    const logoWidth = 5;
    const logoHeight = logoWidth * (256 / 1024);

    const widthSegments = 64;
    const heightSegments = 16;
    const logoGeometry = new THREE.PlaneGeometry(
      logoWidth,
      logoHeight,
      widthSegments,
      heightSegments
    );
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    logoGroup.add(logoMesh);

    logoGroup.position.set(0, 0, 0);

    const positionAttr = logoGeometry.attributes
      .position as THREE.BufferAttribute;
    const basePositions = new Float32Array(positionAttr.array.length);
    basePositions.set(positionAttr.array as Float32Array);

    const rows = heightSegments + 1;
    const cols = widthSegments + 1;

    let glitchTimeRemaining = 0;
    let nextGlitchCooldown = 0.4; // wait at least ~0.4s before next potential glitch
    const rowOffsets = new Float32Array(rows); // per-row horizontal offset during glitch

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotation.y = x * 0.12;
      targetRotation.x = -y * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Idle float
      const baseY = Math.sin(elapsed * 0.3) * 0.08;
      logoGroup.position.y = baseY;

      // Smooth parallax rotation
      logoGroup.rotation.y += (targetRotation.y - logoGroup.rotation.y) * 0.06;
      logoGroup.rotation.x += (targetRotation.x - logoGroup.rotation.x) * 0.06;

      logoGroup.rotation.z = Math.sin(elapsed * 0.05) * 0.02;

      if (glitchTimeRemaining > 0) {
        glitchTimeRemaining -= delta;
      } else {
        nextGlitchCooldown -= delta;
        if (nextGlitchCooldown <= 0) {
          if (Math.random() < 0.25) {
            glitchTimeRemaining = 0.08 + Math.random() * 0.12;
            nextGlitchCooldown = 0.4 + Math.random() * 1.3;

            for (let r = 0; r < rows; r++) {
              // 50% of rows affected
              if (Math.random() < 0.5) {
                const dir = Math.random() < 0.5 ? -1 : 1;
                // glitch strength
                rowOffsets[r] = dir * (0.05 + Math.random() * 0.08);
              } else {
                rowOffsets[r] = 0;
              }
            }
          } else {
            // No glitch this time, wait a bit and recheck
            nextGlitchCooldown = 0.3 + Math.random() * 0.4;
          }
        }
      }

      const arr = positionAttr.array as Float32Array;
      const vertexCount = positionAttr.count;

      if (glitchTimeRemaining > 0) {
        // During glitch: slice rows by offsets
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

        logoGroup.position.x = (Math.random() - 0.5) * 0.03;
      } else {
        // No glitch: restore base positions & center X
        for (let i = 0; i < vertexCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          arr[ix] = basePositions[ix];
          arr[iy] = basePositions[iy];
          arr[iz] = basePositions[iz];
        }
        logoGroup.position.x += (0 - logoGroup.position.x) * 0.15;
      }

      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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

      logoGeometry.dispose();
      logoMaterial.map?.dispose();
      logoMaterial.dispose();
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
