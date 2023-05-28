import { type LatLngTypes, ThreeJSOverlayView } from '@googlemaps/three'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { type productUploadData, type product } from '@/types/BUURTTYPES'

export class BuurtMap {
  map: google.maps.Map
  threeOverlay: ThreeJSOverlayView
  loader: GLTFLoader
  scene: THREE.Scene
  mousePosition: THREE.Vector3
  dragOBJ: THREE.Object3D | null
  productformData: productUploadData[]
  latlngformData: LatLngTypes[]
  gnd: string | null
  initgndPos: THREE.Vector3 | null
  finalgndPos: THREE.Vector3 | null

  constructor (map: google.maps.Map, anchorPoint: LatLngTypes) {
    this.map = map
    this.threeOverlay = new ThreeJSOverlayView({ map, anchor: anchorPoint, animationMode: 'always', upAxis: 'Z' })
    this.scene = this.threeOverlay.scene
    this.loader = new GLTFLoader()
    this.mousePosition = new THREE.Vector3()
    this.dragOBJ = null
    this.productformData = []
    this.initDracoLoader()
    this.gnd = null
    this.initgndPos = null
    this.finalgndPos = null
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
      product.scale.set(20, 20, 20)
      product.rotation.x = Math.PI / 2
      const lat = el.location.coordinates.lat
      const lng = el.location.coordinates.lng
      product.position.copy(this.threeOverlay.latLngAltitudeToVector3({ lat, lng }))
      this.scene.add(product)
    })
  }

  appendProducts = (modelName: string) => {
    this.loader.load(`/models/${modelName}.glb`, (gltf) => {
      const product: product = gltf.scene
      product.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      product.modelName = modelName
      product.scale.set(1, 1, 1)
      product.rotation.x = Math.PI / 2
      product.position.copy(this.mousePosition)
      product.isDraggable = true
      this.scene.add(product)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }

  placeGround = () => {
    if (!this.initgndPos) this.initgndPos = this.mousePosition.clone()
    else {
      this.finalgndPos = this.mousePosition.clone()
      const width = Math.abs(this.finalgndPos.x - this.initgndPos.x)
      const height = Math.abs(this.finalgndPos.y - this.initgndPos.y)

      // ground geo
      const geometry = new THREE.PlaneGeometry(width, height)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
      const ground = new THREE.Mesh(geometry, material)
      ground.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      ground.modelName = this.gnd
      ground.isDraggable = true
      ground.position.x = (this.finalgndPos.x + this.initgndPos.x) / 2
      ground.position.y = (this.finalgndPos.y + this.initgndPos.y) / 2
      this.scene.add(ground)

      // reset ground data
      this.gnd = null
      this.initgndPos = null
      this.finalgndPos = null
    }
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

  sendCreation = (url) => {
    this.productformData = []
    this.scene.children.forEach(product => {
      if (product.hasOwnProperty('modelID')) {
        const newProduct = { latlng: product.position, modelName: product.modelName }
        this.productformData.push(newProduct)
      }
    })

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.productformData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(async (response) => await response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  placeBnds = () => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(2, 15, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    this.scene.add(dot)
    this.dragOBJ = dot
  }
}
