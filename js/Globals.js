const Globals = {
  resources: {},
  TILE_SIZE: 0.05 * window.innerHeight,
  gameSpeed: (15 / 1080) * window.innerHeight,
  bgm: new Howl({
    src: ['../assets/sounds/bgm.mp3'],
    volume: 0.2,
    loop: true
  }),
  sfx_button: new Howl({
    src: ['../assets/sounds/menu_buttons.mp3'],
    volume: 0.4
  }),
  isMuted: window.sessionStorage.getItem('isMuted') ? window.sessionStorage.getItem('isMuted') : false,
  isMobile: () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
  mathRandom: () => {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  },
  randomY: (min, max) => {
    return min + Math.round(Globals.mathRandom() * (max - min));
  },
  randomWallHeight: (min, max) => {
    return min + Math.round(Globals.mathRandom() * (max - min));
  },
  randomWall: (top, bottom) => {
    return Math.random() < 0.5 ? top : bottom;
  },
};

export default Globals;
