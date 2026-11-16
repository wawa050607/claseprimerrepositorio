let escenaActual = 1;
const totalEscenas = 8;

let imgEscena1 = null;
let btnX, btnY, btnAncho, btnAlto;

function setup() {
  createCanvas(900, 650);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  btnAncho = 240;
  btnAlto = 62;
  btnX = width / 2;
  btnY = height - 65;

  // Intenta cargar la imagen tanto desde la raíz como desde /public
  loadImage(
    'escena1.png',
    (img) => { imgEscena1 = img; },
    () => {
      loadImage('/escena1.png', (img) => { imgEscena1 = img; });
    }
  );
}

function draw() {
  switch (escenaActual) {
    case 1: dibujarEscena1(); break;
    case 2: dibujarEscena2(); break;
    case 3: dibujarEscena3(); break;
    case 4: dibujarEscena4(); break;
    case 5: dibujarEscena5(); break;
    case 6: dibujarEscena6(); break;
    case 7: dibujarEscena7(); break;
    case 8: dibujarEscena8(); break;
  }
}

// ==========================================
// ESCENA 1: INTRODUCCIÓN
// ==========================================
function dibujarEscena1() {
  // Fondo oscuro
  background(8, 6, 10);
  noStroke();
  for (let r = 520; r > 0; r -= 25) {
    fill(38, 10, 15, 14);
    ellipse(width / 2, height / 2 - 40, r * 1.4, r);
  }

  // Imagen PNG centrada
  if (imgEscena1 && imgEscena1.width > 0) {
    let altoImg = 360;
    let anchoImg = (imgEscena1.width / imgEscena1.height) * altoImg;
    image(imgEscena1, width / 2, height / 2 - 80, anchoImg, altoImg);
  } else {
    noFill();
    stroke(180, 50, 50);
    strokeWeight(2);
    rect(width / 2, height / 2 - 80, 260, 320, 10);
    noStroke();
    fill(230, 100, 100);
    textFont('sans-serif');
    textSize(16);
    text("Falta 'escena1.png' en la carpeta del proyecto", width / 2, height / 2 - 80);
  }

  // Fuente Agincourt
  textFont('Agincourt');

  // Título "Nacho y sus aguacates"
  textSize(78);
  fill(0);
  text("Nacho y sus aguacates", width / 2 + 4, height - 156);
  fill(235, 215, 175);
  text("Nacho y sus aguacates", width / 2, height - 160);

  // Botón Empezar
  let sobreBoton = mouseEnBoton(btnX, btnY, btnAncho, btnAlto);
  if (sobreBoton) {
    fill(170, 35, 35);
    stroke(235, 215, 175);
    cursor(HAND);
  } else {
    fill(95, 20, 25);
    stroke(150, 130, 100);
    cursor(ARROW);
  }

  strokeWeight(2);
  rect(btnX, btnY, btnAncho, btnAlto, 12);

  noStroke();
  fill(245, 240, 230);
  textSize(32);
  text("EMPEZAR", btnX, btnY - 3);
}

// ==========================================
// ESCENAS 2 A 8
// ==========================================
function dibujarEscena2() {
  cursor(ARROW);
  background(15, 18, 22);
  mostrarPlantillaEscena(2, "Escena 2");
}

function dibujarEscena3() {
  background(18, 15, 24);
  mostrarPlantillaEscena(3, "Escena 3");
}

function dibujarEscena4() {
  background(14, 20, 18);
  mostrarPlantillaEscena(4, "Escena 4");
}

function dibujarEscena5() {
  background(22, 14, 16);
  mostrarPlantillaEscena(5, "Escena 5");
}

function dibujarEscena6() {
  background(16, 16, 26);
  mostrarPlantillaEscena(6, "Escena 6");
}

function dibujarEscena7() {
  background(20, 18, 14);
  mostrarPlantillaEscena(7, "Escena 7");
}

function dibujarEscena8() {
  background(10, 10, 12);
  mostrarPlantillaEscena(8, "Escena 8 (Clic para reiniciar)");
}

function mostrarPlantillaEscena(numero, titulo) {
  textFont('Agincourt');
  fill(235, 215, 175);
  textSize(56);
  text(titulo, width / 2, height / 2 - 20);

  textFont('sans-serif');
  fill(160);
  textSize(18);
  text("Haz clic o usa las flechas ← → para navegar", width / 2, height / 2 + 45);
}

// ==========================================
// CONTROLES
// ==========================================
function mousePressed() {
  if (escenaActual === 1) {
    if (mouseEnBoton(btnX, btnY, btnAncho, btnAlto)) {
      escenaActual = 2;
    }
  } else if (escenaActual < totalEscenas) {
    escenaActual++;
  } else {
    escenaActual = 1;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && escenaActual < totalEscenas) {
    escenaActual++;
  } else if (keyCode === LEFT_ARROW && escenaActual > 1) {
    escenaActual--;
  }
}

function mouseEnBoton(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}