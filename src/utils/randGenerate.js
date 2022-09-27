import { nanoid } from 'nanoid';
import { checkIsKill, isOverlap } from './filterSheep.js';
const level = 10; // 小羊层次

const levelSheepNum = randomRange(40, 60); //层次 小羊数量 10-30

// 保证同级的不会重叠 *************

export function generateSheep() {
  let sheepFlock = [];
  for (let level = 10; level > 1; level--) {
    const levelNum = randomRange(20, 40);
    for (let sheepIndex = 1; sheepIndex < levelNum; sheepIndex++) {
      const levelRandArr = getRandomNum(
        { min: 200, max: 1600 },
        { min: 100, max: 800 },
        levelNum
      );
      let param = {};
      // if (level > 5) {
      param = {
        id: nanoid(),
        style: {
          zIndex: level,
          //起始 200 ，结尾800
          left: levelRandArr[sheepIndex - 1].x + 'px',
          top: levelRandArr[sheepIndex - 1].y + 'px',
          cursor: 'pointer',
          // back: 'rgba(255,255,255,1)',
        },
      };
      /* else
          param = {
            id: nanoid(),
            style: {
              zIndex: level,
              //起始 200 ，结尾800
              left: 200 + randomRange(1, 600) + 'px',
              top: 100 + randomRange(1, 300) + 'px',
              cursor: 'pointer',
            },
          };  */
      /* }  else {
        param = {
          id: nanoid(),
          style: {
            zIndex: level,
            // 起始200，结尾1600
            left:
              200 +
              (10 - level) * 50 +
              randomRange(1, 800 - (200 + (10 - level) * 50)) +
              'px',
            // 起始100，结尾700
            top:
              100 +
              (10 - level) * 50 +
              randomRange(1, 400 - (100 + (10 - level) * 50)) +
              'px',
            cursor: 'pointer',
          },
        }; */
      sheepFlock.push(param);
    }
  }

  /* for (const item of sheepFlock) {
    if (checkIsKill(item, sheepFlock)) {
      item.style.back = 'rgba(255,255,255,1)';
    } else {
      item.style.back = `rgba(223, 219, 219, ${0.1*item.style.zIndex})`;
    }
  } */
  console.log(sheepFlock);
  return colourSheep(sheepFlock);
  // return sheepFlock.filter((o) => o.id != undefined);
}
// 层次上色
export function colourSheep(sheepFlock) {
  for (const item of sheepFlock) {
    if (checkIsKill(item, sheepFlock)) {
      item.style.back = 'rgba(255,255,255,1)';
    } else {
      item.style.back = `rgba(223, 219, 219, ${0.1 * item.style.zIndex})`;
    }
  }
  return sheepFlock;
}

// 编写产生startNumber至endNumber随机数的函数
function randomRange(startNumber, endNumber) {
  var choice = endNumber - startNumber + 1;
  return Math.floor(Math.random() * choice + startNumber);
}

// 随机生产法 - 行不通，开销大，浏览器会报死
export function getRandomNum(xRange, yRange, countNum) {
  var xyArr = [];
  // 在此处补全代码
  for (let i = 0; i < countNum; i++) {
    let singleXy = {};
    singleXy.x = Math.floor(
      Math.random() * (xRange.max - xRange.min) + xRange.min
    );
    singleXy.y = Math.floor(
      Math.random() * (yRange.max - yRange.min) + yRange.min
    );
    // console.log(singleXy);
    let flag = true;
    const xyRange = {
      xBegin: singleXy.x,
      xEnd: singleXy.x + 50,
      yBegin: singleXy.y,
      yEnd: singleXy.y + 50,
    };
    for (let index = 0; index < xyArr.length; index++) {
      if (isOverlap(xyRange, xyArr[index])) {
        flag = false;
        break;
      }
    }
    if (flag) {
      xyArr.push(singleXy);
    } else {
      i--;
    }
    /* if (!flag) {
      i--;
    } */
  }
  return xyArr;
}
