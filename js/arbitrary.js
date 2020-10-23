// grab document items
var canvasArbit = document.getElementById("canvasTwo");
var contextArbit = canvasArbit.getContext("2d");
var sliderArbit = document.getElementById("recurArbit");

// set readout of initial recursion degree
document.getElementById("p").innerHTML = 4;

// start tracking data
var dta2 = new dataTracking(OFFSET[0], OFFSET[1], ANGLE);

// function for constructing arbitrary fractal
// pattern: pattern entered in text box by user
// obj: dataTracking object to be acted on
// recurDeg: recursion degree entered via slider by user
// r: distance to draw (affected by recurDeg)
function constrArbit(pattern, obj, recurDeg, r) {
  var cmmnd = 'f++f++f++';  // base command
  var replStr = pattern;
  if (recurDeg <= 15) {
    r = r / (Math.pow(3, recurDeg - 1));
    for (i = 0; i < recurDeg; i++) {
      // replace f in cmmnd with entered pattern
      cmmnd = cmmnd.replace(/f/g, replStr);
    }
  }
  // execute the pattern on the fractal object
  subFunc(obj, cmmnd, r);
}

// function for drawing the arbitrary fractal in the browser
// obj: dataTracking object to be acted on
function drawArbit(obj) {
  for (i = 0; i < obj.xArray.length; i++) {
    if (i !== obj.xArray.length - 1) {
      drawLine(contextArbit, [obj.xArray[i],
        obj.yArray[i]],
        [obj.xArray[i+1],
      obj.yArray[i+1]]);
    }
    else {
      drawLine(contextArbit, [obj.xArray[i] + OFFSET[0],
        obj.yArray[i] + OFFSET[1]],
        [obj.xArray[0] + OFFSET[0],
      obj.yArray[0] + OFFSET[1]]);
    }
  }
}

// function for handling button clicks
function arbitButton() {
  if (patternTxt.value !== '') {
    contextArbit.clearRect(0, 0, canvasArbit.width, canvasArbit.height);
    dta2.resetVals();
    constrArbit(patternTxt.value, dta2, sliderArbit.value, dist);
    drawArbit(dta2);
  }
  console.log(patternTxt.value);
}

// function for handling slider moves
function updateArbit(val) {
  arbitButton();
  document.getElementById("p").innerHTML = val;
}


// constructing and drawing the arbitrary fractal
constrArbit('f-f++f-f', dta2, 4, dist);
drawArbit(dta2);
