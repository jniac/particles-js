import * as utilsjs from './utils.js'
import * as particlesjs from './particles.js'

export let logRenderTime = false

export let ctx, render

export let renderTime = new utilsjs.Variable(60)

export function init(canvas, canvasScale = 2) {

	ctx = canvas.getContext('2d')
	ctx.scale(canvasScale, canvasScale)

	render = function render() {

		let t = -performance.now()

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		ctx.fillStyle = '#8A96AB'
		ctx.rect(0, 0, canvas.width, canvas.height)
		ctx.fill()

		ctx.fillStyle = '#242424'

		for (let p of particlesjs.particles) {

			if (p.killed)
				continue

			ctx.beginPath()
			ctx.ellipse(p.x, p.y, 2, 2, 0, 0, 2 * Math.PI)
			ctx.closePath()
			ctx.fill()

		}

		t += performance.now()

		renderTime.newValue(t)

		if (logRenderTime)
			console.log(t.toFixed(2) + 'ms')

	}

}

