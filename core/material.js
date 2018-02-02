import { Shader } from "noobgl";

export default class Material {
	constructor( vertexSource, fragmentSource ){

		this.context = null;

		this.shader = null;

		this.vertexSource = vertexSource;

		this.fragmentSource = fragmentSource;

		this.uniforms = new Object();

		this.needsUpdate = true;

		return this;

	}
	setContext( context ){

		this.context = context;

		this.shader = new Shader(this.context, this.vertexSource, this.fragmentSource);

		return this;

	}
	setUniform( name, type, value ){

		this.uniforms[name] = { type, value };

		this.needsUpdate = true;

		return this;

	}
}