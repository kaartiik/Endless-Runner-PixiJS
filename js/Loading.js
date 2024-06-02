import Globals from "./Globals.js";
import MainScene from "./MainScene.js";
import PowerUpTitle from "./PowerUpTitle.js";

export default class Loading {
  constructor() {
    this.container = new PIXI.Container();
    this.createLoading();
  }

  //to preload powerup tile animation
  powerupIntroduction() {
    for(i=0; i < this.player.length; i++) {

    }

    this.powerupNameText = new PowerUpTitle(this.player, (sprite) =>
      this.container.removeChild(sprite)
    );

    this.container.addChild(this.powerupNameText.sprite);

    setTimeout(() => {
      this.container.removeChild(this.powerupNameText.sprite);
    }, 2000);
  }

  createLoading() {
    let video = document.createElement("video");
    video.id = "loadingVideo";
    video.playsInline = true;
    video.controls = false;
    video.preload = "auto";
    video.loop = false;
    video.autoplay = true;
    video.src = "../assets/videos/loading.mp4";
    video.load();
    video.play();

    // Create a texture from the video element
    const texture = PIXI.Texture.from(video);

    // Create a sprite using the video texture
    let videoSprite = new PIXI.Sprite(texture);

    // Adjust sprite size
    videoSprite.height = window.innerHeight;
    videoSprite.width = window.innerWidth;

    // Add the video sprite to the container
    this.container.addChild(videoSprite);

    // Store the video sprite reference
    this.backgroundVideo = videoSprite;

    // Add event listener to handle video end
    video.addEventListener("ended", myHandler, false);

    function myHandler(e) {
        // What you want to do after the event
        Globals.scene.start(new MainScene());
    }
}

}
