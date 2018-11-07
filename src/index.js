/**
 *
 * Author zhouzy
 * Date   2018/9/17
 */
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OBJLoader from 'three-obj-loader';
import 'three-orbitcontrols';

GLTFLoader(THREE);
OBJLoader(THREE);

var container, stats, controls;
var camera, scene, renderer, light;

init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.scale.set(0.5,0.5,0.5);

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set(-1,-1,-1);
    var light = new THREE.PointLight( 0xffffff, 1 );
    camera.add( light );

    controls = new THREE.OrbitControls( camera );

    var ambientLight = new THREE.AmbientLight( 0xffffff);
    scene.add( ambientLight);
    scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});

    let spoltLight = new THREE.SpotLight(0xFFF000);
    spoltLight.position.set(1, 1, 1);
    spoltLight.target = scene;

    let loader = new GLTFLoader();
    loader.load('modal.gltf', function ( gltf ) {
        gltf.scene.traverse(e => {
            if(e.position){
                console.log(JSON.stringify(e.position));
            }
        });
        scene.add(gltf.scene);



        camera.lookAt(scene.position);
    }, undefined, function ( e ) {
        console.error( e );
    } );


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );
    //renderer.setClearColor(0xffffff,1.0);
    window.addEventListener( 'resize', onWindowResize, false );
    controls.update();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
    controls.update();
}

