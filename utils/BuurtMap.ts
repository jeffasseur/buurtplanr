import { type LatLngTypes, ThreeJSOverlayView } from '@googlemaps/three'
import { Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class BuurtMap {
  threeOverlay: ThreeJSOverlayView
  loader: GLTFLoader
  scene: THREE.Scene
  mousePosition: Vector3

  constructor() {
    this.threeOverlay = new ThreeJSOverlayView({ animationMode: 'always' })
    this.loader = new GLTFLoader()
    this.scene = this.threeOverlay.scene
    this.mousePosition = new Vector3()
  }

  BuildMap = (map: google.maps.Map, anchorPoint: LatLngTypes) => {
    this.threeOverlay.setMap(map)
    this.threeOverlay.setAnchor(anchorPoint)
  }

  updateMousePos = async (mousePosition: LatLngTypes) => {
    this.mousePosition.copy(this.threeOverlay.latLngAltitudeToVector3(mousePosition))
    return await Promise.resolve(this.mousePosition)
  }

  appendModel = (el) => {
    this.loader.load('/models/marker.glb', (gltf) => {
      gltf.scene.projectId = el.id
      gltf.scene.scale.set(20, 20, 20)
      gltf.scene.rotation.x = Math.PI / 2
      const lat = el.coordinates.lat
      const lng = el.coordinates.lng
      gltf.scene.position.copy(this.threeOverlay.latLngAltitudeToVector3({ lat, lng }))
      this.scene.add(gltf.scene)
    })
  }

  appendProducts = (modelType: string) => {
    this.loader.load(`/models/${modelType}.glb`, (gltf) => {
      gltf.scene.scale.set(80, 80, 80)
      gltf.scene.rotation.x = Math.PI / 2
      gltf.scene.position.copy(this.mousePosition)
      this.scene.add(gltf.scene)
      console.log(this.scene)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }
}
