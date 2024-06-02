export function ROCKETGROUP1(grid) {
  const rocketsArr = [];
  const rocketYPosArr = [3, 6, 10, 14];

  const posY = rocketYPosArr[Math.floor(Math.random() * rocketYPosArr.length)];

  const rocket1 = {
    x: grid.matrix[posY][0].x,
    y: grid.matrix[posY][0].y,
  };

  rocketsArr.push(rocket1);

  return rocketsArr;
}

export function ROCKETGROUP2(grid) {
  const rocketsArr = [];

  [0, 0].forEach((item, idx) => {
    const rocket1 = {
      x: grid.matrix[7 + idx][0].x,
      y: grid.matrix[7 + idx][0].y,
    };

    rocketsArr.push(rocket1);
  });

  [0, 0].forEach((item, groupIdx) => {
    let row = groupIdx === 0 ? 3 : 12;
    [0, 0, 0].forEach((item, idx) => {
      const rocket1 = {
        x: grid.matrix[row + idx][14].x,
        y: grid.matrix[row + idx][14].y,
      };

      rocketsArr.push(rocket1);
    });
  });

  return rocketsArr;
}

export function ROCKETGROUP3(grid) {
  const rocketsArr = [];

  [0, 0, 0, 0, 0].forEach((item, idx) => {
    const rocket1 = {
      x: grid.matrix[14 - idx][0 + idx * 2].x,
      y: grid.matrix[14 - idx][0 + idx * 2].y,
    };

    rocketsArr.push(rocket1);
  });

  return rocketsArr;
}

export function ROCKETGROUP4(grid) {
  const rocketsArr = [];

  [0, 0, 0].forEach((item, idx) => {
    const rocket1 = {
      x: grid.matrix[2 + idx][0 + idx * 2].x,
      y: grid.matrix[2 + idx][0 + idx * 2].y,
    };

    rocketsArr.push(rocket1);
  });

  [0, 0, 0].forEach((item, idx) => {
    const rocket1 = {
      x: grid.matrix[14 - idx][0 + idx * 2].x,
      y: grid.matrix[14 - idx][0 + idx * 2].y,
    };

    rocketsArr.push(rocket1);
  });

  return rocketsArr;
}

export function ROCKETGROUP5(grid) {
  const rocketsArr = [];

  [0, 0, 0, 0, 0].forEach((item, idx) => {
    const rocket1 = {
      x: grid.matrix[2 + idx][0 + idx * 2].x,
      y: grid.matrix[2 + idx][0 + idx * 2].y,
    };

    rocketsArr.push(rocket1);
  });

  return rocketsArr;
}

export function ROCKETGROUP6(grid) {
  const rocketsArr = [];

  const rocket1 = {
    x: grid.matrix[9][0].x,
    y: grid.matrix[9][0].y,
  };

  rocketsArr.push(rocket1);

  const rocket2 = {
    x: grid.matrix[14][5].x,
    y: grid.matrix[14][5].y,
  };

  rocketsArr.push(rocket2);

  const rocket3 = {
    x: grid.matrix[9][10].x,
    y: grid.matrix[9][10].y,
  };

  rocketsArr.push(rocket3);

  const rocket4 = {
    x: grid.matrix[2][14].x,
    y: grid.matrix[2][14].y,
  };

  rocketsArr.push(rocket4);

  return rocketsArr;
}

export function ROCKETGROUP7(grid) {
  const rocketsArr = [];

  const rocket1 = {
    x: grid.matrix[3][0].x,
    y: grid.matrix[3][0].y,
  };

  rocketsArr.push(rocket1);

  const rocket2 = {
    x: grid.matrix[2][5].x,
    y: grid.matrix[2][5].y,
  };

  rocketsArr.push(rocket2);

  const rocket3 = {
    x: grid.matrix[14][3].x,
    y: grid.matrix[14][3].y,
  };

  rocketsArr.push(rocket3);

  const rocket4 = {
    x: grid.matrix[10][10].x,
    y: grid.matrix[10][10].y,
  };

  rocketsArr.push(rocket4);

  const rocket5 = {
    x: grid.matrix[2][14].x,
    y: grid.matrix[2][14].y,
  };

  rocketsArr.push(rocket5);

  return rocketsArr;
}

export function ROCKETGROUP8(grid) {
  const rocketsArr = [];

  const rocket1 = {
    x: grid.matrix[3][0].x,
    y: grid.matrix[3][0].y,
  };

  rocketsArr.push(rocket1);

  const rocket2 = {
    x: grid.matrix[3][5].x,
    y: grid.matrix[3][5].y,
  };

  rocketsArr.push(rocket2);

  const rocket3 = {
    x: grid.matrix[3][10].x,
    y: grid.matrix[3][10].y,
  };

  rocketsArr.push(rocket3);

  return rocketsArr;
}

export function ROCKETGROUP9(grid) {
  const rocketsArr = [];

  const rocket1 = {
    x: grid.matrix[3][0].x,
    y: grid.matrix[3][0].y,
  };

  rocketsArr.push(rocket1);

  const rocket2 = {
    x: grid.matrix[5][5].x,
    y: grid.matrix[5][5].y,
  };

  rocketsArr.push(rocket2);

  return rocketsArr;
}

export function ROCKETGROUP10(grid) {
  const rocketsArr = [];

  const rocket1 = {
    x: grid.matrix[2][7].x,
    y: grid.matrix[2][7].y,
  };

  rocketsArr.push(rocket1);

  const rocket2 = {
    x: grid.matrix[5][3].x,
    y: grid.matrix[5][3].y,
  };

  rocketsArr.push(rocket2);

  const rocket3 = {
    x: grid.matrix[14][0].x,
    y: grid.matrix[14][0].y,
  };

  rocketsArr.push(rocket3);

  return rocketsArr;
}
