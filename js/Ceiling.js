import Boundary from "./Boundary.js";
import { CHARACTERS } from "./constants.js";

export default class Ceiling extends Boundary {
  constructor() {
    super();

    this.sprite.y = 0;
  }

  checkCollision(player) {
    if (
      player.character !== CHARACTERS.JET &&
      player.character !== CHARACTERS.ALICIA
    ) {
      if (this.isCollideBottom(player)) {
        player.bounceOffCeiling();
      }
    } else if (player.character === CHARACTERS.JET) {
      //Gravity revresal for Jet character
      if (player.sprite !== null && this.isCollideBottomPowerUp(player)) {
        player.stayOnTop(this);
      } else {
        if (player.ceiling === this) {
          player.ceiling = null;
        }
      }
    } else if (
      player.character === CHARACTERS.ALICIA &&
      this.isPointCollideBottom(player)
    ) {
      //move player downwards if point sprite touches ceiling
      player.isPointMoveUp = false;
    }
  }

  isCollideBottom(player) {
    return player.top <= this.bottom;
  }

  isCollideBottomPowerUp(player) {
    return player.top <= this.bottom && player.nextTop >= this.bottom;
  }

  isPointCollideBottom(player) {
    return player.pointTop <= this.bottom;
  }
}
