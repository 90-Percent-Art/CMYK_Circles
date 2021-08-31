let colorGrid  = [];
let angleGrid = [];
let startColor = [0,18,34,37];
let endColor = [34,16,0,37];
let margin=100;

function setup() {
  createCanvas(1200, 1200, SVG);
  strokeWeight(1);
  noLoop();
}

function mousePressed(){
  save('/Users/jfossett/Documents/Research/90percentart_p5js/p5/cmyk_circle/outputs/lineCircleColors.svg');
}

function draw(){

  background(255,255,255);
  //blendMode(DIFFERENCE);

  colorGrid=makeColorGrid(20,20, startColor, endColor);
  angleGrid=makeAnglerGrid(20,20,0.1);

  for(i=0; i<20; i++){
    for(j=0; j<20;j++){
      push();
      translate(margin+i*50,margin+j*50);
      let f = colorGrid[i][j];
      stroke(color(f[0],f[1],f[2]));
      //rect(0,0,100,100);
      drawLineCircle(0,0,50,50,f,angleGrid[i][j]*2*PI);
      pop();
    }
  }

}

function drawLineCircle(x,y, d, n, cmy, theta){

  var r = d/2;
  var yloc=0;
  var xloc=0;
  var stepSize = d/n;

  push();
  translate(x,y);
  rotate(theta);
  for(l=1;l<n;l++){
    stroke(getRandomColor(cmy));
    // stroke(color(200,200,200));
    xloc = sqrt(r**2 - yloc**2);
    line(-xloc,yloc,xloc,yloc);
    line(-xloc,-yloc,xloc,-yloc);
    yloc+=stepSize;
  }

  line(-r,0,r,0);

  pop();

}

function getRandomColor(cmyk){

  c = cmyk[0];
  m = cmyk[1];
  y = cmyk[2];
  k = cmyk[3]

  total = c + m + y+k;

  rval=random(0,1);

  if(rval < c/total){
    //return(color(255,0,0));
    return(color('cyan'));
  } else if (rval < (c+m)/total){
    //return(color(0,255,0));
    return(color('magenta'));
  } else if (rval < (c+m+y)/total){
    //return(color(0,0,255));
    return(color('yellow'));
  } else{
    return(color('black'));
  }

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
      grid[i][j] = noise(i*size, j*size);
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
