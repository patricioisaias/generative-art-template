// Set the document title
document.title = "Generative Art Template";

// Define canvas dimensions
const canvasWidth = 620;
const canvasHeight = 877;

// Global variables
let w, h, pg;
let pointDensity = 4; // Export resolution for A4 paper at 300 DPI
const seed = 123456789 * Math.random(); // Use $fx.rand() for fxhash
const copyright = `${document.title} by Patricio Isaías, 2024`;
console.log(copyright);

function setup() {
  // Create the main canvas
  createCanvas(canvasWidth, canvasHeight);

  // Create off-screen graphics buffer with the same size as the canvas
  pg = createGraphics(canvasWidth, canvasHeight);

  // Initialize shortcut variables for convenience
  w = pg.width;
  h = pg.height;

  // Draw your art
  drawArt();

  // Run only once
  noLoop();
}

function config() {
  // Initialize random and noise seeds
  randomSeed(seed);
  noiseSeed(seed);

  // Set pixel density for both main canvas and buffer
  pixelDensity(pointDensity);
  pg.pixelDensity(pointDensity);
}

function drawArt() {
  // Set seed and pixel density
  config();

  // Simple generative art example
  let bgColor = color(random(255), random(255), random(255));
  pg.background(bgColor);

  for (let i = 0; i < 100; i++) {
    let x = random(w);
    let y = random(h);
    let s = random(w / 10);
    pg.ellipse(x, y, s);
  }

  // Display the buffer
  image(pg, 0, 0, canvasWidth, canvasHeight);
}

function keyPressed() {
  // Change pixel density and save image based on keys for high-resolution exports
  switch (key) {
    case "1":
      setPixelDensity(4, "A4");
      saveImage("A4");
      break;
    case "2":
      setPixelDensity(5.66, "A3");
      saveImage("A3");
      break;
    case "3":
      setPixelDensity(8, "A2");
      saveImage("A2");
      break;
  }

  // Log the seed when the space bar key is pressed
  if (key === " ") {
    console.log(`Seed: ${seed}`);
  }
}

function setPixelDensity(newDensity, sizeName) {
  // Change pixel density for both canvas and buffer
  pointDensity = newDensity;
  pixelDensity(pointDensity);
  pg.pixelDensity(pointDensity);
  console.log(`Pixel density set to ${pointDensity} (${sizeName})`);

  // Redraw all the content
  drawArt();
}

function saveImage(paperSize) {
  const name = "Template";
  const size = paperSize;
  const date = `${nf(day(), 2)}.${nf(month(), 2)}.${year()}`;
  const time = `${nf(hour(), 2)}.${nf(minute(), 2)}.${nf(second(), 2)}`;
  const timeStamp = `${date}.${time}`;
  const fileName = `${name}_${size}_${timeStamp}_${seed}.tiff`;
  pg.save(fileName);
}
