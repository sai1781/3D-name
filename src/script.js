import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'


/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const matcapTexture = textureLoader.load('/textures/matcaps/3.png')

/**Load the Font */
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log("on Start")
}
loadingManager.oLoaded = () => {
    console.log("on Loaded")
}
loadingManager.onProgress = () => {
    console.log("on Progress")
}
loadingManager.onError = () => {
    console.log("on Error")
}

const fontLoader = new FontLoader(loadingManager)
console.log(fontLoader)

console.log(window.fullscreenElement)

window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
        console.log('go fullscreen')
    } else {
        document.exitFullscreen()
        console.log('Leave Fullscreen')
    }
})

const donutMesh = new THREE.Mesh()


fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    // console.log(font)
    const textgeometry = new TextGeometry(
        "Sai Web developer", {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegment: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
        color: "red"
    }
    )
    // textgeometry.computeBoundingBox()
    // textgeometry.translate(
    //     -(textgeometry.boundingBox.max.x - 0.002)*0.5,
    //     -(textgeometry.boundingBox.max.y - 0.002)*0.5,
    //     -(textgeometry.boundingBox.max.z - 0.003)*0.5,
    // )
    //     (OR) we can below line code easily one line code to center the text
    textgeometry.center()
//     const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
    const material = new THREE.MeshNormalMaterial()
    const text = new THREE.Mesh(textgeometry, material)
    scene.add(text)
    console.time("donutMesh")
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.18, 20, 45)
    for (let i = 0; i < 5000; i++) {

        const donutMesh = new THREE.Mesh(donutGeometry, material)
        donutMesh.position.x = (Math.random() - 0.5) * 50;
        donutMesh.position.z = (Math.random() - 0.5) * 50;
        donutMesh.position.y = (Math.random() - 0.5) * 50;

        //adding different rotation to the donuts
        donutMesh.rotation.x = Math.random() * Math.PI
        donutMesh.rotation.y = Math.random() * Math.PI
        donutMesh.rotation.z = Math.random() * Math.PI
        // Add Randomness in their Scale also
        const scale = Math.random()
        donutMesh.scale.set(scale, scale, scale);
        donutGeometry.center()
        scene.add(donutMesh)
    }
    console.timeEnd("donutMesh")
}
)

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
//Here it is axesHelper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 0.3
// camera.position.y = 0.2
camera.position.z = 3.5
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    donutMesh.rotation.Z = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
