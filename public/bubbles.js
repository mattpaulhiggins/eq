let canv = document.getElementById("bubbles");
let canvasWidth = canv.width;
let canvasHeight = canv.height;
let ctx = canv.getContext("2d");

function* colorGen() {
  while (true) {
    yield "rgba(15, 159, 181, ";
    yield "rgba(148, 40, 99, ";
    yield "rgba(14, 146, 90, ";
    yield "rgba(24, 94, 170, ";
    yield "rgba(117, 169, 30, ";
  }
}

let colors = colorGen();

class Bubble {
  constructor() {
    this.size = Math.floor(Math.random() * 20 + 2);
    this.x = Math.floor(Math.random() * (canvasWidth - 40) + 40);
    this.y = Math.floor(Math.random() * canvasHeight + 300);
    this.alpha = 1;
    this.color = colors.next().value;
    this.velocity = Math.random() + 0.5;
  }

  update() {
    if (this.y < canvasHeight - canvasHeight / 3) {
      this.y = canvasHeight + 20;
      this.x = Math.floor(Math.random() * (canvasWidth - 20) + 20);
      this.alpha = 1;
    } else {
      if (this.y < canvasHeight - canvasHeight / 4) {
        this.alpha -= 0.05;
      }
      this.y -= this.velocity;
    }
  }
}

const bubble1 = new Bubble();

let bubbles = [];

for (let i = 0; i < 12; i++) {
  bubbles.push(new Bubble());
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    ctx.moveTo(bubbles[i].x, bubbles[i].y);
    ctx.beginPath();
    ctx.arc(bubbles[i].x, bubbles[i].y, bubbles[i].size, 0, 2 * Math.PI);
    ctx.fillStyle = bubbles[i].color + bubbles[i].alpha + ")";
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
