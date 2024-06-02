import Globals from './Globals.js';
import Rocket from './Rocket.js';
import LaserDroids from './LaserDroids.js';

export default class Obstacles {
	constructor() {
		this.container = new PIXI.Container();
		this.obstacles = [];

		// this.createObstacle({
		// 	x: 860,
		// 	y: 530
		// });
	}

	createObstacle(data) {
		const obstacle = new Rocket();
		this.container.addChild(obstacle.sprite);
		this.obstacles.push(obstacle);
		this.current = obstacle;

		obstacle.sprite.once('hidden', () => {
			this.obstacles = this.obstacles.filter(item => item !== obstacle);
			obstacle.sprite.destroy();
		});
	}

	checkCollision(player) {
		this.obstacles.forEach(obstacle => {
			obstacle.checkCollision(player);
		});
	}

	update(dt) {
		if (this.current.right < window.innerWidth) {
			// this.createObstacle(this.randomData);
		}

		// this.obstacles.forEach(obstacle => {
		// 	obstacle.move();
		// });
	}
}
