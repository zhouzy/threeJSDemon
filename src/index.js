/**
 *
 * Author zhouzy
 * Date   2018/9/17
 */
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import GLTFloader from 'three-gltf-loader';

GLTFloader(THREE);

var container;

var camera, scene, renderer,light;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var object;

init();

animate();

function init() {

    container = document.createElement( 'div' );

    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );

    camera.position.set( -1.8, 2, -2.7 );

    // scene
    scene = new THREE.Scene();

    scene.add(camera);
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
    light.position.set( 0, 0, 0 );
    scene.add(light);
    // var cube = new THREE.Mesh(
    //     new THREE.CubeGeometry( 1,1,1 ),
    //     new THREE.MeshNormalMaterial()
    // );
    // scene.add( cube );
    var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } );

    // model

    var controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, - 0.2, - 0.2 );
    controls.update();

    function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }

    function onError( xhr ) {
        console.log("加载失败" + xhr);
    }

    var loader = new GLTFloader();

    loader.load('./dist/tiki_treasure/scene.gltf', function ( obj ) {
        // obj.scene.traverse( function ( child ) {
        //     if ( child.isMesh ) {
        //         child.material = material;
        //     }
        // } );
        scene = obj.scene;
    }, onProgress, onError );


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

//
function animate() {
    //requestAnimationFrame( animate );
    render();
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt(0,0,0);
    renderer.render( scene, camera );
}


