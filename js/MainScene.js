import SpriteSpeed from "./SpriteSpeed.js";
import Background from "./Background.js";
import Pillar from "./Pillar.js";
import BigDroid from "./BigDroid.js";
import BigDroidRope from "./BigDroidRope.js";
import Ceiling from "./Ceiling.js";
import Coin from "./Coin.js";
import Floor from "./Floor.js";
import Globals from "./Globals.js";
import LabelScore from "./LabelScore.js";
import CoinsScore from "./CoinsScore.js";
import ObstacleScore from "./ObstacleScore.js";
import LaserDroids from "./LaserDroids.js";
import Player from "./Player.js";
import PlayerBakar from "./PlayerBakar.js";
import PlayerJet from "./PlayerJet.js";
import PlayerComot from "./PlayerComot.js";
import PlayerAlicia from "./PlayerAlicia.js";
import PlayerZass from "./PlayerZass.js";
import Rocket from "./Rocket.js";
import SmallDroid from "./SmallDroid.js";
import SmallDroidRope from "./SmallDroidRope.js";
import Wall from "./Wall.js";
import Grid from "./Grid.js";

import { CHARACTERS, DROID_NAMES } from "./constants.js";
import ObstacleManager from "./ObstacleManager.js";
import GamePause from "./GamePause.js";
import droidGroupsArr from "./droidsGroup.js";
import ImageSprite from "./ImageSprite.js";
import PlayerAliBeam from "./PlayerAliBeam.js";
import { POWERUPS } from "./powerupPosition.js";
import PowerUp from "./PowerUp.js";

export default class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.uiContainer = new PIXI.Container();

    this.coins = [];
    this.walls = [];
    this.rockets = [];
    this.laserDroids = [];
    this.walkingDroids = [];
    this.ropeDroids = [];

    this.powerUp = null;

    this.isPlayerBeam = true;
    this.isPowerupIntroduction = false;
    this.isGamePaused = false;
    this.flagDie = false;
    this.holdSpriteSpawn = false; //variable to show that game play is stopped

    this.initSpriteSpeed();
    this.createBackground();
    this.createTopMenu();
    this.createCeiling();
    this.createFloor();
    this.createPlayerBeam();
    this.initGrid();
    this.randomizeObstacles();
    this.createPillars();
    this.createUI();
    this.createObstaclesManager();
    if(!Globals.bgm.isPlaying)Globals.bgm.play();
  }

  initSpriteSpeed() {
    this.spriteSpeed = new SpriteSpeed();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPillars() {
    this.pillars = new Pillar();
    this.uiContainer.addChild(this.pillars.container);
  }

  createTopMenu() {
    const buttonWidthHeight = 0.03 * window.innerWidth;
    const yPos = 0.05 * window.innerHeight;

    const volumeButton = Globals.isMuted ? 
      new PIXI.Sprite(Globals.resources.soundOnButton.texture) : 
      new PIXI.Sprite(Globals.resources.soundOffButton.texture);
    volumeButton.width = buttonWidthHeight;
    volumeButton.height = buttonWidthHeight;
    volumeButton.x = 0.85 * window.innerWidth;
    volumeButton.y = yPos;
    volumeButton.interactive = true;
    volumeButton.on("pointerdown", () => {
      Globals.sfx_button.play();
      if (volumeButton.texture === Globals.resources.soundOnButton.texture) {
        volumeButton.texture = Globals.resources.soundOffButton.texture;
        Globals.isMuted = false;
      } else {
        volumeButton.texture = Globals.resources.soundOnButton.texture;
        Globals.isMuted = true;
      }
      window.sessionStorage.setItem("isMuted", Globals.isMuted);
    });

    const pauseButton = new PIXI.Sprite(Globals.resources.pauseButton.texture);
    pauseButton.width = buttonWidthHeight;
    pauseButton.height = buttonWidthHeight;
    pauseButton.x = volumeButton.x + volumeButton.width * 1.2;
    pauseButton.y = yPos;
    pauseButton.interactive = true;
    pauseButton.on("pointerdown", () => {
      Globals.sfx_button.play();
      this.isGamePaused = true;
      document.getElementById('fullscreenModal').style.display = "block";
      document.getElementById('pauseModal').classList.remove('hidden');
      /*this.pauseGame = new GamePause(() => {
        this.container.removeChild(this.pauseGame.container);
        this.isGamePaused = false;
      });
      this.container.addChild(this.pauseGame.container);
      this.isGamePaused = true;*/
    });

    document.getElementById('resumeBtn').addEventListener('click', () => {
      document.getElementById('fullscreenModal').style.display = "none";
      document.getElementById('pauseModal').classList.add('hidden');
      Globals.sfx_button.play();
      this.isGamePaused = false;
    });

    this.uiContainer.addChild(volumeButton);
    this.uiContainer.addChild(pauseButton);
  }

  createCeiling() {
    this.ceiling = new Ceiling();
    this.container.addChild(this.ceiling.sprite);
  }

  createFloor() {
    this.floor = new Floor();
    this.container.addChild(this.floor.sprite);
  }

  initGrid() {
    this.grid = new Grid();
  }

  createPlayerBeam() {
    //outer time out added to allow other assets and UI to load before player
    setTimeout(() => {
      //Character dimensions
      this.playerBeam = new PlayerAliBeam((sprite) =>
        this.container.removeChild(sprite)
      );

      this.container.addChild(this.playerBeam.sprite);

      //inner timeout should be ealrier than beam duration
      setTimeout(() => {
        this.createPlayer();
        this.isPlayerBeam = false;
      }, 500);
    }, 1500);
  }

  createPlayer() {
    //Character dimensions
    //pass beam x position to player to start from same position
    this.player = new Player(this.playerBeam.sprite.x);

    this.container.addChild(this.player.sprite);

    this.container.interactive = true;

    document.addEventListener("pointerdown", (e) => {
      this.player.startJump(e);
    });
  }

  playerDie() {
    //if player hits any ground wall
    this.player.fall();
    setTimeout(() => {
      document.getElementById('fullscreenModal').style.display = "block";
      document.getElementById('finalScore').classList.remove('hidden');
      document.getElementById('distScore').innerText = this.labelScore.score;
      document.getElementById('obsScore').innerText = this.obstacleScore.score * 10;
      document.getElementById('coinsScore').innerText = this.coinsScore.score;
      document.getElementById('totalScore').innerText = this.labelScore.score + this.obstacleScore.score * 10 + this.coinsScore.score;
      /*Globals.scene.start(
        new FinalScene(
          this.labelScore.score,
          this.obstacleScore.score,
          this.coinsScore.score
        )
      );*/
    }, 6000);
  }

  powerupAlicia() {
    //alicia
    this.container.removeChild(this.player.sprite);
    this.player = new PlayerAlicia(
      (sprite) => this.container.addChild(sprite),
      (sprite) => this.container.removeChild(sprite)
    );
    this.container.addChild(this.player.sprite);
    this.container.addChild(this.player.pointSprite);
    this.powerupIntroduction("./assets/images/titles_once/title_alicia.gif");
  }

  powerupBakar() {
    //bakar
    this.container.removeChild(this.player.sprite);
    this.player = new PlayerBakar();
    this.container.addChild(this.player.sprite);
    this.powerupIntroduction("./assets/images/titles_once/title_bakar.gif");
  }

  powerupComot() {
    //comot
    this.container.removeChild(this.player.sprite);
    this.player = new PlayerComot();
    this.container.addChild(this.player.sprite);
    this.powerupIntroduction("./assets/images/titles_once/title_comot.gif");
  }

  powerupJet() {
    //jet
    this.container.removeChild(this.player.sprite);
    this.player = new PlayerJet(this.floor);
    this.container.addChild(this.player.sprite);
    this.powerupIntroduction("./assets/images/titles_once/title_jet.gif");
  }

  powerupZass() {
    //zass
    this.container.removeChild(this.player.sprite);
    this.player = new PlayerZass(() => this.switchToNormalPlayer());
    this.container.addChild(this.player.sprite);
    this.powerupIntroduction("./assets/images/titles_once/title_zass.gif");
  }

  //add powerup introduction text
  powerupIntroduction(powerupTitleTexture) {
    this.isPowerupIntroduction = true;

    /*this.powerupNameText = new PowerUpTitle(this.player, (sprite) =>
      this.container.removeChild(sprite)
    );

    this.container.addChild(this.powerupNameText.sprite);*/
    document.getElementById("fullscreenModal").style.display = "block";
    document.getElementById("charTitle").src = powerupTitleTexture;
    document.getElementById("charTitle").classList.remove("hidden");

    setTimeout(() => {
      //this.container.removeChild(this.powerupNameText.sprite);
      document.getElementById("fullscreenModal").style.display = "none";
      document.getElementById("charTitle").src = "";
      document.getElementById("charTitle").classList.add("hidden");
      this.isPowerupIntroduction = false;
    }, 2000);
  }

  switchToNormalPlayer() {
    if (this.player.character === CHARACTERS.ALICIA) {
      //if powerup is Alicia then remove her teleport point sprite as well
      this.container.removeChild(this.player.pointSprite);
    }
    this.container.removeChild(this.player.sprite);
    this.player = new Player();
    this.container.addChild(this.player.sprite);

    //call next powerup display interval
    this.randomizePowerups();
  }

  createDroids() {
    if (this.holdSpriteSpawn) {
      //dont allow this function during player intro beam
      return;
    }

    const droidGroupArr =
      droidGroupsArr[Math.floor(Math.random() * droidGroupsArr.length)];

    droidGroupArr.forEach((droid, droidIdx) => {
      const posX = droidIdx * 100 + window.innerWidth;
      if (droid === DROID_NAMES.SMALLDROID) {
        this.smallDroid = new SmallDroid(posX, (sprite) =>
          this.container.removeChild(sprite)
        );
        this.walkingDroids.push(this.smallDroid);
        this.container.addChild(this.smallDroid.sprite);
      } else if (droid === DROID_NAMES.BIGDROID) {
        this.bigDroid = new BigDroid(posX, (sprite) =>
          this.container.removeChild(sprite)
        );
        this.walkingDroids.push(this.bigDroid);
        this.container.addChild(this.bigDroid.sprite);
      } else if (droid === DROID_NAMES.SMALLDROIDROPE) {
        this.smallDroidRope = new SmallDroidRope(posX, (sprite) =>
          this.container.removeChild(sprite)
        );
        this.ropeDroids.push(this.smallDroidRope);
        this.container.addChild(this.smallDroidRope.sprite);
      } else if (droid === DROID_NAMES.BIGDROIDROPE) {
        this.bigDroidRope = new BigDroidRope(posX, (sprite) =>
          this.container.removeChild(sprite)
        );
        this.ropeDroids.push(this.bigDroidRope);
        this.container.addChild(this.bigDroidRope.sprite);
      }
    });
  }

  createWalls(obstacleLevel) {
    if (this.isPlayerBeam) {
      //dont allow this function during player intro beam
      return;
    }

    const wallsArr = obstacleLevel(this.grid);

    wallsArr.forEach((wallPos) => {
      let wall = new Wall(
        wallPos.x,
        wallPos.type,
        wallPos.height,
        wallPos.isBottom,
        (wallSprite) => this.container.removeChild(wallSprite)
      );

      this.walls.push(wall);
      this.container.addChild(wall.sprite);
    });
  }

  createRocket(obstacleLevel) {
    if (this.isPlayerBeam) {
      //dont allow this function during player intro beam
      return;
    }

    const rocketsArr = obstacleLevel(this.grid);

    rocketsArr.forEach((rocketPos) => {
      let rocket = new Rocket(rocketPos, (rocketSprite) =>
        this.container.removeChild(rocketSprite)
      );

      this.rockets.push(rocket);
      this.container.addChild(rocket.sprite);
    });
  }

  createLaserDroids(obstacleLevel) {
    if (this.isPlayerBeam) {
      //dont allow this function during player intro beam
      return;
    }

    const laserDroidsArr = obstacleLevel(this.grid);

    laserDroidsArr.forEach((laserDroidPos) => {
      let laserDroid = new LaserDroids(laserDroidPos.y, (sprite) =>
        this.container.addChild(sprite)
      );

      this.laserDroids.push(laserDroid);

      this.container.addChild(laserDroid.container);
    });
  }

  createObstaclesManager() {
    this.obstacleManager = new ObstacleManager(
      (func) => this.createCoins(func),
      (func) => this.createWalls(func),
      (func) => this.createRocket(func),
      (func) => this.createLaserDroids(func),
      () => this.randomizePowerups(),
      (powerUp) => this.createPowerUps(powerUp)
    );
  }

  randomizeObstacles() {
    this.obstacleInterval = setInterval(() => {
      switch (Math.floor(Globals.mathRandom() * 1)) {
        case 0:
          this.createDroids();
          break;
        default:
          break;
      }
    }, 5000);

    return () => {
      clearInterval(this.obstacleInterval);
    };
  }

  randomizePowerups() {
    const powerupsArr = POWERUPS(
      this.grid,
      () => this.powerupAlicia(),
      () => this.powerupBakar(),
      () => this.powerupComot(),
      () => this.powerupJet(),
      () => this.powerupZass()
    );

    return powerupsArr[Math.floor(Math.random() * powerupsArr.length)];
  }

  createPowerUps(powerUp) {
    if (this.player && this.player.character !== CHARACTERS.ALI) {
      //only add powerup onscreen if player is ali
      return;
    }

    if (this.powerUp) {
      if (this.powerUp.sprite) {
        //only add new powerup on screen if there is no existing one on screen
        return;
      }
    }

    this.powerUp = new PowerUp(
      powerUp.x,
      powerUp.y,
      powerUp.type,
      () => powerUp.transform(),
      () => this.randomizePowerups(),
      (sprite) => this.container.removeChild(sprite)
    );

    this.container.addChild(this.powerUp.sprite);
  }

  createCoins(coinGroup) {
    if (this.isPlayerBeam || this.isPowerupIntroduction) {
      //dont allow this function during player intro beam or powerup intro
      return;
    }

    const coinsArr = coinGroup(this.grid);

    coinsArr.forEach((coinPos) => {
      let coin = new Coin(coinPos.x, coinPos.y, this.floor, (coinSprite) =>
        this.container.removeChild(coinSprite)
      );
      this.coins.push(coin);
      this.container.addChild(coin.sprite);
    });
  }

  clearSprites() {
    //removes all obstacles
    this.coins.forEach((object) => {
      if (object.sprite) {
        this.container.removeChild(object.sprite);
      }
    });
    this.walkingDroids.forEach((object) => {
      if (object.sprite) {
        this.container.removeChild(object.sprite);
      }
    });
    this.ropeDroids.forEach((object) => {
      if (object.sprite) {
        this.container.removeChild(object.sprite);
      }
    });
    this.rockets.forEach((object) => {
      if (object.sprite) {
        this.container.removeChild(object.sprite);
      }
    });
    this.laserDroids.forEach((object) => {
      if (object.droid) {
        this.container.removeChild(object.container);
      }
    });
    this.walls.forEach((object) => {
      if (object.sprite) {
        this.container.removeChild(object.sprite);
      }
    });
  }

  createUI() {
    this.distanceScoreboard = new ImageSprite(
      Globals.resources.distanceProgress.texture,
      10,
      10,
      0.2 * window.innerWidth,
      0.1 * window.innerHeight
    );
    this.labelScore = new LabelScore(
      //"Verdana, sans-serif",
      "Aero",
      "#000000",
      Globals.isMobile() ? 10 : 15,
      this.distanceScoreboard.x + this.distanceScoreboard.width / 1.5,
      this.distanceScoreboard.y + this.distanceScoreboard.height / 2,
      0.5
    );

    this.mataScoreboard = new ImageSprite(
      Globals.resources.mataProgress.texture,
      this.distanceScoreboard.right * 1.2,
      10,
      0.13 * window.innerWidth,
      0.1 * window.innerHeight
    );
    this.obstacleScore = new ObstacleScore(
      //"Verdana, sans-serif",
      "Aero",
      "#000000",
      Globals.isMobile() ? 10 : 15,
      this.mataScoreboard.x + this.mataScoreboard.width / 2,
      this.mataScoreboard.y + this.mataScoreboard.height / 2,
      0.5
    );

    this.coinsScoreboard = new ImageSprite(
      Globals.resources.coinProgress.texture,
      this.mataScoreboard.right * 1.2,
      10,
      0.13 * window.innerWidth,
      0.1 * window.innerHeight
    );

    this.coinsScore = new CoinsScore(
      //"Verdana, sans-serif",
      "Aero",
      "#000000",
      Globals.isMobile() ? 10 : 15,
      this.coinsScoreboard.x + this.coinsScoreboard.width / 2,
      this.coinsScoreboard.y + this.coinsScoreboard.height / 2,
      0.5
    );
    this.uiContainer.addChild(this.distanceScoreboard);
    this.uiContainer.addChild(this.mataScoreboard);
    this.uiContainer.addChild(this.coinsScoreboard);

    // this.container.addChild(this.labelScore);
    this.uiContainer.addChild(this.labelScore);
    this.uiContainer.addChild(this.coinsScore);
    this.uiContainer.addChild(this.obstacleScore);
  }

  update(dt) {
    if(this.isGamePaused) return;
    Globals.isMuted ? Globals.bgm.mute(true) : Globals.bgm.mute(false);

    //variable to show that game play is stopped
    this.holdSpriteSpawn =
      this.isPlayerBeam ||
      this.isPowerupIntroduction ||
      this.isGamePaused ||
      this.player.isDead ||
      this.flagDie;

    if (this.isPlayerBeam) {
      return;
    }

    if (this.player.isDead && !this.flagDie) {
      //is called when Ali hits obstacle
      this.flagDie = true;
      this.playerDie();
    }

    if (
      !this.player.isDead &&
      !this.isPowerupIntroduction &&
      this.player.character !== CHARACTERS.ZASS
    ) {
      this.spriteSpeed.definiteSpeed = Globals.gameSpeed;
      this.bg.update(dt, this.spriteSpeed.defaultSpeed);
      this.pillars.update(dt, this.spriteSpeed.defaultSpeed);
    } else if (
      this.player.isDead &&
      !this.isPowerupIntroduction &&
      this.spriteSpeed.defaultSpeed >= 0
    ) {
      this.spriteSpeed.defaultSpeed = -(Globals.gameSpeed / 20);
      this.bg.update(dt, this.spriteSpeed.defaultSpeed);
      this.pillars.update(dt, this.spriteSpeed.defaultSpeed);
    } else if (
      !this.player.isDead &&
      !this.isPowerupIntroduction &&
      this.player.character === CHARACTERS.ZASS
    ) {
      this.labelScore.score += 0.5;
      this.spriteSpeed.definiteSpeed = Globals.gameSpeed * 10;
      this.bg.update(dt, this.spriteSpeed.defaultSpeed);
      this.pillars.update(dt, this.spriteSpeed.defaultSpeed);
      this.clearSprites();
    }

    this.floor.checkCollision(this.player);
    this.ceiling.checkCollision(this.player);
    this.player.update(dt);

    if (this.isPowerupIntroduction) {
      this.rockets.forEach((obstacle) => {
        if (obstacle.sprite) {
          obstacle.destroySprite();
        }
      });
      this.walls.forEach((obstacle) => {
        if (obstacle.sprite) {
          obstacle.destroySprite();
        }
      });
      this.laserDroids.forEach((obstacle) => {
        if (obstacle.droid) {
          obstacle.destroyContainerAndSprites();
        }
      });
    }

    if (this.rockets.length > 0) {
      this.rockets.forEach((rocket) => {
        if (
          rocket.sprite &&
          !this.player.isDead &&
          !this.isPowerupIntroduction &&
          this.player.character !== CHARACTERS.ZASS
        ) {
          rocket.update(dt);
          rocket.checkCollision(
            this.player,
            () => this.switchToNormalPlayer(),
            () => this.clearSprites()
          );
        }
      });
    }

    if (this.laserDroids.length > 0) {
      this.laserDroids.forEach((laserDroidPair) => {
        if (
          laserDroidPair.droid &&
          !this.player.isDead &&
          !this.isPowerupIntroduction &&
          this.player.character !== CHARACTERS.ZASS
        ) {
          laserDroidPair.update(dt);
          laserDroidPair.checkCollision(
            this.player,
            () => this.switchToNormalPlayer(),
            () => this.clearSprites()
          );
        }
      });
    }

    if (!this.holdSpriteSpawn) {
      this.labelScore.update(dt, Globals.gameSpeed);
      this.obstacleManager.update(dt, this.player, this.holdSpriteSpawn);

      if (this.walkingDroids.length > 0) {
        this.walkingDroids.forEach((droid) => {
          if (droid.sprite) {
            droid.update(dt);
            droid.checkCollision(this.player, this.obstacleScore);
          }
        });
      }

      if (this.ropeDroids.length > 0) {
        this.ropeDroids.forEach((droid) => {
          if (droid.sprite) {
            droid.update(dt);
            droid.checkCollision(this.player, this.obstacleScore);
            this.floor.checkCollision(droid);
          }
        });
      }
    } else if (this.holdSpriteSpawn) {
      this.obstacleManager.update(dt, this.player, this.holdSpriteSpawn);
    }

    if (this.powerUp) {
      if (!this.player.isDead && !this.isPowerupIntroduction) {
        this.powerUp.update(dt, this.spriteSpeed.defaultSpeed);
        this.powerUp.checkCollision(this.player);
      } else if (this.player.isDead && this.powerUp.dx >= 0) {
        this.powerUp.update(dt, this.spriteSpeed.defaultSpeed);
      }
    }

    if (this.coins.length > 0) {
      this.coins.forEach((coin) => {
        if (coin.sprite) {
          if (!this.player.isDead && !this.isPowerupIntroduction) {
            coin.update(dt, this.spriteSpeed.defaultSpeed, this.player);
            coin.checkCollision(this.player, this.coinsScore);
          } else if (this.player.isDead && coin.dx >= 0) {
            coin.update(dt, this.spriteSpeed.defaultSpeed, this.player);
          }
        }
      });
    }

    if (this.walls.length > 0) {
      this.walls.forEach((wall) => {
        if (wall.sprite) {
          if (!this.player.isDead && !this.isPowerupIntroduction) {
            wall.update(dt, this.spriteSpeed.defaultSpeed);

            wall.checkCollision(
              this.player,
              () => this.switchToNormalPlayer(),
              () => this.clearSprites()
            );
          } else if (this.player.isDead && wall.dx >= 0) {
            wall.update(dt, this.spriteSpeed.defaultSpeed);
          }
        }
      });
    }
  }
}
