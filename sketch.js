class Coord {
  constructor(name, xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = name;
  }
}

class RandomCoordSet {
  constructor(nameRand, xPosRand, yPosRand) {
    this.xPosRand = xPosRand;
    this.yPosRand = yPosRand;
    this.nameRand = nameRand;
  }
}

let clickVar = false;

let arrayNumber;
let arrayRow;
let incr = 100;
let drawCount = 0;
let colorVar;

let xMove;
let yMove;
let xIncr;
let yIncr;

let table;
let coords = [];

let widthVar;
let drawArea;

let length;

let randomArray = [];



function preload() {
  table = loadTable("coordsData_rev(10s).csv", "csv", "header");
}

function loadData() {
  const coordsData = table.getRows();
  length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    let name = coordsData[i].getNum("array#");
    let xPos = coordsData[i].getNum("x");
    let yPos = coordsData[i].getNum("y");
    coords[i] = new Coord(name, xPos, yPos);
  }
}

function createWindow() {

  getWrapperWidth();
  createCanvas(wrapperWide, wrapperWide);

  widthVar = (width - 40) / 100;
  drawArea = (width - 40);
}

function windowResized() {

  getWrapperWidth();
  resizeCanvas(wrapperWide, wrapperWide);

  widthVar = (width - 40) / 100;
  drawArea = (width - 40);

  switchBox();
  btnValue = btnValueHold;
}

function randomArrayMaker() {

  let count = 0;

  let nameRand = btnValue;

  let xPosRand = int(random(0, 100));
  let yPosRand = int(random(0, 100));
  let xMoveRand = int(random(0, 5));
  let yMoveRand = int(random(0, 5));

  let xDirRand = 1;
  let yDirRand = 1;

  randomArray[count] = new RandomCoordSet(nameRand, xPosRand, yPosRand);

  while (count < 10) {

    if ((xMoveRand == 0) && (yMoveRand == 0)) {//if the dot gets stuck, draw again
      xMoveRand = int(random(0, 5));
      yMoveRand = int(random(0, 5));
    }

    for (let i = 0; i < xMoveRand; i++) {
      xPosRand += xDirRand;
      if ((xPosRand <= 0) || (xPosRand >= 100)) {
        xMoveRand = int(random(0, 5));
        yMoveRand = int(random(0, 5));
        xDirRand *= -1;
        count++;
        randomArray[count] = new RandomCoordSet(nameRand, xPosRand, yPosRand);
        break;
      }
    }

    for (let i = 0; i < yMoveRand; i++) {
      yPosRand += yDirRand;
      if ((yPosRand <= 0) || (yPosRand >= 100)) {
        xMoveRand = int(random(0, 5));
        yMoveRand = int(random(0, 5));
        yDirRand *= -1;
        count++;
        randomArray[count] = new RandomCoordSet(nameRand, xPosRand, yPosRand);
        break;
      }
    }
  }
  newRandModal();
}


function setup() {
  loadData();
  createWindow();
  colorMode(RGB, 255, 255, 255);
  rectMode(CORNER);
}

function switchBox() {
  switch (btnValue) {
    case (btnValue):
      if (btnValue == 100) {
        randomArrayMaker();
        for (let i = 0; i < 10; i++) {
          xPos = randomArray[i].xPosRand;
          yPos = randomArray[i].yPosRand;
          name = randomArray[i].nameRand;
          coords[i + 1000] = new Coord(name, xPos, yPos);
        }
        arrayNumber = btnValue * 10;
        arrayRow = btnValue * 10;
      }
      else if (btnValue != 0) {
        arrayNumber = btnValue * 10;
        arrayRow = btnValue * 10
      } else {
        arrayNumber = btnValue;
        arrayRow = btnValue;
      }
      drawCount = 0;
      fill(255);
      noStroke();
      rect(0, 0, width, height);
      stroke(90);
      strokeWeight(1);

      push();
      translate(0, 20);
      stroke(255, 180, 217);
      line(0, 0, width, 0);
      for (let i = 1; i <= 100; i++) {
        if (i % 10 == 0) {
          stroke(255, 180, 217)
        } else {
          stroke(255, 180, 217, 50);
        }
        line(0, (drawArea / 100) * i, width, (drawArea / 100) * i);
      }
      pop();

      push();
      translate(20, 0);
      stroke(255, 180, 217);
      line(0, 0, 0, height);
      for (let i = 1; i <= 100; i++) {
        if (i % 10 == 0) {
          stroke(255, 180, 217)
        } else {
          stroke(255, 180, 217, 50)
        }
        line((drawArea / 100) * i, 0, (drawArea / 100) * i, height);
      }
      pop();
      break;
  }
}

function draw() {

  if (btnValue != null) {
    switchBox();
    btnValue = null;
  }

  if ((drawCount == 0) && (arrayRow < arrayNumber + 9)) {
    xMove = ((coords[arrayRow + 1].xPos * widthVar) - (coords[arrayRow].xPos * widthVar)) / incr;
    yMove = ((coords[arrayRow + 1].yPos * widthVar) - (coords[arrayRow].yPos * widthVar)) / incr;
    xIncr = xMove;
    yIncr = yMove;
  }

  if (arrayRow < arrayNumber + 9) {
    strokeWeight(5);
    strokeCap(ROUND);
    stroke(255, 0, 100);
    push();
    translate(20, 20);
    beginShape();
    vertex(coords[arrayRow].xPos * widthVar, coords[arrayRow].yPos * widthVar);
    vertex((coords[arrayRow].xPos * widthVar) + xMove, (coords[arrayRow].yPos * widthVar) + yMove);
    endShape();
    pop();
  }

  xMove += xIncr;
  yMove += yIncr;
  drawCount++;

  if (drawCount == incr) {
    arrayRow++;
    drawCount = 0;
  }
}