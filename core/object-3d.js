import { Vector3 } from "noobgl-vector";
import { Matrix4 } from "noobgl-matrix";
import { Euler } from "noobgl-euler";

export default class Object3D {
	constructor( context ){

		this.context = context;

		this.position = new Vector3();

		this.rotation = new Euler();

		this.matrix = new Matrix4();

		this.children = new Array();

		this.parent = null;

		this.needsMatrixUpdate = false;

		return this;

	}
	set parent( parent ){

		this._parent = parent;

		this.needsMatrixUpdate = true;

	}
	addChild( child ){

		child.parent = this;

		this.children.push(child);

		return this;

	}
	parseChildren( callback ){

		for( let child of this.children ){

			callback(child);

			child.parseChildren(callback);

		}

		return this;

	}
	update(){

		this.matrix = (this.parent != null ? this.parent.matrix.clone() : new Matrix4());

		this.matrix
			.translate(this.position.x, this.position.y, this.position.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z, this.rotation.order);

		return this;

	}
}