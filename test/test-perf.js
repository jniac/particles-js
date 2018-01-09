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
ctx.scale(6, 6)
ctx.translate(-50, -50)

export let circle = new geomjs.Circle(50, 50, 40).draw(ctx, '#7b14ff', '#7b14ff22')
export let triangle = new geomjs.Triangle(0, 0, 100, 0, 80, 70).draw(ctx, '#000000', '#00000022')
export let quad = new geomjs.Quad(0, 20, 80, 10, 80, 40, 20, 70).offset(-20, 20).draw(ctx, '#3B99FF', '#3B99FF22')
export let aabb = new geomjs.AABB(10, 10, 30, 30).draw(ctx, '#6ef', '#6ef2')

let n = 100e3
let a = []
let t

while (a.length < n)
 	a.push(new geomjs.Point(R.between(0, 100), R.between(0, 100)))



log(n)



logNewLine()

test('aabb.contains', n, () => {

	for (let p of a)
		aabb.contains(p)

})

test('aabb.containsXY', n, () => {

	for (let p of a)
		aabb.containsXY(p.x, p.y)

})



logNewLine()

test('circle.contains', n, () => {

	for (let p of a)
		circle.contains(p)

})

test('circle.containsXY', n, () => {

	for (let p of a)
		circle.containsXY(p.x, p.y)

})



logNewLine()

function triangleContainsInline(ax, ay, bx, by, cx, cy, x, y) {

	let det = (bx - ax) * (cy - ay) - (by - ay) * (cy - ay)

	return  det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) > 0 &&
			det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) > 0 &&
			det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) > 0	

}

function triangleContainsSplitted(ax, ay, bx, by, cx, cy, x, y) {

	let det = (bx - ax) * (cy - ay) - (by - ay) * (cy - ay)

	let a = det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) > 0
	let b = det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) > 0
	let c = det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) > 0

	return  a && b && c	

}

test('triangle.contains', n, () => {

	for (let p of a)
		triangle.contains(p)

})

test('triangle.containsXY', n, () => {

	for (let p of a)
		triangle.containsXY(p.x, p.y)

})

// test('triangleContainsInline', n * 10000, () => {

// 	for (let p of a)
// 		for (let i = 0; i < 10000; i++)
// 		triangleContainsInline(triangle.ax, triangle.ay, triangle.bx, triangle.by, triangle.cx, triangle.cy, p.x, p.y)

// })

// test('triangleContainsSplitted', n * 10000, () => {

// 	for (let p of a)
// 		for (let i = 0; i < 10000; i++)
// 		triangleContainsSplitted(triangle.ax, triangle.ay, triangle.bx, triangle.by, triangle.cx, triangle.cy, p.x, p.y)

// })



logNewLine()

test('quad.contains', n, () => {

	for (let p of a)
		quad.contains(p)

})

test('quad.containsXY', n, () => {

	for (let p of a)
		quad.containsXY(p.x, p.y)

})

