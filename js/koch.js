// grab document items
var canvasSnowf = document.getElementById("canvasOne");
var contextSnowf = canvasSnowf.getContext("2d");
var sliderSnowf = document.getElementById("recurSnowf");

// set readout of initial recursion degree
document.getElementById("n").innerHTML = 4;

// start tracking data
var dta = new dataTracking(OFFSET[0], OFFSET[1], ANGLE);

// function for drawing line in the canvas
// ctx: canvas context
// from: starting coords
// to: ending coords
function drawLine(ctx, from, to) {
  ctx.beginPath();
  ctx.moveTo(from[0],from[1]);
  ctx.lineTo(to[0],to[1]);
  ctx.stroke();
}

// function for parsing individual characters in pattern
// obj: dataTracking object to be acted on
// fPlsMn: string containing "f", "+", or "-"
// r: distance to move
function vectorAdd(obj, fPlsMn, r) {

  // if the character is a plus, increase angle by amount ANGLE
  if (fPlsMn === '+') {
    obj.theta += ANGLE;
  }

  // if the character is a minus, decrease angle by amount ANGLE
  else if (fPlsMn === '-') {
    obj.theta -= ANGLE;
  }

  // if character is "f", move forward
  else if (fPlsMn.toLowerCase() === 'f') {
    obj.x -= r * Math.cos(obj.theta);
    obj.y += r * Math.sin(obj.theta);
    obj.appendXY();
  }
}

// function for parsing fractal pattern
// obj: dataTracking object to be acted on
// strng: string containing pattern of "f", "+", and/or "-" characters
// r: distance to move
function subFunc(obj, strng, r) {
  // loop through the string and parse each character
  for (i in strng) {
    if ('f+-'.includes(strng[i])) {
      vectorAdd(obj, strng[i], r);
    }
    else {
      console.log(`No function for character ${strng[i]}`);
    }
  }
}

// function for constructing arbitrary fractal
// obj: dataTracking object to be acted on
// recurDeg: recursion degree entered via slider by user
// r: distance to draw (affected by recurDeg)
function constrSnowf(obj, recurDeg, r) {
  var cmmnd = 'f++f++f++';
  var replStr = 'f-f++f-f';
  if (recurDeg <= 15) {
    r = r / (Math.pow(3, recurDeg - 1));
    for (i = 0; i < recurDeg; i++) {
      cmmnd = cmmnd.replace(/f/g, replStr);
    }
  }
  subFunc(obj, cmmnd, r);
}

// function for drawing the arbitrary fractal in the browser
// obj: dataTracking object to be acted on
function drawSnowf(obj) {
  for (i = 0; i < obj.xArray.length; i++) {
    if (i !== obj.xArray.length - 1) {
      drawLine(contextSnowf, [obj.xArray[i],
        obj.yArray[i]],
        [obj.xArray[i+1],
      obj.yArray[i+1]]);
    }
    else {
      drawLine(contextSnowf, [obj.xArray[i] + OFFSET[0],
        obj.yArray[i] + OFFSET[1]],
        [obj.xArray[0] + OFFSET[0],
      obj.yArray[0] + OFFSET[1]]);
    }
  }
}

// function for updating fractal on change of slider value
function updateSnowf(val) {
  contextSnowf.clearRect(0, 0, canvasSnowf.width, canvasSnowf.height);
  dta.resetVals();
  constrSnowf(dta, val, dist);
  drawSnowf(dta);
  document.getElementById("n").innerHTML = val;
}

// construct and draw snowflake fractal
constrSnowf(dta, sliderSnowf.value, dist);
drawSnowf(dta);
