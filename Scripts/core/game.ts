/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

// Create Cube Being (cuBe) Body Parts
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;
var cuBeHead:Mesh;
var cuBeTorso:Mesh;
var cuBeArmLeft:Mesh;
var cuBeArmRight:Mesh;
var cuBeLegLeft:Mesh;
var cuBeLegRight:Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    
    // Setup the default renderer
    setupRenderer(); 
	
    // Setup the Camera
    setupCamera(); 
	
    // Add Axis Helper to Scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to Scene");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive (Floor) to Scene");
     
    
    // Add AmbientLight to Scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add SpotLight to Scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    
    ////////////////////////////////////////////////////
    ////       Start Building Cube Being (cuBe)     ////
    ////////////////////////////////////////////////////
    
    // Create CuBe Torso
    cubeMaterial = new LambertMaterial({color:0xB67DFC});
    cubeGeometry = new CubeGeometry(2, 5, 4);
    cuBeTorso = new Mesh(cubeGeometry, cubeMaterial);
    cuBeTorso.castShadow = true;
    cuBeTorso.receiveShadow = true;
    cuBeTorso.position.y = 7.5;
    
    // Add Torso to Scene
    scene.add(cuBeTorso);
    console.log("Added cuBe's Essential Parts Container(Torso) to Scene");
    
    // Create CuBe Head
    cubeMaterial = new LambertMaterial({color:0xFAE7D0});
    cubeGeometry = new CubeGeometry(1.6, 1.9, 1.8);
    cuBeHead = new Mesh(cubeGeometry, cubeMaterial);
    cuBeHead.castShadow = true;
    cuBeHead.receiveShadow = true;
    cuBeHead.position.y = 3;
    
    // Add Head to Torso Mesh
    cuBeTorso.add(cuBeHead); 
    console.log("Added cuBe's Brains to Scene");    
    
    // Create Left Arm
    cubeMaterial = new LambertMaterial({color:0xFAE7D0});
    cubeGeometry = new CubeGeometry(1, 1, 3);
    cuBeArmLeft = new Mesh(cubeGeometry, cubeMaterial);
    cuBeArmLeft.castShadow = true;
    cuBeArmLeft.receiveShadow = true;
    cuBeArmLeft.position.x = 0;
    cuBeArmLeft.position.y = 1.5;
    cuBeArmLeft.position.z = -3.5;
    
    // Add Left Arm to Torso Mesh
    cuBeTorso.add(cuBeArmLeft);
    console.log("Added cuBe's Left Arm to Scene");
    
    // Create Right Arm
    cubeMaterial = new LambertMaterial({color:0xFAE7D0});
    cubeGeometry = new CubeGeometry(1, 1, 3);
    cuBeArmRight = new Mesh(cubeGeometry, cubeMaterial);
    cuBeArmRight.castShadow = true;
    cuBeArmRight.receiveShadow = true;
    cuBeArmRight.position.x = 0;
    cuBeArmRight.position.y = 1.5;
    cuBeArmRight.position.z = 3.5;
    
    // Add Right Arm to Torso Mesh
    cuBeTorso.add(cuBeArmRight);
    console.log("Added cuBe's Right Arm to Scene");
    
    // Create Left Leg
    cubeMaterial = new LambertMaterial({color:0xFAE7D0});
    cubeGeometry = new CubeGeometry(1, 4, 1);
    cuBeLegLeft = new Mesh(cubeGeometry, cubeMaterial);
    cuBeLegLeft.castShadow = true;
    cuBeLegLeft.receiveShadow = true;
    cuBeLegLeft.position.x = 0;
    cuBeLegLeft.position.y = -4;
    cuBeLegLeft.position.z = -0.9;
    
    // Add Left Leg to Torso Mesh
    cuBeTorso.add(cuBeLegLeft);
    console.log("Added cuBe's Left Light to Scene");
    
    //Create Right Leg
    cubeMaterial = new LambertMaterial({color:0xFAE7D0});
    cubeGeometry = new CubeGeometry(1, 4, 1);
    cuBeLegRight = new Mesh(cubeGeometry, cubeMaterial);
    cuBeLegRight.castShadow = true;
    cuBeLegRight.receiveShadow = true;
    cuBeLegRight.position.x = 0;
    cuBeLegRight.position.y = -4;
    cuBeLegRight.position.z = 0.9;
    
    // Add Right Leg to Torso Mesh
    cuBeTorso.add(cuBeLegRight);
    console.log("Added cuBe's Right Light to Scene");
    
   
    console.log("Finished Building Cube Being to Scene");
    ////////////////////////////////////////////////////
    ////       End Building Cube Being (cuBe)       ////
    ////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////
    ////Start Building Cube Being's Overseer Control////
    ////////////////////////////////////////////////////
    
    // Add Scene Controls
    gui = new GUI();
    
    // Add Overseer Controls 
    //   >> Rotations
    //   >> Outfit Change
    control = new Control(0.1,  false);
	addControl(control);
    console.log("Added Overseer Controls");
    
    // Add Frame Rate Stats
    addStatsObject();
    console.log("Added Stats to Scene");
    
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
    
    //////////////////////////////////////////////////// 
    //// End Building Cube Being's Overseer Control ////
    ////////////////////////////////////////////////////
}
// Setup GUI Controls (for the Overseer) 
function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotateSpeed', -0.5, 0.5);
    gui.add(controlObject, 'rotateX', false);
    gui.add(controlObject, 'rotateY', false);
    gui.add(controlObject, 'rotateZ', false);	
}
// Setup Main Game Loop
function gameLoop(): void {
    stats.update();
    
    // As per Overseer's Will Rotate Cube Being
    if (control.rotateX) {
        cuBeTorso.rotation.x += control.rotateSpeed;
    }
    if (control.rotateY) {
        cuBeTorso.rotation.y += control.rotateSpeed;
    }
    if (control.rotateZ) {
        cuBeTorso.rotation.z += control.rotateSpeed;
    }
        
    // Render Using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // Render the Scene
    renderer.render(scene, camera);
}

//Setup Statistics
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Set Aspect Ratio Based on Window Size
function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Setup Default Renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer");
}

// Setup Main Camera for the Scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera");
}
