import Object3D from "./object-3d.js";
import { WebGL2, Program } from "noobgl";
import { Vector3 } from "noobgl-vector";
import { Matrix4 } from "noobgl-matrix";

export default class Mesh extends Object3D {
	constructor( geometry, material, renderMode = WebGL2.TRIANGLES ){

		super();

		this.context = null;

		this.program = null;

		this.geometry = geometry;

		this.material = material;

		this.normalMatrix = new Matrix4();

		this.needsUpdate = true;

		this.renderMode = renderMode;

		return this;

	}
	setContext( context ){

		this.context = context;

		this.program = new Program(this.context);

		this.program.enable(WebGL2.DEPTH_TEST, WebGL2.CULL_FACE);

		this.material.setContext(this.context);

		this.program.attachShader(this.material.shader);

		this.program.link();

		return this;

	}
	update(){

		super.update();

		this.normalMatrix.set(this.matrix).inverse();

		if( this.geometry.needsUpdate == true ){

			this.geometry.needsUpdate = false;

			this.program.setVertexAttribute("position", this.geometry.vertices, 3);

			for( let attributeName in this.geometry.attributes ){

				let size = this.geometry.attributes[attributeName].size;

				let value = this.geometry.attributes[attributeName].value;

				this.program.setAttribute(attributeName, value, size, WebGL2.ARRAY_BUFFER);

			}

		}

		if( this.material.needsUpdate == true ){

			this.material.needsUpdate = false;

			for( let uniformName in this.material.uniforms ){

				let type = this.material.uniforms[uniformName].type;

				let value = this.material.uniforms[uniformName].value;

				this.program.setUniform(uniformName, type, value);

			}

		}

		return this;

	}
	render( camera ){

		this.program.setUniformMatrix("viewProjectionMatrix", camera.viewProjectionMatrix.array);

		this.program.setUniformMatrix("modelMatrix", this.matrix.array);

		this.program.setUniformMatrix("normalMatrix", this.normalMatrix.array, true);

		this.program.render(this.renderMode);

		return this;

	}
}