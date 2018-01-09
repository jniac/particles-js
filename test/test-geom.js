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

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.translate(innerWidth, innerHeight)
ctx.scale(2, 2)
ctx.lineWidth = 1

export let triangle = new geomjs.Triangle()

triangle.A = [-50, -50]
triangle.B = [20, 80]
triangle.C = [40, -10]

triangle.A = [14, -34]
triangle.B = [-34, -59]
triangle.C = [19, 93]
triangle.inflate(50)
log('triangle.direct:', triangle.direct)

export let circle = new geomjs.Circle(300, 200, 80)

export let quad = new geomjs.Quad(-50, 50, -100, 90, -200, 40, -120, 0)

export let sector = new geomjs.Sector(-200, -200, 50, 30, 120)



export let P = new geomjs.Point(300, 300)
export let P1 = new geomjs.Point(300, 300)

export let mouse = new geomjs.Point()

export let aabb = new geomjs.AABB(-innerWidth / 2, -innerHeight / 2, innerWidth / 2, innerHeight / 2)

aabb.inflate(-20)

export let line1 = new geomjs.Line(-200, -300, 300, -50, geomjs.LineType.SEGMENT)
export let line2 = new geomjs.Line(-100, -200, 300, -150)

let n = 20
export let mouseSample = []

while (mouseSample.length < n * n)
	mouseSample.push(new geomjs.Point())


let lastMoveTime
let t = 0

function render() {

	requestAnimationFrame(render)

	if (performance.now() / 1e3 - lastMoveTime > 1)
		return

	t += 1 / 60

	ctx.clearRect(-innerWidth / 2, -innerHeight / 2, innerWidth, innerHeight)
	triangle.draw(ctx, '#000000', '#00000022')
	triangle.A.toCircle(10).draw(ctx)
	triangle.B.toCircle(4).draw(ctx)

	circle.draw(ctx, '#000000', '#00000022')

	quad.draw(ctx, '#000000', '#00000022')

	sector.opening = Math.sin(t) * .5 + .5
	sector.radius = 30 * (Math.sin(t / 2) * .5 + 2)

	sector.draw(ctx, '#000000', '#00000022')

	line1.draw(ctx)
	line2.draw(ctx, { aabb })

	let I, line2_refl

	I = line1.intersection(line2)

	if (I) {

		I.point.draw(ctx, { shape: 'dot' })

		let uv = geomjs.decomposeUV(line2.V, line1.V)

		ctx.lineWidth = 3

		ctx.moveTo(I.point.x, I.point.y)
		ctx.lineTo(I.point.x + uv.u.x, I.point.y + uv.u.y)
		ctx.moveTo(I.point.x, I.point.y)
		ctx.lineTo(I.point.x + uv.v.x, I.point.y + uv.v.y)

		ctx.stroke()
		ctx.beginPath()

		ctx.lineWidth = 1

		line2_refl = line2.reflection(line1).draw(ctx, { aabb })

	}

	I = geomjs.intersectionLineCircle(line2.px, line2.py, line2.vx, line2.vy, circle.x, circle.y, circle.radius) || 
		line2_refl && geomjs.intersectionLineCircle(line2_refl.px, line2_refl.py, line2_refl.vx, line2_refl.vy, circle.x, circle.y, circle.radius)

	if (I) {

		for (let P, N, i = 0, n = I.points.length; i < n; i++) {

			P = I.points[i]
			N = I.normals[i]

			P.draw(ctx, { shape: 'dot' })

			ctx.moveTo(P.x, P.y)
			ctx.lineTo(P.x + N.x * 100, P.y + N.y * 100)
			ctx.stroke()
			ctx.beginPath()

		}

	}

	for (let I of line2.intersectionWithAABB(aabb))
		I.point.draw(ctx, { shape: 'dot' })

	for (let p of mouseSample)
		p.draw(ctx, {
			shape: 'dot',
			dotSize: 2.5,
			color: triangle.contains(p) ? '#8600FF' : circle.contains(p) ? 'white' : quad.contains(p) ? 'red' : sector.contains(p) ? 'cyan' : 'black',
		})

	P.draw(ctx)

	P1.setXY(...geomjs.moveTowards(P.x, P.y, mouse.x, mouse.y, 100)).draw(ctx)

}

render()

window.onmousemove = event => {

	mouse.x = -innerWidth / 2 + event.pageX - 0
	mouse.y = -innerHeight / 2 + event.pageY - 0

	for (let i = 0; i < n * n; i++) {

		let x = i % n - (n - 1) / 2
		let y = Math.floor(i / n) - (n - 1) / 2

		mouseSample[i].set(mouse.x + x * 10, mouse.y + y * 10)

	}

	line2.P2 = mouse

	lastMoveTime = performance.now() / 1e3

}
