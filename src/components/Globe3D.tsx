import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
const Globe3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Set up renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Set up scene
      const scene = new THREE.Scene();

      // Set up camera
      const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.z = 3;

      // Create globe
      const geometry = new THREE.SphereGeometry(1, 64, 64);

      // Load earth texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      // Add point light
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 3, 5);
      scene.add(pointLight);

      // Animation loop
      const animate = () => {
        if (!renderer) return; // Ensure renderer exists before animating
        requestAnimationFrame(animate);
        // Rotate globe
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (e) {
      console.error("WebGL initialization failed:", e);
      setWebglError(true);
      return; // Stop further execution of useEffect for WebGL setup
    }
  }, []);

  if (webglError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
        <p>3D Globe could not be loaded. Your browser or device may not support WebGL, or there was an issue initializing it.</p>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
};
export default Globe3D;