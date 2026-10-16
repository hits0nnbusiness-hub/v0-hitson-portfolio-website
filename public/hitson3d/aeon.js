// AEON — bot acompañante de HitsON. Flota, sigue el scroll y mira hacia el cursor.
import * as THREE from './vendor/three.module.js'
import { GLTFLoader } from './vendor/GLTFLoader.js'
import { RoomEnvironment } from './vendor/RoomEnvironment.js'

let stop = null

function beamTexture() {
  const c = document.createElement('canvas')
  c.width = 64; c.height = 256
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, 'rgba(120,255,240,0.9)')
  grad.addColorStop(0.35, 'rgba(60,220,210,0.35)')
  grad.addColorStop(1, 'rgba(0,160,160,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function glow(color) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  r.addColorStop(0, color)
  r.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function mount(el, onClick) {
  if (stop) stop()
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.9
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.add(new THREE.HemisphereLight(0xcfe3ff, 0x101018, 0.5))
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(2, 3, 4)
  scene.add(key)
  const rim = new THREE.PointLight(0x2f7bff, 6, 0, 2)
  scene.add(rim)

  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 1000)
  const root = new THREE.Group()   // flote + giro
  scene.add(root)
  let mixer = null, ready = false, size = 1, eyeGlowPos = null

  new GLTFLoader().load(el.dataset.model || '/hitson3d/models/aeon.glb', (gltf) => {
    const m = gltf.scene
    m.traverse((o) => {
      if (!o.isMesh) return
      o.frustumCulled = false
      if (/^Icosphere/i.test(o.name)) { o.visible = false; return }   // sin pelotas negras en las patas
      const mt = o.material
      if (!mt) return
      if (mt.name === 'Iron') {                 // patas: óxido naranja como en Blender
        mt.color.set('#b0601f'); mt.metalness = 0.35; mt.roughness = 0.75
      }
      if (mt.name === 'Material.003') {        // pantalla del ojo: negra brillante
        mt.color.set('#050608'); mt.emissive.set('#000000'); mt.emissiveIntensity = 0
        mt.metalness = 0.2; mt.roughness = 0.15
      }
      if (mt.emissive && mt.emissiveIntensity > 3) mt.emissiveIntensity = 1.4
    })
    // centrar con las piezas reales (sin calcomanías sueltas)
    const box = new THREE.Box3()
    m.traverse((o) => { if (o.isMesh && o.visible && !/^Decal/i.test(o.name)) box.expandByObject(o) })
    const c = box.getCenter(new THREE.Vector3())
    const s = box.getSize(new THREE.Vector3())
    size = Math.max(s.x, s.y, s.z)
    const pivot = new THREE.Group()
    m.position.sub(c)
    pivot.add(m)
    root.add(pivot)
    // girar para que el ojo quede de frente a la cámara
    let eye = null
    m.traverse((o) => { if (o.isMesh && o.name === 'Cylinder') eye = o })
    root.updateMatrixWorld(true)
    if (eye) {
      const eb = new THREE.Box3().setFromObject(eye)
      const ec = eb.getCenter(new THREE.Vector3())
      pivot.rotation.y = -Math.atan2(ec.x, ec.z)
      root.updateMatrixWorld(true)
      // ojito cerrado "^" en cyan sobre la pantalla negra
      const eb2 = new THREE.Box3().setFromObject(eye)
      const ec2 = eb2.getCenter(new THREE.Vector3())
      const es = eb2.getSize(new THREE.Vector3())
      const cv = document.createElement('canvas'); cv.width = cv.height = 256
      const g = cv.getContext('2d')
      g.strokeStyle = '#7ff7ee'; g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round'
      g.shadowColor = '#3ff0e0'; g.shadowBlur = 28
      g.beginPath(); g.moveTo(64, 168); g.lineTo(128, 82); g.lineTo(192, 168); g.stroke()
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace
      const lid = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }))
      const w = Math.max(es.x, es.y) * 0.8
      lid.scale.set(w, w, 1)
      lid.position.set(ec2.x, ec2.y, eb2.max.z + size * 0.004)
      root.add(lid)
      eyeGlowPos = new THREE.Vector3(ec2.x, ec2.y, eb2.max.z + size * 0.01)
    }

    // brillo suave del ojo (sin cono, así no corta el cuadro) y del propulsor
    const beam = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow('rgba(90,255,235,0.55)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    beam.scale.set(size * 0.55, size * 0.55, 1)
    beam.position.copy(eyeGlowPos || new THREE.Vector3(0, size * 0.2, size * 0.4))
    root.add(beam)
    const thr = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow('rgba(80,140,255,0.9)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    thr.scale.set(size * 0.8, size * 0.42, 1)
    thr.position.set(0, -size * 0.5, 0)
    root.add(thr)
    root.userData = { beam, thr }

    rim.position.set(-size, size * 0.5, -size)
    camera.position.set(0, size * 0.25, size * 2.6)
    camera.lookAt(0, 0, 0)

    mixer = new THREE.AnimationMixer(m)
    gltf.animations.filter((a) => a.duration > 0).forEach((a) => mixer.clipAction(a).play())
    ready = true
    el.dispatchEvent(new CustomEvent('aeon-loaded'))
  }, undefined, (e) => console.warn('[AEON] no cargó', e))

  // mirar al cursor
  const look = { x: 0, y: 0 }, cur = { x: 0, y: 0 }
  const onMove = (e) => {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    look.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)))
    look.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
  }
  window.addEventListener('pointermove', onMove)

  let hop = 0
  const onDown = () => { hop = 1; onClick && onClick() }
  renderer.domElement.addEventListener('pointerdown', onDown)

  const resize = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  const clock = new THREE.Clock()
  let raf = 0, last = 0, visible = true
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(el)
  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    if (!visible || document.hidden || now - last < 33) return   // ~30 fps máx
    const dt = Math.min(clock.getDelta(), 0.1)
    last = now
    if (!ready) return
    const t = clock.elapsedTime
    mixer.update(dt)
    cur.x += (look.x - cur.x) * 0.06
    cur.y += (look.y - cur.y) * 0.06
    hop = Math.max(0, hop - dt * 1.8)
    root.position.y = Math.sin(t * 2.1) * size * 0.04 + Math.sin(hop * Math.PI) * size * 0.25
    root.rotation.y = cur.x * 1.1
    root.rotation.x = cur.y * 0.45
    root.rotation.z = Math.sin(t * 1.3) * 0.04
    const { beam, thr } = root.userData
    beam.material.opacity = 0.35 + Math.sin(t * 6) * 0.08
    thr.material.opacity = 0.7 + Math.sin(t * 9) * 0.2
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(tick)

  stop = () => {
    cancelAnimationFrame(raf)
    ro.disconnect(); io.disconnect()
    window.removeEventListener('pointermove', onMove)
    renderer.domElement.removeEventListener('pointerdown', onDown)
    renderer.dispose(); pmrem.dispose()
    renderer.domElement.remove()
    stop = null
  }
}

window.AEON3D = { mount, unmount: () => stop && stop() }
window.dispatchEvent(new Event('aeon3d-ready'))
