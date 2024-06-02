import Globals from "./Globals.js";
import {
  GROUP1,
  GROUP2,
  GROUP3,
  GROUP4,
  GROUP5,
  GROUP6,
  GROUP7,
} from "./coinPositions.js";
import {
  WALLGROUP1,
  WALLGROUP2,
  WALLGROUP3,
  WALLGROUP4,
  WALLGROUP5,
  WALLGROUP6,
  WALLGROUP7,
} from "./wallPositions.js";
import {
  ROCKETGROUP1,
  ROCKETGROUP10,
  ROCKETGROUP2,
  ROCKETGROUP3,
  ROCKETGROUP4,
  ROCKETGROUP5,
  ROCKETGROUP6,
  ROCKETGROUP7,
  ROCKETGROUP8,
  ROCKETGROUP9,
} from "./rocketPositions.js";
import { LDGROUP1, LDGROUP2, LDGROUP3 } from "./laserDroidPositions.js";
import { CHARACTERS, OBSTACLES } from "./constants.js";

export default class ObstacleManager {
  constructor(
    createCoins,
    createWalls,
    createRocket,
    createLaserDroids,
    randomizePowerups,
    createPowerUps
  ) {
    this.interval = null;
    this.obstaclesList = [
      OBSTACLES.WALLS,
      OBSTACLES.ROCKETS,
      OBSTACLES.LASERDROIDS,
      OBSTACLES.WALLSROCKETS,
    ];
    this.currentObstacle =
      this.obstaclesList[Math.floor(Math.random() * this.obstaclesList.length)];
    this.createCoins = createCoins;
    this.createWalls = createWalls;
    this.createRocket = createRocket;
    this.createLaserDroids = createLaserDroids;
    this.randomizePowerups = randomizePowerups;
    this.createPowerUps = createPowerUps;
    this.currentCharacter = "";
    this.holdSpriteSpawn = false;

    this.initObstacleGroups();
    this.initObstacles();
  }

  initObstacleGroups() {
    this.coinGroups = [
      (grid) => GROUP1(grid),
      (grid) => GROUP2(grid),
      (grid) => GROUP3(grid),
      (grid) => GROUP4(grid),
      (grid) => GROUP5(grid),
      (grid) => GROUP6(grid),
      (grid) => GROUP7(grid),
    ];
    this.wallGroups = [
      (grid) => WALLGROUP1(grid),
      (grid) => WALLGROUP2(grid),
      (grid) => WALLGROUP3(grid),
      (grid) => WALLGROUP4(grid),
      (grid) => WALLGROUP5(grid),
      (grid) => WALLGROUP6(grid), //combo with rockets
      (grid) => WALLGROUP7(grid), //combo with rockets
    ];
    this.rocketGroups = [
      (grid) => ROCKETGROUP1(grid),
      (grid) => ROCKETGROUP2(grid),
      (grid) => ROCKETGROUP3(grid),
      (grid) => ROCKETGROUP4(grid),
      (grid) => ROCKETGROUP5(grid),
      (grid) => ROCKETGROUP6(grid),
      (grid) => ROCKETGROUP7(grid),
      (grid) => ROCKETGROUP8(grid), //combo with walls
      (grid) => ROCKETGROUP9(grid), //combo with walls
      (grid) => ROCKETGROUP10(grid), //combo with walls
    ];
    this.ldGroups = [
      (grid) => LDGROUP1(grid),
      (grid) => LDGROUP2(grid),
      (grid) => LDGROUP3(grid),
    ];
  }

  initObstacles() {
    this.obtacleCounter = 0;
    this.interval = setInterval(() => {
      if (this.currentCharacter !== CHARACTERS.ZASS && !this.holdSpriteSpawn) {
        this.obtacleCounter++;

        if (this.obtacleCounter % 2 === 0) {
          let coinGroup =
            this.coinGroups[Math.floor(Math.random() * this.coinGroups.length)];

          this.createCoins((grid) => coinGroup(grid));
        } else if (this.obtacleCounter % 5 === 0) {
          let powerup = this.randomizePowerups();

          this.createPowerUps(powerup);
        } else {
          let currentObstacle =
            this.obstaclesList[
              Math.floor(Math.random() * this.obstaclesList.length)
            ];

          let obstacleLevel = this.randomizeLevels(currentObstacle);
          obstacleLevel();
        }
      }
    }, 1000);
  }

  randomizeLevels(currentObstacle) {
    switch (currentObstacle) {
      case OBSTACLES.WALLS:
        const wallLevel =
          this.wallGroups[Math.floor(Math.random() * this.wallGroups.length)];

        return () => {
          this.createWalls((grid) => wallLevel(grid));
        };

      case OBSTACLES.ROCKETS:
        const rocketLevel =
          this.rocketGroups[
            Math.floor(Math.random() * this.rocketGroups.length)
          ];

        return () => {
          this.createRocket((grid) => rocketLevel(grid));
        };

      case OBSTACLES.LASERDROIDS:
        const laserDroidLevel =
          this.ldGroups[Math.floor(Math.random() * this.ldGroups.length)];

        return () => {
          this.createLaserDroids((grid) => laserDroidLevel(grid));
        };

      case OBSTACLES.WALLSROCKETS:
        const wallsArr = [1, 5, 6];
        const selectedWallGroup =
          wallsArr[Math.floor(Math.random() * wallsArr.length)];
        const wallLevelWithRockets = this.wallGroups[selectedWallGroup];

        let rocketLevelWithWalls;

        if (selectedWallGroup === 1) {
          rocketLevelWithWalls = this.rocketGroups[7];
        } else if (selectedWallGroup === 5) {
          rocketLevelWithWalls = this.rocketGroups[8];
        } else if (selectedWallGroup === 6) {
          rocketLevelWithWalls = this.rocketGroups[9];
        }

        return () => {
          this.createWalls((grid) => wallLevelWithRockets(grid));
          this.createRocket((grid) => rocketLevelWithWalls(grid));
        };
      default:
        break;
    }
  }

  update(dt, player, holdSpriteSpawn) {
    this.currentCharacter = player.character;
    this.holdSpriteSpawn = holdSpriteSpawn;
  }
}
