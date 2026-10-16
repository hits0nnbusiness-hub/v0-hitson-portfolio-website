// HitsON 3D hero — peluche girable con aura azul.
// Módulo nativo del navegador (sin build): three.js vive en ./vendor.
import * as THREE from './vendor/three.module.js'
import { GLTFLoader } from './vendor/GLTFLoader.js'
import { OrbitControls } from './vendor/OrbitControls.js'
import { RoomEnvironment } from './vendor/RoomEnvironment.js'

const AURA = new THREE.Color('#2f7bff')
let current = null

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  r.addColorStop(0, 'rgba(120,180,255,0.95)')
  r.addColorStop(0.25, 'rgba(60,130,255,0.55)')
  r.addColorStop(0.6, 'rgba(30,80,255,0.15)')
  r.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function mount(el) {
  unmount()
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
  camera.position.set(0, 0.15, 3.2)

  // Luces: llave cálida + contra azul (el aura)
  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x0a0a14, 0.6))
  const key = new THREE.DirectionalLight(0xfff1e0, 1.6)
  key.position.set(1.5, 2, 2.5)
  scene.add(key)
  const rim = new THREE.PointLight(AURA, 9, 6, 1.6)
  rim.position.set(-0.8, 0.6, -1.2)
  scene.add(rim)
  const rim2 = new THREE.PointLight(0x7fb2ff, 5, 6, 1.6)
  rim2.position.set(0.9, -0.2, -1)
  scene.add(rim2)

  // Aura detrás del peluche
  const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
  aura.scale.set(2.6, 2.6, 1)
  aura.position.set(0, 0.05, -0.6)
  scene.add(aura)

  // Partículas tipo polvo de luz
  const N = 260
  const pos = new Float32Array(N * 3)
  const seed = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const r = 0.6 + Math.random() * 1.4, a = Math.random() * Math.PI * 2
    pos[i * 3] = Math.cos(a) * r
    pos[i * 3 + 1] = (Math.random() - 0.5) * 2.2
    pos[i * 3 + 2] = Math.sin(a) * r - 0.4
    seed[i] = Math.random() * 10
  }
  const pg = new THREE.BufferGeometry()
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.012, color: 0x8fc1ff, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending }))
  scene.add(dust)

  // Sombra suave en el piso
  const sh = document.createElement('canvas')
  sh.width = sh.height = 128
  const sg = sh.getContext('2d')
  const sgrad = sg.createRadialGradient(64, 64, 0, 64, 64, 64)
  sgrad.addColorStop(0, 'rgba(0,0,0,0.55)')
  sgrad.addColorStop(1, 'rgba(0,0,0,0)')
  sg.fillStyle = sgrad
  sg.fillRect(0, 0, 128, 128)
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }))
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -0.52
  scene.add(shadow)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.2
  controls.minPolarAngle = Math.PI * 0.32
  controls.maxPolarAngle = Math.PI * 0.62
  controls.target.set(0, 0, 0)
  let idle = null
  controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idle) })
  controls.addEventListener('end', () => { idle = setTimeout(() => { controls.autoRotate = true }, 2500) })

  const holder = new THREE.Group()
  scene.add(holder)
  new GLTFLoader().load(el.dataset.model || '/hitson3d/models/peluche.glb', (gltf) => {
    const m = gltf.scene
    const box = new THREE.Box3().setFromObject(m)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    m.position.sub(center)
    const s = 1.25 / Math.max(size.x, size.y, size.z)
    holder.scale.setScalar(s)
    m.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material.envMapIntensity = 0.6
        if ('roughness' in o.material) o.material.roughness = Math.max(o.material.roughness, 0.75)
      }
    })
    holder.add(m)
    holder.scale.multiplyScalar(0.001)
    const target = s
    const t0 = performance.now()
    const pop = () => {
      const k = Math.min((performance.now() - t0) / 900, 1)
      const e = 1 - Math.pow(1 - k, 3)
      holder.scale.setScalar(target * (0.001 + 0.999 * e))
      if (k < 1) requestAnimationFrame(pop)
    }
    pop()
    el.dispatchEvent(new CustomEvent('hitson3d-loaded'))
  }, undefined, (err) => console.warn('[HitsON 3D] no se pudo cargar el modelo', err))

  // Inclinación sutil siguiendo el mouse
  const mouse = { x: 0, y: 0 }
  const onMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener('pointermove', onMove)

  const resize = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    camera.aspect = w / h
    camera.position.z = w / h < 0.8 ? 3.9 : 3.2
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  const clock = new THREE.Clock()
  let raf = 0
  const tick = () => {
    const t = clock.getElapsedTime()
    holder.position.y = Math.sin(t * 1.3) * 0.025
    holder.rotation.x += ((mouse.y * 0.12) - holder.rotation.x) * 0.05
    holder.rotation.z += ((-mouse.x * 0.06) - holder.rotation.z) * 0.05
    const p = 1 + Math.sin(t * 2.1) * 0.06
    aura.scale.set(2.6 * p, 2.6 * p, 1)
    aura.material.opacity = 0.75 + Math.sin(t * 1.7) * 0.15
    rim.intensity = 8 + Math.sin(t * 2.1) * 2
    const a = pg.attributes.position.array
    for (let i = 0; i < N; i++) {
      a[i * 3 + 1] += 0.0015 + Math.sin(t + seed[i]) * 0.0004
      if (a[i * 3 + 1] > 1.1) a[i * 3 + 1] = -1.1
    }
    pg.attributes.position.needsUpdate = true
    dust.rotation.y = t * 0.05
    controls.update()
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  tick()

  current = () => {
    cancelAnimationFrame(raf)
    clearTimeout(idle)
    ro.disconnect()
    window.removeEventListener('pointermove', onMove)
    controls.dispose()
    renderer.dispose()
    pmrem.dispose()
    renderer.domElement.remove()
  }
}

function unmount() {
  if (current) { current(); current = null }
}

window.HitsON3D = { mount, unmount }
window.dispatchEvent(new Event('hitson3d-ready'))
