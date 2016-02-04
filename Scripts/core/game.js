/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
// Create Cube Being (cuBe) Body Parts
var cubeGeometry;
var cubeMaterial;
var cuBeHead;
var cuBeTorso;
var cuBeArmLeft;
var cuBeArmRight;
var cuBeLegLeft;
var cuBeLegRight;
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
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
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
    cubeMaterial = new LambertMaterial({ color: 0xB67DFC });
    cubeGeometry = new CubeGeometry(2, 5, 4);
    cuBeTorso = new Mesh(cubeGeometry, cubeMaterial);
    cuBeTorso.castShadow = true;
    cuBeTorso.receiveShadow = true;
    cuBeTorso.position.y = 7.5;
    // Add Torso to Scene
    scene.add(cuBeTorso);
    console.log("Added cuBe's Essential Parts Container(Torso) to Scene");
    // Create CuBe Head
    cubeMaterial = new LambertMaterial({ color: 0xFAE7D0 });
    cubeGeometry = new CubeGeometry(1.6, 1.9, 1.8);
    cuBeHead = new Mesh(cubeGeometry, cubeMaterial);
    cuBeHead.castShadow = true;
    cuBeHead.receiveShadow = true;
    cuBeHead.position.y = 3;
    // Add Head to Torso Mesh
    cuBeTorso.add(cuBeHead);
    console.log("Added cuBe's Brains to Scene");
    // Create Left Arm
    cubeMaterial = new LambertMaterial({ color: 0xFAE7D0 });
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
    cubeMaterial = new LambertMaterial({ color: 0xFAE7D0 });
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
    cubeMaterial = new LambertMaterial({ color: 0xFAE7D0 });
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
    cubeMaterial = new LambertMaterial({ color: 0xFAE7D0 });
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
    // Add Frame Rate Stats
    addStatsObject();
    console.log("Added Stats to Scene");
    // Add Overseer Controls 
    //   >> Rotations
    //   >> Outfit Change
    console.log("Added Overseer Controls");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
    //////////////////////////////////////////////////// 
    //// End Building Cube Being's Overseer Control ////
    ////////////////////////////////////////////////////
}
// Setup Main Game Loop
function gameLoop() {
    stats.update();
    // Render Using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // Render the Scene
    renderer.render(scene, camera);
}
// Setup GUI Controls (for the Overseer) 
function addControl(controlObject) {
    gui.add(controlObject, 'clone');
    for (var index = 0; index < 8; index++) {
        var folder;
        folder = gui.addFolder('Vertices ' + (index + 1));
        folder.add(controlObject.points[index], 'x', -10, 10);
        folder.add(controlObject.points[index], 'y', -10, 10);
        folder.add(controlObject.points[index], 'z', -10, 10);
    }
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
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Setup Default Renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer");
}
// Setup Main Camera for the Scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera");
}
//# sourceMappingURL=game.js.map