export default class Geometry {
	constructor( vertexArray ){

		this.vertices = vertexArray;

		this.attributes = new Object();

		this.needsUpdate = true;

		return this;

	}
	setAttribute( name, size, value ){

		this.attributes[name] = { size, value };

		this.needsUpdate = true;

		return this;

	}
}