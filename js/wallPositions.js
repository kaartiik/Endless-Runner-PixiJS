import Globals from "./Globals.js";

const wall1Height = Globals.TILE_SIZE * 4;
const wall2Height = window.innerHeight * 0.5;
const wall3Height = Globals.TILE_SIZE * 6;
const wall4Height = window.innerHeight * 0.5;

export function WALLGROUP1(grid) {
  const wallsArr = [];

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: 1,
    height: wall1Height,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: 2,
    height: wall2Height,
    isBottom: true,
  };

  wallsArr.push(wall2);

  const wall3 = {
    x: grid.matrix[4][10].x * 1.2,
    type: 2,
    height: wall2Height,
    isBottom: true,
  };

  wallsArr.push(wall3);

  return wallsArr;
}

export function WALLGROUP2(grid) {
  const wallsArr = [];

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: 1,
    height: wall1Height,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: 3,
    height: wall3Height,
    isBottom: true,
  };

  wallsArr.push(wall2);

  const wall3 = {
    x: grid.matrix[4][10].x * 1.2,
    type: 1,
    height: wall1Height,
    isBottom: true,
  };

  wallsArr.push(wall3);

  const wall4 = {
    x: grid.matrix[4][15].x * 1.2,
    type: 3,
    height: wall3Height,
    isBottom: true,
  };

  wallsArr.push(wall4);

  return wallsArr;
}

export function WALLGROUP3(grid) {
  const wallsArr = [];
  const wallType = 4;
  const wallHeight = wall4Height;

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: false,
  };

  wallsArr.push(wall2);

  const wall3 = {
    x: grid.matrix[4][10].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: true,
  };

  wallsArr.push(wall3);

  const wall4 = {
    x: grid.matrix[4][15].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: false,
  };

  wallsArr.push(wall4);

  return wallsArr;
}

export function WALLGROUP4(grid) {
  const wallsArr = [];

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: 1,
    height: wall1Height,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: 3,
    height: wall3Height,
    isBottom: true,
  };

  wallsArr.push(wall2);

  const wall3 = {
    x: grid.matrix[4][10].x * 1.2,
    type: 2,
    height: wall2Height,
    isBottom: true,
  };

  wallsArr.push(wall3);

  return wallsArr;
}

export function WALLGROUP5(grid) {
  const wallsArr = [];
  const wallType = 2;
  const wallHeight = wall2Height;

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: wallType,
    height: wallHeight,
    isBottom: true,
  };

  wallsArr.push(wall2);

  return wallsArr;
}

export function WALLGROUP6(grid) {
  const wallsArr = [];

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: 4,
    height: wall4Height,
    isBottom: true,
  };

  wallsArr.push(wall1);

  const wall2 = {
    x: grid.matrix[4][5].x * 1.2,
    type: 1,
    height: wall1Height,
    isBottom: true,
  };

  wallsArr.push(wall2);

  return wallsArr;
}

export function WALLGROUP7(grid) {
  const wallsArr = [];

  const wall1 = {
    x: grid.matrix[4][0].x * 1.2,
    type: 4,
    height: wall4Height,
    isBottom: true,
  };

  wallsArr.push(wall1);

  return wallsArr;
}
