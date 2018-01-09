
### Observation #1:
# Holding properties vs sub-objects dedication

There is no noticable differences between 
```
Particle {
	point: Point
	velocity: Point
	update(dt) {
		point.x += velocity.x * dt
		point.y += velocity.y * dt
	}
}
```
and
```
Particle {
	x, y
	vx, vy
	update(dt) {
		x += vx * dt
		y += vy * dt
	}
}
```
\> About 0.07ms for updating 900 particles

### Observation #2:
# Particule update

Even if the array is cleaned from killed particles on each update:
```
particles = particles.filter(p => !p.killed)
```
we cannot avoid if (!p.killed)
```
	for (let p of particles)
		if (!p.killed)
			p.update(deltaTime)
```
since particles can be killed anywhere: before (and between) two update calls, or inside an update call (while update a particle)

