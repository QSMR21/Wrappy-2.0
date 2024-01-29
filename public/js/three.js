import * as THREE from 'THREE';
import { OrbitControls } from './controls/OrbitControls.js';
import { GLTFLoader } from './loader/GLTFLoader.js';


/**
 * Variables
 */

    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const loader = new GLTFLoader();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var canvasId = document.getElementById("canvasId")
    var renderer = new THREE.WebGLRenderer({ canvas: canvasId, antialias: true });
    
    var mixer, model, clip, clips, action, i, controls;


/**
 * Functions
 */

    export function init() {

        //Scene
            scene.background = new THREE.Color(0xEFF7FF);
            scene.fog = new THREE.FogExp2(0xEFF7FF, 0.1);

        //Renderer
            renderer.setSize(800, window.innerHeight / window.innerWidth * 800);

        //Canvas
            // const canvas = document.querySelector("canvas");
            // const ctx = canvas.getContext("webgl");

        //Camera
            camera.position.set(0, 2, 3);
            camera.lookAt(new THREE.Vector3(0, 3, 0));

        //Controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enablePan = false;
            controls.maxPolarAngle = Math.PI / 2;
            //controls.minAzimuthAngle = -2 * Math.PI / 5;
            //controls.maxAzimuthAngle = 2 * Math.PI / 5;
            controls.minDistance = 2;
            controls.maxDistance = 4;
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;

        //Mesh
            loader.load(
                '../assets/enveloppe.glb',

                // called when the resource is loaded
                function (gltf) {
    
                    clips = gltf.animations; // Array<THREE.AnimationClip>
                    model = gltf.scene; // THREE.Group

                    scene.add(model);
                    model.rotation.set(1, 3.14, 0);
                    model.position.set(0, -0.8, 0);

                    mixer = new THREE.AnimationMixer(model);
                    
                    // Play a specific animation
                    clip = THREE.AnimationClip.findByName(clips, 'Closed');
                    action = mixer.clipAction(clip, model).setLoop(THREE.LoopRepeat);
                    action.play();
                    i = 0;
                    document.addEventListener('dblclick', animations, false);
                },
            );

        //Lights
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(10, 10, 10);
            spotLight.intensity = 100;
            scene.add(spotLight);

            const spotLight2 = new THREE.SpotLight(0xffffff);
            spotLight2.position.set(0, 10, 0);
            spotLight2.intensity = 100;
            scene.add(spotLight2);

            const spotLight3 = new THREE.SpotLight(0xffffff);
            spotLight3.position.set(-10, 10, -10);
            spotLight3.intensity = 100;
            scene.add(spotLight3);
    }

    export function animate() {
        requestAnimationFrame(animate);        
        if (mixer) mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }

    export function setcolor(color) {
        color = parseInt(color, 16);
        model.getObjectByName('Plan').material = new THREE.MeshStandardMaterial({ color: color });;
    }

    function animations(event) {
        if (action !== null) {
                action.stop();

            if (i % 3 === 0) {
                clip = THREE.AnimationClip.findByName( clips, 'Open.001' );
                action = mixer.clipAction(clip, model).setLoop(THREE.LoopOnce);
                action.play();
                i++;
            } else if (i % 3 === 1) {
                clip = THREE.AnimationClip.findByName(clips, 'Letter out');
                action = mixer.clipAction(clip, model).setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.play();
                i++;
            } else {
                // clip = THREE.AnimationClip.findByName(clips, 'Letter out');
                // action = mixer.clipAction(clip, model);
                // action.stop();
                // action.timeScale = -1;
                // action.play();

                // clip = THREE.AnimationClip.findByName(clips, 'Open.001');
                // action = mixer.clipAction(clip, model).setLoop(THREE.LoopOnce);
                // action.reset().play();

                clip = THREE.AnimationClip.findByName(clips, 'Closed');
                action = mixer.clipAction(clip, model).setLoop(THREE.LoopRepeat);
                action.play();
                i++;

            }
        }
    }
    