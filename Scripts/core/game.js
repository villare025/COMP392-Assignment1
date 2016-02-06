/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025)
Last Modified Date:    Thursday, February 5th, 2016
Program Description:   With Three.js, JavaScript, and TypeScript, create a web application that displays a 3D Humanoid Character.
                       The Cube Being (cuBe) will be made from Cube Meshes.
                       GUI Controls should allow the user/overseer to:
                         >> rotate the Cube Being in any direction (x,y,z).
                         >> change the colour properties of Cube Being.
Revision History:      https://github.com/villare025/COMP392-Assignment1/commits/master
Last Modification:     Added More Comments and Fixed Texture
*/
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
// Create Cube Being (cuBe) Game Objects
var cubeGeometry;
var cubeMaterialSkin;
var cubeMaterialHair;
var cubeMaterialOutfit;
var cubeMaterialEyes;
var cuBeTorso;
var cuBeHead;
var cuBeHairTop;
var cuBeHairBack;
var cuBeEyeLeft;
var cuBeEyeRight;
var cuBeArmLeft;
var cuBeArmRight;
var cuBeLegLeft;
var cuBeLegRight;
var cuBeFootLeft;
var cuBeFootRight;
// Set color options hex code (Outfit, Skin, Hair)
var changeOutfit = "#B67DFC";
var changeSkin = "#FAE7D0";
var changeHair = "#595959";
// Set plane texture to grass.jpg
// Image is taken from http://www.tutorialsforblender3d.com/Textures/Grass/textures/Grass_2.png
var texture = THREE.ImageUtils.loadTexture('texture/grass.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(7, 5);
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
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new THREE.MeshPhongMaterial({ map: texture }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    plane.castShadow = true;
    scene.add(plane);
    console.log("Added Plane Primitive (Grass) to Scene");
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
    // Declare CuBe Colors
    cubeMaterialSkin = new LambertMaterial({ color: 0xFAE7D0 });
    cubeMaterialHair = new LambertMaterial({ color: 0x595959 });
    cubeMaterialOutfit = new LambertMaterial({ color: 0xB67DFC });
    cubeMaterialEyes = new LambertMaterial({ color: 0x595959 });
    console.log("Declared cuBe's 'Fifty' Shades");
    // Create CuBe Torso
    cubeGeometry = new CubeGeometry(2, 5, 4);
    cuBeTorso = new Mesh(cubeGeometry, cubeMaterialOutfit);
    cuBeTorso.castShadow = true;
    cuBeTorso.receiveShadow = true;
    cuBeTorso.position.y = 7.5;
    // Add Torso to Scene
    scene.add(cuBeTorso);
    console.log("Added cuBe's Essential Parts Container(Torso) to Scene");
    // Create CuBe Head
    cubeGeometry = new CubeGeometry(1.6, 1.9, 1.8);
    cuBeHead = new Mesh(cubeGeometry, cubeMaterialSkin);
    cuBeHead.castShadow = true;
    cuBeHead.receiveShadow = true;
    cuBeHead.position.y = 3;
    // Add Head to Torso Mesh
    cuBeTorso.add(cuBeHead);
    console.log("Added cuBe's Brains to Scene");
    // Create CuBe Hair Top
    cubeGeometry = new CubeGeometry(1.6, 0.7, 1.8);
    cuBeHairTop = new Mesh(cubeGeometry, cubeMaterialHair);
    cuBeHairTop.castShadow = true;
    cuBeHairTop.receiveShadow = true;
    cuBeHairTop.position.y = 1.3;
    // Add Hair Top to Head Mesh
    cuBeHead.add(cuBeHairTop);
    console.log("Added cuBe's Hair Top to Scene");
    // Create CuBe Hair Back
    cubeGeometry = new CubeGeometry(0.4, 1.6, 1.8);
    cuBeHairBack = new Mesh(cubeGeometry, cubeMaterialHair);
    cuBeHairBack.castShadow = true;
    cuBeHairBack.receiveShadow = true;
    cuBeHairBack.position.x = 1;
    cuBeHairBack.position.y = 0.87;
    // Add Hair Back to Head Mesh
    cuBeHead.add(cuBeHairBack);
    console.log("Added cuBe's Hair Back to Scene");
    // Create CuBe Hair Back
    cubeGeometry = new CubeGeometry(0.4, 1.6, 1.8);
    cuBeHairBack = new Mesh(cubeGeometry, cubeMaterialHair);
    cuBeHairBack.castShadow = true;
    cuBeHairBack.receiveShadow = true;
    cuBeHairBack.position.x = 1;
    cuBeHairBack.position.y = 0.87;
    // Add Hair Back to Head Mesh
    cuBeHead.add(cuBeHairBack);
    console.log("Added cuBe's Hair Back to Scene");
    // Create Left Eye
    cubeGeometry = new CubeGeometry(0.1, 0.5, 0.2);
    cuBeEyeLeft = new Mesh(cubeGeometry, cubeMaterialEyes);
    cuBeEyeLeft.castShadow = true;
    cuBeEyeLeft.receiveShadow = true;
    cuBeEyeLeft.position.x = -0.9;
    cuBeEyeLeft.position.y = 0.5;
    cuBeEyeLeft.position.z = -0.2;
    // Add Left Eye to Head Mesh
    cuBeHead.add(cuBeEyeLeft);
    console.log("Added cuBe's Left Eye to Scene");
    // Create Right Eye
    cubeGeometry = new CubeGeometry(0.1, 0.5, 0.2);
    cuBeEyeRight = new Mesh(cubeGeometry, cubeMaterialEyes);
    cuBeEyeRight.castShadow = true;
    cuBeEyeRight.receiveShadow = true;
    cuBeEyeRight.position.x = -0.9;
    cuBeEyeRight.position.y = 0.5;
    cuBeEyeRight.position.z = 0.2;
    // Add Right Eye to Head Mesh
    cuBeHead.add(cuBeEyeRight);
    console.log("Added cuBe's Right Eye to Scene");
    // Create Left Arm
    cubeGeometry = new CubeGeometry(1, 1, 3);
    cuBeArmLeft = new Mesh(cubeGeometry, cubeMaterialSkin);
    cuBeArmLeft.castShadow = true;
    cuBeArmLeft.receiveShadow = true;
    cuBeArmLeft.position.x = 0;
    cuBeArmLeft.position.y = 1.5;
    cuBeArmLeft.position.z = -3.5;
    // Add Left Arm to Torso Mesh
    cuBeTorso.add(cuBeArmLeft);
    console.log("Added cuBe's Left Arm to Scene");
    // Create Right Arm
    cubeGeometry = new CubeGeometry(1, 1, 3);
    cuBeArmRight = new Mesh(cubeGeometry, cubeMaterialSkin);
    cuBeArmRight.castShadow = true;
    cuBeArmRight.receiveShadow = true;
    cuBeArmRight.position.x = 0;
    cuBeArmRight.position.y = 1.5;
    cuBeArmRight.position.z = 3.5;
    // Add Right Arm to Torso Mesh
    cuBeTorso.add(cuBeArmRight);
    console.log("Added cuBe's Right Arm to Scene");
    // Create Left Leg
    cubeGeometry = new CubeGeometry(1, 4, 1);
    cuBeLegLeft = new Mesh(cubeGeometry, cubeMaterialSkin);
    cuBeLegLeft.castShadow = true;
    cuBeLegLeft.receiveShadow = true;
    cuBeLegLeft.position.x = 0;
    cuBeLegLeft.position.y = -4;
    cuBeLegLeft.position.z = -0.9;
    // Add Left Leg to Torso Mesh
    cuBeTorso.add(cuBeLegLeft);
    console.log("Added cuBe's Left Leg to Scene");
    //Create Right Leg
    cubeGeometry = new CubeGeometry(1, 4, 1);
    cuBeLegRight = new Mesh(cubeGeometry, cubeMaterialSkin);
    cuBeLegRight.castShadow = true;
    cuBeLegRight.receiveShadow = true;
    cuBeLegRight.position.x = 0;
    cuBeLegRight.position.y = -4;
    cuBeLegRight.position.z = 0.9;
    // Add Right Leg to Torso Mesh
    cuBeTorso.add(cuBeLegRight);
    console.log("Added cuBe's Right Leg to Scene");
    // Create Left Foot/Shoe
    cubeGeometry = new CubeGeometry(1.6, 0.7, 1);
    cuBeFootLeft = new Mesh(cubeGeometry, cubeMaterialOutfit);
    cuBeFootLeft.castShadow = true;
    cuBeFootLeft.receiveShadow = true;
    cuBeFootLeft.position.x = -0.3;
    cuBeFootLeft.position.y = -2.35;
    // Add Left Foot to Left Leg Mesh
    cuBeLegLeft.add(cuBeFootLeft);
    console.log("Added cuBe's Left Shoe to Scene");
    // Create Right Foot/Shoe
    cubeGeometry = new CubeGeometry(1.6, 0.7, 1);
    cuBeFootRight = new Mesh(cubeGeometry, cubeMaterialOutfit);
    cuBeFootRight.castShadow = true;
    cuBeFootRight.receiveShadow = true;
    cuBeFootRight.position.x = -0.3;
    cuBeFootRight.position.y = -2.35;
    // Add Right Foot to Right Leg Mesh
    cuBeLegRight.add(cuBeFootRight);
    console.log("Added cuBe's Right Shoe to Scene");
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
    control = new Control(0.1, false, changeOutfit, changeSkin, changeHair);
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
function addControl(controlObject) {
    // Rotation Controls [ speed, onX, onY, onZ ]
    gui.add(controlObject, 'rotateSpeed', -0.5, 0.5);
    gui.add(controlObject, 'rotateX', false);
    gui.add(controlObject, 'rotateY', false);
    gui.add(controlObject, 'rotateZ', false);
    // Color Controls [ Outfit(Torso/Shoes), Skin, Hair ]
    gui.addColor(controlObject, 'changeOutfit').onChange(function (color) { cubeMaterialOutfit.color = new Color(color); });
    gui.addColor(controlObject, 'changeSkin').onChange(function (color) { cubeMaterialSkin.color = new Color(color); });
    gui.addColor(controlObject, 'changeHair').onChange(function (color) { cubeMaterialHair.color = new Color(color); });
}
// Setup Main Game Loop
function gameLoop() {
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