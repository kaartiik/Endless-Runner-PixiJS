import LoaderConfig from './LoaderConfig.js';
import Globals from './Globals.js';

export default class Loader {
	constructor(loader) {
		this.loader = loader;
		this.resources = LoaderConfig;
	}

	preload() {
		return new Promise(resolve => {
			for (let key in this.resources) {
				this.loader.add(key, this.resources[key]);
			}

			this.loader.load((loader, resources) => {
				Globals.resources = resources;
				resolve();
			});
		});
	}
}
