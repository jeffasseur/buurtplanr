import { type LatLngTypes, ThreeJSOverlayView } from '@googlemaps/three'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { type project, type productUploadData, type product } from '@/types/BUURTTYPES'

export class BuurtMap {
  map: google.maps.Map
  threeOverlay: ThreeJSOverlayView
  loader: GLTFLoader
  scene: THREE.Scene
  mousePosition: THREE.Vector3
  dragOBJ: THREE.Object3D | null
  productformData: productUploadData[]
  latlngformData: LatLngTypes[]

  constructor (map: google.maps.Map, anchorPoint: LatLngTypes) {
    this.map = map
    this.threeOverlay = new ThreeJSOverlayView({ map, anchor: anchorPoint, animationMode: 'always', upAxis: 'Z' })
    this.scene = this.threeOverlay.scene
    this.loader = new GLTFLoader()
    this.mousePosition = new THREE.Vector3()
    this.dragOBJ = null
    this.productformData = []
    this.initDracoLoader()
  }

  initDracoLoader = () => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    this.loader.setDRACOLoader(dracoLoader)
  }

  appendModel = (el) => {
    this.loader.load('/models/marker.glb', (gltf) => {
      const product: product = gltf.scene
      product.projectId = el._id
      console.log(product.projectId)
      product.scale.set(20, 20, 20)
      product.rotation.x = Math.PI / 2
      const lat = el.location.coordinates.lat
      const lng = el.location.coordinates.lng
      product.position.copy(this.threeOverlay.latLngAltitudeToVector3({ lat, lng }))
      this.scene.add(product)
    })
  }

  appendProducts = (modelType: string) => {
    this.loader.load(`/models/${modelType}.glb`, (gltf) => {
      const product: product = gltf.scene
      product.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      product.modelType = modelType
      product.scale.set(1, 1, 1)
      product.rotation.x = Math.PI / 2
      product.position.copy(this.mousePosition)
      product.isDraggable = true
      this.scene.add(product)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }

  updateProductPosition = () => {
    if (this.dragOBJ) { this.dragOBJ.position.copy(this.mousePosition) }
  }

  removeProductById = (productID: number) => {
    const toRemoveProduct = this.scene.children.find(e => e.modelID === productID)
    if (toRemoveProduct) { this.scene.remove(toRemoveProduct) }
    this.threeOverlay.requestRedraw()
    this.dragOBJ = null
  }

  getSceneProducts = () => {
    this.productformData = []
    this.scene.children.forEach(product => {
      if (product.hasOwnProperty('modelID')) {
        const newProduct = { latlng: product.position, modelType: product.modelType }
        this.productformData.push(newProduct)
      }
    })
    console.log(this.productformData)
  }

  placeBnds = () => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(2, 15, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    this.scene.add(dot)
    this.dragOBJ = dot
  }
}
