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
  boundLats: object[]

  constructor (map: google.maps.Map, anchorPoint: LatLngTypes) {
    this.map = map
    this.threeOverlay = new ThreeJSOverlayView({ map, anchor: anchorPoint, animationMode: 'always', upAxis: 'Z' })
    this.scene = this.threeOverlay.scene
    this.loader = new GLTFLoader()
    this.mousePosition = new THREE.Vector3()
    this.dragOBJ = null
    this.productformData = []
    this.initThree()
    this.gnd = undefined
    this.initgndPos = undefined
    this.finalgndPos = undefined
    this.highlight = null
    this.boundLats = []
  }

  initThree = () => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    this.loader.setDRACOLoader(dracoLoader)
  }

  appendProducts = (modelName: string, mousePos: { x: number, y: number, z: number } | THREE.Vector3) => {
    this.loader.load(`/models/${modelName}.glb`, (gltf) => {
      const position = new THREE.Vector3(mousePos.x, mousePos.y, mousePos.z)
      const product: ProductGroup = gltf.scene
      product.modelID = Math.floor(Math.random() * Date.now() * Math.PI)
      product.modelName = modelName
      product.scale.set(1, 1, 1)
      product.rotation.x = Math.PI / 2
      product.position.copy(position)
      product.isDraggable = true
      this.scene.add(product)
    })
    this.threeOverlay.requestRedraw()
    this.threeOverlay.requestStateUpdate()
  }

  updateHighlight = (visible: boolean, moving: boolean) => {
    if (!visible && this.highlight) {
      this.scene.remove(this.highlight)
      this.highlight = null
    }

    if (moving && this.highlight && this.dragOBJ) {
      this.highlight.position.x = this.dragOBJ.position.x
      this.highlight.position.y = this.dragOBJ.position.y
      this.highlight.position.z = this.dragOBJ.position.z
      return
    }

    if (this.dragOBJ) {
      const bbox = new THREE.Box3().setFromObject(this.dragOBJ)
      const width = (bbox.max.x - bbox.min.x) + (Math.PI / 2)

      const geometry = new THREE.RingGeometry(width - 1, width - 0.5, 30, 5)
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.FrontSide })
      this.highlight = new THREE.Mesh(geometry, material)
      this.highlight.isHighlighter = true
      this.highlight.position.x = this.dragOBJ.position.x
      this.highlight.position.y = this.dragOBJ.position.y
      this.highlight.position.z = this.dragOBJ.position.z
      this.scene.add(this.highlight)
    }
  }

  checkBoundsScene = () => {
    const toCheck = 'isBound'
    this.scene.children.forEach((el) => {
      if (toCheck in el) {
        this.scene.remove(el)
      }
    })
  }

  joinBounds = () => {
    // check if there are previous instances of the bound class in scene
    this.checkBoundsScene()

    const convertedBounds: THREE.Vector3[] = []
    this.boundLats.forEach((bound: LatLngTypes) => {
      const obj = this.threeOverlay.latLngAltitudeToVector3(bound)
      obj.x = parseFloat(obj.x.toFixed(8))
      obj.y = parseFloat(obj.y.toFixed(8))
      obj.z = -2
      convertedBounds.push(obj)
    })
    convertedBounds.push(convertedBounds[0])
    const planeGeometry = new THREE.BufferGeometry()

    const positions = new Float32Array(convertedBounds.length * 3)
    for (let i = 0; i < convertedBounds.length; i++) {
      positions[i * 3] = convertedBounds[i].x
      positions[i * 3 + 1] = convertedBounds[i].y
      positions[i * 3 + 2] = convertedBounds[i].z
    }

    planeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const indices: number[] = []
    for (let i = 2; i < convertedBounds.length; i++) {
      indices.push(0, i - 1, i)
    }

    planeGeometry.setIndex(indices)
    planeGeometry.computeVertexNormals()

    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    const outlineGeometry = new THREE.EdgesGeometry(planeGeometry)
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 100,
      linecap: 'round',
      linejoin: 'round'
    })
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial)

    const group: ProductGroup = new THREE.Group()
    group.isBound = true
    group.add(outline)
    group.add(planeMesh)
    this.scene.add(group)
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

  rotateProduct = (dir: string) => {
    // let currRotation: number
    const step: number = 20
    if (this.dragOBJ) {
      switch (dir) {
        case 'counter-clockwise':
          if (this.dragOBJ.rotation.y > (340 - step)) this.dragOBJ.rotation.y = 0
          this.dragOBJ.rotation.y = this.dragOBJ.rotation.y += step
          break
        case 'clockwise':
          if (this.dragOBJ.rotation.y < (20 - step)) this.dragOBJ.rotation.y = 360
          this.dragOBJ.rotation.y = this.dragOBJ.rotation.y -= step
          break
      }
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
    const toCheck = 'modelID'
    this.scene.children.forEach((el: ProductModel) => {
      if (toCheck in el) {
        if (el.modelName) {
          const newProduct: productUploadData = { latlng: el.position, modelName: el.modelName }
          this.productformData.push(newProduct)
        }
      }
    })
    console.log(this.productformData)

    // fetch('http://localhost:3002/creaties/new/647f13b8004f0bc27f7795ab/124', {
    //   method: 'POST',
    //   body: JSON.stringify(this.productformData),
    //   headers: { 'Content-type': 'application/json; charset=UTF-8' }
    // })
    //   .then(async (response) => await response.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
    //   .catch((err) => {
    //     return err
    //   })
  }

  placeBnds = (number) => {
    const dot: ProductMesh = new THREE.Mesh(new THREE.SphereGeometry(2, 15, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    dot.modelName = 'bound'
    dot.bndNumber = number
    this.scene.add(dot)
    this.dragOBJ = dot
  }
}
