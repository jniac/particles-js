import * as renderjs from '../src/render.js'
export { renderjs }

import * as particlesjs from '../src/particles.js'
export { particlesjs }

import * as geomjs from '../src/geom.js'
export { geomjs }

import * as utilsjs from '../src/utils.js'
export { utilsjs }

import { random as R } from '../src/utils.js'
export { R }

export let params = {

	fireCount: 40,

}




let canvas = document.querySelector('canvas')
let canvasScale = 2
let center = {}


function fit() {

	canvas.width = window.innerWidth * canvasScale
	canvas.height = window.innerHeight * canvasScale

	canvas.style.width = window.innerWidth + 'px'
	canvas.style.height = window.innerHeight + 'px'

	center.x = window.innerWidth / 2
	center.y = window.innerHeight / 2

}

window.addEventListener('resize', fit)
fit()



export let circle = new geomjs.Circle(0, 0, 50)
export let triangle = new geomjs.Triangle(center.x + 50, center.y, center.x + 50, center.y + 50, center.x, center.y + 50)



renderjs.init(canvas, canvasScale)


let paused = false

function animate() {

	requestAnimationFrame(animate)

	if (paused)
		return

	particlesjs.update(1 / 60)

	for (let p of particlesjs.particles)
		if (circle.contains(p) || triangle.contains(p))
			p.kill()

	renderjs.render()

	circle.draw(renderjs.ctx)
	triangle.draw(renderjs.ctx)
	triangle.A.toCircle(10).draw(renderjs.ctx)
	triangle.B.toCircle(4).draw(renderjs.ctx)

	document.querySelector('.particlesCount span.value').innerHTML = particlesjs.particlesCount.average.toFixed(2)
	document.querySelector('.particlesUpdate span.value').innerHTML = particlesjs.updateTime.average.toFixed(3) + 'ms'
	document.querySelector('.renderTime span.value').innerHTML = renderjs.renderTime.average.toFixed(2) + 'ms'

	for (let i = 0; i < params.fireCount; i++)
		fire()

}

window.onkeydown = event => { paused = event.key === ' ' ? !paused : paused }




export let bounds = new geomjs.Bounds().set(0, 0, window.innerWidth, window.innerHeight).inflate(-200)

function fire() {

	let p = new particlesjs.Particle()
	p.bounds = bounds

	if (R.float() < .5) {

		p.x = center.x
		p.y = center.y

	} else {

		p.x = R.between(bounds.ax, bounds.bx)
		p.y = R.between(bounds.ay, bounds.by)

	}

	p.timeMax = R.between(1, 2)
	p.velocityLengthAngle(R.between(100, 200), R.between(0, 360))

}


animate()

export let A = new geomjs.Point(-50, -50)
export let B = new geomjs.Point(20, 80)
export let C = new geomjs.Point(40, -10)

A.setXY(14, -34)
B.setXY(-34, -59)
C.setXY(19, 93)

window.onmousemove = event => {

	if (event.shiftKey) {

		circle.x = event.pageX
		circle.y = event.pageY

	} else {

		triangle.A = A.clone().offset(event.pageX, event.pageY)
		triangle.B = B.clone().offset(event.pageX, event.pageY)
		triangle.C = C.clone().offset(event.pageX, event.pageY)
		console.log(triangle.positive)

	}

}

window.onclick = event => {

	A.setXY(R.between(-100, 100), R.between(-100, 100))
	B.setXY(R.between(-100, 100), R.between(-100, 100))
	C.setXY(R.between(-100, 100), R.between(-100, 100))

}


