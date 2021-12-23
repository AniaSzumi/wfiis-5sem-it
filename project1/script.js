
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
let planets = [];
let d = canvas.width/660;
let au = 10*d;
let s = 30*d;
let t = 500;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // draw(canvas);
})

function fullsize() {
  updatePlanets(true);
}

function nearest() {
  updatePlanets(false);
}

function updatePlanets(fullsize) {
  planets.length = 0;
  if (fullsize) {
    d = canvas.width/660;
    au = 10*d;
    s = 30*d;
    t = 500;
    planets.push(new Planet(s, 0, 1, 'img/sun.png'));
    planets.push(new Planet(0.38*d, s+0.3*au, 0.24*t, 'img/merkury.png'));
    planets.push(new Planet(0.94*d, s+0.7*au, 0.6*t, 'img/venus.png'));
    planets.push(new Planet(d, s+au, t, 'img/earth.png'));
    planets.push(new Planet(0.53*d, s+1.5*au, 1.88*t, 'img/mars.png'));
    planets.push(new Planet(11*d, s+5*au, 11.8*t, 'img/jupiter.png'));
    planets.push(new Planet(9.44*d, s+9.5*au, 29.4*t, 'img/saturn.png'));
    planets.push(new Planet(4*d, s+19*au, 84*t, 'img/uranus.png'));
    planets.push(new Planet(3.88*d, s+30*au, 164*t, 'img/neptune.png'));
  } else {
    d = canvas.width/90;
    au = 10*d;
    s = 10*d;
    t = 1000;
    planets.push(new Planet(s, 0, 1, 'img/sun.png'));
    planets.push(new Planet(0.38*d, s+0.3*au, 0.24*t, 'img/merkury.png'));
    planets.push(new Planet(0.94*d, s+0.7*au, 0.6*t, 'img/venus.png'));
    planets.push(new Planet(d, s+au, t, 'img/earth.png'));
    planets.push(new Planet(0.53*d, s+1.5*au, 1.88*t, 'img/mars.png'));
  }
  console.log(d);
}

function Planet(r, dist, time, src) {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.r = r;
  this.dist = dist;
  this.radians = Math.random()*Math.PI*2;
  this.velocity = Math.PI*2/time;
  this.img = new Image();
  this.img.src = src;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, this.dist, 0, Math.PI*2);
    ctx.stroke();
    ctx.drawImage(this.img, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
  }

  this.update = function() {
    this.radians += this.velocity;
    this.x = (canvas.width/2) + Math.cos(this.radians) * this.dist;
    this.y = (canvas.height/2) + Math.sin(this.radians) * this.dist;
    this.draw();
  }
}

  planets.push(new Planet(s, 0, 1, 'img/sun.png'));
  planets.push(new Planet(0.38*d, s+0.3*au, 0.24*t, 'img/merkury.png'));
  planets.push(new Planet(0.94*d, s+0.7*au, 0.6*t, 'img/venus.png'));
  planets.push(new Planet(d, s+au, t, 'img/earth.png'));
  planets.push(new Planet(0.53*d, s+1.5*au, 1.88*t, 'img/mars.png'));
  planets.push(new Planet(11*d, s+5*au, 11.8*t, 'img/jupiter.png'));
  planets.push(new Planet(9.44*d, s+9.5*au, 29.4*t, 'img/saturn.png'));
  planets.push(new Planet(4*d, s+19*au, 84*t, 'img/uranus.png'));
  planets.push(new Planet(3.88*d, s+30*au, 164*t, 'img/neptune.png'));


function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  planets.forEach(planet => {
    planet.update();
  });
}

animate();
