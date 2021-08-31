//GLOBALS
const COLOR_MAP = ['cyan', 'magenta', 'yellow', 'black'];
//const COLOR_MAP = ['red', 'green', 'blue', 'white'];

// Overall parameters
let xsize = 1100;
let ysize = 1400;

// Circle grid parameters
let circleSize = 40;
let numRows = 20;
let numCols = 20;
let circleSep = 4;
let circleNumLines=80; // max num lines *per color*

// Color parameters
let colorGrid  = [];

// Different palette tests
// let startColor = [0,18,34,37]; // start color of gradient (0-100) values
// let endColor = [34,16,0,37]; // end color of gradient (0-100) values
// let startColor = [0, 35, 35, 13];
// let endColor = [35, 0, 0, 13];
let startColor = [0, 32, 52, 6];
let endColor = [52, 20, 0, 6];

// Angle parameters
let angleGrid = [];
let perlOffset = 0.1;

function setup() {
  createCanvas(xsize, ysize, SVG);
  strokeWeight(1);
  noLoop();
}

function mousePressed(){
  save('lineCircleColorsOverlap.svg');
}

function draw(){

  // Setup
  background(255,255,255);
  //blendMode(DIFFERENCE);

  // Determine start loc
  let xmargin = (xsize - numRows*(circleSep + circleSize))/2;
  let ymargin = (ysize - numCols*(circleSep + circleSize))/2;

  // Make the grids
  colorGrid=makeColorGrid(numRows,numCols, startColor, endColor);
  angleGrid=makeAnglerGrid(numRows,numCols,0.1);

  for(i=0; i<numRows; i++){
    for(j=0; j<numCols;j++){
      push();
      translate(xmargin+i*(circleSize+circleSep),ymargin+j*(circleSize+circleSep));
      drawLineCircle(d=circleSize,n=circleNumLines,cmyk=colorGrid[i][j],theta=angleGrid[i][j]);
      pop();
    }
  }

}

/**
 * Draws one of the circles from specifications (at 0,0)
 * @param  {Number} d The diameter of the circle
 * @param  {Number} n The number of lines *per color* to compose the circle
 * @param  {Array} cmyk An array of length 4 with CMYK values in (0,100)
 * @return Draws the thing
 */
function drawLineCircle(d, n, cmyk, theta){

  var r = d/2;
  var yloc=0;
  var xloc=0;
  var stepSize = d/n;

  push();
  rotate(theta);

  for (cmyk_ind=0; cmyk_ind<cmyk.length; cmyk_ind++){

    color_amnt = cmyk[cmyk_ind]; // 0 to 100
    line_amnt = floor(n*color_amnt/100); // number of lines to draw

    stroke(color(COLOR_MAP[cmyk_ind])) // make the right color

    for(l=1; l<=line_amnt; l++){

      yloc = random(-r, r);
      xloc = sqrt(r**2 - yloc**2);
      line(-xloc,yloc,xloc,yloc);

    }
  }

  pop();

}

function makeColorGrid(nrow, ncol, start, end){
  // start and end are 4d CMYK arrays

  var grid = new Array(nrow);

  for(i=0; i<nrow; i++){
    grid[i] = new Array(ncol); //arrayLerp(start,end,i/nrow);
    for(j=0; j<ncol; j++){
      grid[i][j] = arrayLerp(start, end, i/nrow);
    }
  }

  return(grid);

}

function makeAnglerGrid(nrow, ncol, size){
  // start and end are 4d CMYK arrays

  var grid = new Array(nrow);

  for(i=0; i<nrow; i++){
    grid[i] = new Array(ncol); //arrayLerp(start,end,i/nrow);
    for(j=0; j<ncol; j++){
      grid[i][j] = noise(i*size, j*size)*2*PI;
    }
  }

  return(grid);

}

function arrayLerp(first, second, pct){

  result = [];

  for(k=0; k<first.length; k++){
    result.push(first[k]*(1-pct) + second[k]*pct);
  }

  return(result);
}
