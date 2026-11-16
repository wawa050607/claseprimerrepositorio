let escenaActual = 1;
const totalEscenas = 8;

let imgEscena1 = null;
let cancion = null;
let musicaSonando = false;

let btnX, btnY, btnAncho, btnAlto;
let btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  actualizarPosiciones();

  // 1. Carga la imagen
  const posiblesRutas = [
    'escena1.png',
    'IMAGEN ESCENA 1.png',
    'IMAGEN ESCENA 1.jpg',
    'assets/escena1.png',
    '/escena1.png'
  ];
  intentarCargarImagen(posiblesRutas, 0);

  // 2. Carga la canción con el nombre exacto de tu archivo
  cancion = createAudio('elviejogordo.mp3');
  cancion.volume(0.7); // Volumen al 70%
}

function intentarCargarImagen(rutas, indice) {
  if (indice >= rutas.length) return;
  loadImage(
    rutas[indice],
    (img) => {
      if (img && img.width > 0) {
        imgEscena1 = img;
      } else {
        intentarCargarImagen(rutas, indice + 1);
      }
    },
    () => {
      intentarCargarImagen(rutas, indice + 1);
    }
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  actualizarPosiciones();
}

function actualizarPosiciones() {
  btnAncho = 220;
  btnAlto = 54;
  btnX = width / 2;
  btnY = height - 55;

  // Botón de audio en la esquina superior derecha
  btnAudioAncho = 140;
  btnAudioAlto = 38;
  btnAudioX = width - 95;
  btnAudioY = 38;
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
  for (let r = max(width, height) * 0.7; r > 0; r -= 30) {
    fill(38, 10, 15, 14);
    ellipse(width / 2, height * 0.42, r * 1.3, r);
  }

  let altoImg = height * 0.48;
  let posYImg = height * 0.34;
  let posYTitulo = height - 135;

  // Imagen PNG centrada
  if (imgEscena1 && imgEscena1.width > 0) {
    let anchoImg = (imgEscena1.width / imgEscena1.height) * altoImg;
    image(imgEscena1, width / 2, posYImg, anchoImg, altoImg);
  }

  // Fuente Agincourt
  textFont('Agincourt');

  // Título "Nacho y sus aguacates"
  let tamTitulo = constrain(width * 0.065, 44, 72);
  textSize(tamTitulo);
  fill(0);
  text("Nacho y sus aguacates", width / 2 + 3, posYTitulo + 3);
  fill(235, 215, 175);
  text("Nacho y sus aguacates", width / 2, posYTitulo);

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
  textSize(28);
  text("EMPEZAR", btnX, btnY - 2);

  // Botón discreto de Música (esquina superior derecha)
  dibujarBotonAudio(sobreBoton);
}

function dibujarBotonAudio(yaTieneCursorHand) {
  let sobreAudio = mouseEnBoton(btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto);
  if (sobreAudio) {
    fill(60, 20, 25);
    stroke(235, 215, 175);
    cursor(HAND);
  } else {
    fill(22, 16, 20);
    stroke(120, 100, 80);
    if (!yaTieneCursorHand) cursor(ARROW);
  }

  strokeWeight(1.5);
  rect(btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto, 20);

  noStroke();
  fill(235, 215, 175);
  textFont('sans-serif');
  textSize(14);
  text(musicaSonando ? "🔊 Sonando" : "🔇 Activar música", btnAudioX, btnAudioY);
}

function alternarMusica() {
  if (!cancion) return;
  if (!musicaSonando) {
    cancion.loop();
    musicaSonando = true;
  } else {
    cancion.pause();
    musicaSonando = false;
  }
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
    // 1. Si hace clic en el botón de música de la esquina
    if (mouseEnBoton(btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto)) {
      alternarMusica();
      return;
    }

    // 2. Si hace clic en "EMPEZAR"
    if (mouseEnBoton(btnX, btnY, btnAncho, btnAlto)) {
      if (cancion && !musicaSonando) {
        cancion.loop();
        musicaSonando = true;
      }
      escenaActual = 2;
      return;
    }

    // 3. Si hace clic en cualquier parte del fondo o del personaje, activa la música
    if (!musicaSonando) {
      alternarMusica();
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