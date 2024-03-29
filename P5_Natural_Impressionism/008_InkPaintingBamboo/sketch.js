// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Twitter: https://twitter.com/chihyungchang66
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

//p5.js shader basic structure ref from https://www.openprocessing.org/sketch/920144

var seed = 3244 * Math.random();

let theShader;
let webGLCanvas;
let originalGraphics;
let particles = [];
let overallTexture;
let bgColor;

let overAllTexture;

function preload() {}
function preload() {
  overallTexture = loadImage("canvas-light.jpeg");
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  pixelDensity(5);
  createCanvas((1000 / 16) * 11, 1000);
  webGLCanvas = createGraphics(width, height, WEBGL);
  originalGraphics = createGraphics(width, height);

  originalGraphics.noStroke();

  originalGraphics.push();
  originalGraphics.blendMode(MULTIPLY);
  originalGraphics.image(overallTexture, 0, 0, (1000 / 16) * 11, height);
  originalGraphics.pop();

  // bgColor=color(255)
  // originalGraphics.background(bgColor);
  // originalGraphics.rect(-width,-height,width*2,height*2)

  // originalGraphics.drawingContext.shadowColor=color(0,1)
  // originalGraphics.drawingContext.shadowOffsetY=-10
  // originalGraphics.drawingContext.shadowOffsetX=-10

  for (let i = 0; i < 3; i++) {
    particles.push(
      new BambooBackbone({
        p: createVector(random(width), height),
        a: random(-45, 45),
        weight: int(random(20, 50)),
      })
    );
  }

  makeFilter(2);
}

function draw() {
  webGLCanvas.shader(theShader);
  theShader.setUniform("u_resolution", [width / 1000, height / 1000]);
  theShader.setUniform("u_time", millis() / 1000);
  theShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
  theShader.setUniform("u_tex", originalGraphics);

  webGLCanvas.clear();

  background(0);

  webGLCanvas.rect(-width / 2, -height / 2, width, height);

  particles.forEach((p) => {
    p.update(originalGraphics);
    p.draw(originalGraphics);
  });
  particles = particles.filter((p) => p.alive);

  originalGraphics.noStroke();

  // blendMode(HARD_LIGHT); // alpha: 20 ~ 40
  // blendMode(DIFFERENCE); // alpha: 20 ~ 100
  // blendMode(DODGE); // alpha: 1 ~ 40
  // blendMode(BURN); // alpha: 1 ~ 40

  image(webGLCanvas, 0, 0);

  if (particles.length == 0) {
    // noFill();
    // stroke("#202020");
    // strokeWeight(10);
    // rect(0, 0, width, height);
    image(overAllTexture, 0, 0);
  }
}
