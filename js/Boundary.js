import Globals from './Globals.js';

export default class Boundary {
	constructor() {
		this.sprite = new PIXI.Sprite();
		this.sprite.x = 0;

		this.width = window.innerWidth;
		this.height = Globals.TILE_SIZE;
	}

	get left() {
		return this.sprite.x;
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.sprite.y;
	}

	get bottom() {
		return this.top + this.height;
	}
}
