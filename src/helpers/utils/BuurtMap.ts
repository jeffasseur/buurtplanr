import * as THREE from 'three'
import { type LatLngTypes, ThreeJSOverlayView } from '@googlemaps/three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { project, productUploadData } from '@/types/BUURTTYPES';

export class BuurtMap {
  map: google.maps.Map
  threeOverlay: ThreeJSOverlayView
  loader: GLTFLoader
  scene: THREE.Scene
  mousePosition: THREE.Vector3
  dragOBJ: THREE.Object3D | null
  productformData: productUploadData[]

  constructor(map: google.maps.Map, anchorPoint: LatLngTypes) {
    this.map = map
    this.threeOverlay = new ThreeJSOverlayView({ map, anchor: anchorPoint, animationMode: 'always', upAxis: 'Z' })
    this.scene = this.threeOverlay.scene
    this.loader = new GLTFLoader()
    this.mousePosition = new THREE.Vector3()
    this.dragOBJ = null
    this.productformData = []
  }

  updateMousePosition = async (mousePosition: THREE.Vector2) => {
    this.mousePosition.copy(this.threeOverlay.latLngAltitudeToVector3(mousePosition))
    return await Promise.resolve(this.mousePosition)
  }

  appendModel = (el: project) => {
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
      gltf.scene.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      gltf.scene.modelType = modelType
      gltf.scene.scale.set(80, 80, 80)
      gltf.scene.rotation.x = Math.PI / 2
      gltf.scene.position.copy(this.mousePosition)
      gltf.scene.isDraggable = true
      this.scene.add(gltf.scene)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }

  updateProductPosition = () => {
    if (this.dragOBJ)
      this.dragOBJ.position.copy(this.mousePosition)
  }

  removeProductById = (productID: number) => {
    const toRemoveProduct = this.scene.children.find(e => e.modelID === productID)
    if (toRemoveProduct)
      this.scene.remove(toRemoveProduct)
    this.threeOverlay.requestRedraw()
  }

  getSceneProducts = () => {
    this.productformData = []
    this.scene.children.forEach(product => {
      if (product.hasOwnProperty('modelID')) {
        let newProduct = { latlng: product.position, modelType: product.modelType }
        this.productformData.push(newProduct)
      }
    })
    console.log(this.productformData)
  }

  placeBnds = () => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(2, 15, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    this.scene.add(dot);
    this.dragOBJ = dot
  }
}
