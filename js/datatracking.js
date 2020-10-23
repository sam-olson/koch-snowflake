// grab the canvas
var canvas = document.getElementById("canvasOne");

// set origin
var zer = [canvas.width / 2.0, canvas.height / 2.0];

// calculate angle and offset
const ANGLE = parseFloat((Math.PI / 3).toFixed(10));
var dist = 100;
const OFFSET = [zer[0], zer[1] - 175];

// class for storing x, y, and angle data
class dataTracking {
  constructor(x, y, theta) {
    this.x = x;
    this.y = y;
    this.theta = theta;
  }
  xArray = [OFFSET[0]];
  yArray = [OFFSET[1]];

  appendXY() {
    this.xArray.push(this.x);
    this.yArray.push(this.y);
  }

  resetVals() {
    this.x = OFFSET[0];
    this.y = OFFSET[1];
    this.theta = ANGLE;
    this.xArray = [OFFSET[0]];
    this.yArray = [OFFSET[1]];
  }
}
