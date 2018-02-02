import Object3D from "./object-3d.js";
import { WebGL2 } from "noobgl";
import { Matrix4 } from "noobgl-matrix";

export default class Scene extends Object3D {
	constructor( context, clearColor = 0xFFFFFF, clearAlpha = 1 ){

		super();

		this.context = context;

		this.needsUpdate = true;

		clearColor = Math.floor(clearColor);

		this.clearColor = {
			red: (clearColor >> 16 & 255) / 255,
			green: (clearColor >> 8 & 255) / 255,
			blue: (clearColor & 255) / 255,
			alpha: clearAlpha
		};

		return this;

	}
	render( camera ){

		// this.context.clearColor(this.clearColor.red, this.clearColor.green, this.clearColor.blue, this.clearColor.alpha);
		this.context.clearColor(this.clearColor.red, this.clearColor.green, this.clearColor.blue, this.clearColor.alpha);

		this.context.clear(WebGL2.COLOR_BUFFER_BIT | WebGL2.DEPTH_BUFFER_BIT);

		camera.update();

		this.parseChildren(( child )=>{

			if( this.needsUpdate == true ){

				if( child.setContext instanceof Function ){

					child.setContext(this.context);

				}

			}

			child.update().render(camera);

		});

		this.needsUpdate = false;

		return this;

	}
}