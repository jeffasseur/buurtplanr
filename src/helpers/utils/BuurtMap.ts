import { type LatLngTypes, ThreeJSOverlayView } from '@googlemaps/three'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { type ProductGroup, type ProductModel, type ProductMesh, type productUploadData } from '@/types/BUURTTYPES'

export class BuurtMap {
  map: google.maps.Map
  threeOverlay: ThreeJSOverlayView
  loader: GLTFLoader
  scene: THREE.Scene
  mousePosition: THREE.Vector3
  dragOBJ: ProductModel | null
  productformData: productUploadData[]
  latlngformData: LatLngTypes[]
  gnd: string | undefined
  initgndPos: THREE.Vector3 | undefined
  finalgndPos: THREE.Vector3 | undefined
  highlight: ProductModel | null

  constructor (map: google.maps.Map, anchorPoint: LatLngTypes) {
    this.map = map
    this.threeOverlay = new ThreeJSOverlayView({ map, anchor: anchorPoint, animationMode: 'always', upAxis: 'Z' })
    this.scene = this.threeOverlay.scene
    this.loader = new GLTFLoader()
    this.mousePosition = new THREE.Vector3()
    this.dragOBJ = null
    this.productformData = []
    this.initDracoLoader()
    this.gnd = undefined
    this.initgndPos = undefined
    this.finalgndPos = undefined
    this.highlight = null
  }

  initDracoLoader = () => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    this.loader.setDRACOLoader(dracoLoader)
  }

  appendProducts = (modelName: string, mousePos: THREE.Vector3) => {
    this.loader.load(`/models/${modelName}.glb`, (gltf) => {
      const product: ProductGroup = gltf.scene
      product.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      product.modelName = modelName
      product.scale.set(1, 1, 1)
      product.rotation.x = Math.PI / 2
      product.position.copy(mousePos)
      product.isDraggable = true
      this.scene.add(product)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }

  updateHighlight = (visible: boolean) => {
    if (!visible && this.highlight) {
      this.scene.remove(this.highlight)
      this.highlight = null
    } else if (this.dragOBJ) {
      const bbox = new THREE.Box3().setFromObject(this.dragOBJ)
      const width = bbox.max.x - bbox.min.x

      const geometry = new THREE.RingGeometry(width - 1, width - 0.5, 30, 5)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide })
      this.highlight = new THREE.Mesh(geometry, material)
      this.highlight.isHighlighter = true
      this.highlight.position.x = this.dragOBJ.position.x
      this.highlight.position.y = this.dragOBJ.position.y
      this.highlight.position.z = this.dragOBJ.position.z
      this.scene.add(this.highlight)
    }
  }

  placeGround = (mousePos: THREE.Vector3 | undefined) => {
    if (!this.initgndPos && mousePos) this.initgndPos = mousePos.clone()
    else if (this.initgndPos && this.finalgndPos && mousePos) {
      this.finalgndPos = mousePos.clone()
      const width = Math.abs(this.finalgndPos.x - this.initgndPos.x)
      const height = Math.abs(this.finalgndPos.y - this.initgndPos.y)

      // ground geo
      const geometry = new THREE.PlaneGeometry(width, height)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
      const ground: ProductMesh = new THREE.Mesh(geometry, material)
      ground.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      ground.modelName = this.gnd
      ground.isDraggable = true
      ground.position.x = (this.finalgndPos.x + this.initgndPos.x) / 2
      ground.position.y = (this.finalgndPos.y + this.initgndPos.y) / 2
      this.scene.add(ground)

      // reset ground data
      this.gnd = undefined
      this.initgndPos = undefined
      this.finalgndPos = undefined
    }
  }

  updateProductPosition = () => {
    if (this.dragOBJ) { this.dragOBJ.position.copy(this.mousePosition) }
  }

  removeProductById = (productID: number) => {
    const toRemoveProduct = this.scene.children.find((e: ProductModel) => e.modelID === productID)
    if (toRemoveProduct) { this.scene.remove(toRemoveProduct) }
    this.threeOverlay.requestRedraw()
    this.dragOBJ = null
  }

  sendCreation = (url) => {
    this.productformData = []
    this.scene.children.forEach((product: ProductModel) => {
      if (product.hasOwnProperty.call('modelID')) {
        if (product.modelName) {
          const newProduct: productUploadData = { latlng: product.position, modelName: product.modelName }
          this.productformData.push(newProduct)
        }
      }
    })

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.productformData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(async (response) => await response.json())
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }

  placeBnds = () => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(2, 15, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    this.scene.add(dot)
    this.dragOBJ = dot
  }
}
