/**
 *
 * Author zhouzy
 * Date   2018/9/17
 */
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import 'three-orbitcontrols';

let model_gltf = require("@Model/modal.gltf");

GLTFLoader(THREE);

var camera, scene, renderer;
var mesh;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material =  new THREE.MeshBasicMaterial({color:0x102010});
    mesh = new THREE.Mesh( geometry,material);
    scene.add( mesh );

    let loader = new GLTFLoader();
    loader.load(model_gltf, function (gltf){
        gltf.scene.updateMatrixWorld();
        gltf.scene.traverse(node => {
            if(node.isMesh){
                node.material = material;
                let materials = Array.isArray(node.material) ? node.material : [node.material];
                materials.forEach(material => {
                    if(material.isMeshStandardMaterial){
                        console.log(JSON.stringify(material));
                    }
                });
            }
        });
        scene.add(gltf.scene);
    }, function(e){ console.log("press:%s",JSON.stringify(e));},
       function ( e ) { console.error( e ); }
    );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
}
