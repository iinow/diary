<style>
</style>

<script lang="ts">
  import { onMount } from 'svelte'

  class WaveBackground {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    stageWidth: number
    stageHeight: number
    wave: Wave

    constructor() {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      document.body.appendChild(this.canvas)

      this.wave = new Wave()

      window.addEventListener('resize', this.resize.bind(this), false)
      this.resize()

      requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
      this.stageWidth = document.body.clientWidth
      this.stageHeight = document.body.clientHeight

      this.canvas.width = this.stageWidth * 2
      this.canvas.height = this.stageHeight * 2
      this.ctx.scale(2, 2)

      this.wave.resize(this.stageWidth, this.stageHeight)
    }

    animate() {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
      this.wave.draw(this.ctx)
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  class Point {
    fixedY: number
    speed = 0.1
    cur = 0
    max = Math.random() * 100 + 150

    constructor(public x: number, public y: number) {
      this.fixedY = y
    }

    update() {
      this.cur += this.speed
      this.y = this.fixedY + Math.sin(this.cur) * this.max
    }
  }

  class Wave {
    stageWidth: number
    stageHeight: number
    centerX: number
    centerY: number
    point: Point

    constructor() {}

    resize(stageWidth: number, stageHeight: number) {
      this.stageHeight = stageHeight
      this.stageWidth = stageWidth

      this.centerX = stageWidth / 2
      this.centerY = stageHeight / 2

      this.init()
    }

    init() {
      this.point = new Point(this.centerX, this.centerY)
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.fillStyle = '#ff0000'
      this.point.update()

      ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  // onMount(() => new WaveBackground())
</script>
