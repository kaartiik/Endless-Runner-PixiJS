import Globals from "./Globals.js";
import Boundary from "./Boundary.js";
import { CHARACTERS } from "./constants.js";

export default class Floor extends Boundary {
  constructor() {
    super();

    this.sprite.y = window.innerHeight - Globals.TILE_SIZE;
  }

  checkCollision(player) {
    if (
      player.character !== CHARACTERS.JET &&
      player.character !== CHARACTERS.ALICIA
    ) {
      if (player.sprite !== null && this.isCollideTop(player)) {
        player.stayOnFloor(this);
      } 
    } else if (
      player.character === CHARACTERS.JET &&
      this.isCollideTopPowerUp(player)
    ) {
      //Gravity revresal for Jet character
      player.bounceOffFloor();
    } else if (
      //move point sprite upwards if it touches floor
      player.character === CHARACTERS.ALICIA &&
      this.isPointCollideTop(player)
    ) {
      player.isPointMoveUp = true;
    }
  }

  isCollideTop(player) {
    if(player.bottom > this.top) {return true}
    return player.bottom <= this.top && player.nextBottom >= this.top;
  }

  isCollideTopPowerUp(player) {
    return player.bottom >= this.top;
  }

  isPointCollideTop(player) {
    return player.pointBottom >= this.top;
  }
}
