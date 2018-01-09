export class Variable {

	constructor(length, defaultValue = 0) {

		this.length = length

		this.index = 0

		this.sum = defaultValue * length
		this.average = defaultValue

		this.values = []

		for (let i = 0; i < length; i++)
			this.values[i] = defaultValue

	}

	newValue(value) {

		this.sum += -this.values[this.index] + (this.values[this.index] = value)
		this.average = this.sum / this.length

		this.index = (this.index + 1) % this.length

		return this

	}

}

export class Random {

	constructor(seed = 123456789) {

		this.seed = seed % 2147483647

	}

	next() {

		return this.seed = this.seed * 16807 % 2147483647

	}

	float() {

		return (this.next() - 1) / 2147483646

	}

	between(min, max) {

		return min + (max - min) * this.float()

	}

}

export let random = new Random()
