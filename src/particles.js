import * as utilsjs from './utils.js'
import { Point } from './geom.js'

export let particles = []
export class Particle {

	constructor(x = 0, y = 0) {

		this.enabled = true

		this.time = 0
		this.timeMax = Infinity
		this.timeScale = 1

		this.x = x
		this.y = y

		this.vx = 0
		this.vy = 0

		this.spin = 0
		this.orientation = 0

		particles.push(this)

	}

	velocityLengthAngle(length, angle) {

		this.vx = length * Math.cos(angle)
		this.vy = length * Math.sin(angle)

		return this

	}

	update(deltaTime) {

		this.time += deltaTime * this.timeScale

		this.x += this.vx * deltaTime
		this.y += this.vy * deltaTime
		this.orientation += this.spin * deltaTime

		if (this.time > this.timeMax)
			this.kill()

		if (this.bounds && !this.bounds.containsXY(this.x, this.y))
			this.kill()

	}

	kill() {
		
		this.killed = true

	}

}

export let time = 0

export let updateTime = new utilsjs.Variable(60)
export let particlesCount = new utilsjs.Variable(60)

export function update(deltaTime) {

	let t = -performance.now()

	

	for (let p of particles)
		if (!p.killed && p.enabled)
			p.update(deltaTime)

	particles = particles.filter(p => !p.killed)

	time += deltaTime



	t += performance.now()

	updateTime.newValue(t)
	particlesCount.newValue(particles.length)

}
