/**
 *
 * Author zhouzy
 * Date   2018/9/17
 */
import * as THREE from 'three';

import GLTFLoader from 'three-gltf-loader';
import {OBJLoader} from 'three-obj-mtl-loader';
import 'three-orbitcontrols';

GLTFLoader(THREE);
//OBJLoader(THREE);

var container, stats, controls;
var camera, scene, renderer, light;


init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7ac619);

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );

    controls = new THREE.OrbitControls(camera);
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add(cube);

    // let loader = new GLTFLoader();
    // loader.load('./dist/modal.gltf', function (gltf){
    //     gltf.scene.updateMatrixWorld();
    //     gltf.scene.traverse(node => {
    //         if(node.isMesh){
    //             let materials = Array.isArray(node.material) ? node.material : [node.material];
    //             materials.forEach(material => {
    //                 if(material.isMeshStandardMaterial){
    //                     console.log(JSON.stringify(material));
    //                 }
    //             });
    //         }
    //     });
    //     scene.add(gltf.scene);
    // }, function(e){ console.log("press:%s",JSON.stringify(e));},
    //    function ( e ) { console.error( e ); }
    // );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    container.appendChild(renderer.domElement );
    window.addEventListener('resize', onWindowResize, false );
    controls.update();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    //controls.update();
}

