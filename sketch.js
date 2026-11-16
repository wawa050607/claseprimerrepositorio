let escenaActual = 1;
const totalEscenas = 8;

// Imágenes
let imgEscena1 = null;
let imgEscena2 = null;
let imgEscena4 = null;

// Audio
let cancion = null;
let musicaSonando = false;

// Botones Escena 1
let btnX, btnY, btnAncho, btnAlto;
let btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto;

// Variables Escena 2 (Telón y botón "Que comience el show")
let telonAbierto = false;
let aperturaTelon = 0;
let marcoTelon = { x: 0, y: 0, w: 0, h: 0 };
let btnShow = { x: 0, y: 0, w: 280, h: 54 };

// Variables Escena 3
let btnConfesar = { x: 0, y: 0, w: 240, h: 54 };

// Variables Escena 4 (Pergamino y escritura directa en p5)
let pergaminoVisible = false;
let escalaPergamino = 0;
let textoConfesionActual = "";
let confesionGuardada = "";
let pergamino = { x: 0, y: 0, w: 0, h: 0 };
let btnGuardar = { x: 0, y: 0, w: 250, h: 50 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  actualizarPosiciones();

  // 1. Carga imagen Escena 1
  intentarCargarImagen([
    'escena1.png',
    'IMAGEN ESCENA 1.png',
    'IMAGEN ESCENA 1.jpg',
    'assets/escena1.png',
    '/escena1.png'
  ], 0, (img) => { imgEscena1 = img; });

  // 2. Carga imagen Escena 2
  intentarCargarImagen([
    'escena2.png',
    'IMAGEN ESCENA 2.png',
    'IMAGEN ESCENA 2.jpg',
    'escena2.jpg',
    'assets/escena2.png',
    '/escena2.png'
  ], 0, (img) => { imgEscena2 = img; });

  // 3. Carga imagen Escena 4
  intentarCargarImagen([
    'escena4.png',
    'IMAGEN ESCENA 4.png',
    'IMAGEN ESCENA 4.jpg',
    'escena4.jpg',
    'assets/escena4.png',
    '/escena4.png'
  ], 0, (img) => { imgEscena4 = img; });

  // 4. Carga el audio nativo
  const posiblesRutasAudio = [
    'elviejogordo.mp3',
    '/elviejogordo.mp3',
    'assets/elviejogordo.mp3',
    '/assets/elviejogordo.mp3'
  ];
  intentarCargarAudio(posiblesRutasAudio, 0);
}

function intentarCargarAudio(rutas, indice) {
  if (indice >= rutas.length) return;
  let audioTest = new Audio(rutas[indice]);
  audioTest.loop = true;
  audioTest.volume = 0.7;

  audioTest.addEventListener('canplaythrough', () => {
    cancion = audioTest;
  }, { once: true });

  audioTest.addEventListener('error', () => {
    intentarCargarAudio(rutas, indice + 1);
  }, { once: true });
}

function intentarCargarImagen(rutas, indice, callbackExito) {
  if (indice >= rutas.length) return;
  loadImage(
    rutas[indice],
    (img) => {
      if (img && img.width > 0) {
        callbackExito(img);
      } else {
        intentarCargarImagen(rutas, indice + 1, callbackExito);
      }
    },
    () => {
      intentarCargarImagen(rutas, indice + 1, callbackExito);
    }
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  actualizarPosiciones();
}

function actualizarPosiciones() {
  // Escena 1
  btnAncho = 220;
  btnAlto = 54;
  btnX = width / 2;
  btnY = height - 55;

  btnAudioAncho = 155;
  btnAudioAlto = 38;
  btnAudioX = width - 100;
  btnAudioY = 38;

  // Escena 2
  marcoTelon.w = min(width * 0.48, 560);
  marcoTelon.h = height * 0.72;
  marcoTelon.x = width * 0.68;
  marcoTelon.y = height * 0.52;

  btnShow.w = min(marcoTelon.w * 0.78, 320);
  btnShow.h = 54;
  btnShow.x = marcoTelon.x;
  btnShow.y = marcoTelon.y + marcoTelon.h * 0.34;

  // Escena 3
  btnConfesar.w = 240;
  btnConfesar.h = 54;
  btnConfesar.x = width / 2;
  btnConfesar.y = height - 85;

  // Escena 4 (Pergamino)
  pergamino.w = min(width * 0.62, 620);
  pergamino.h = min(height * 0.66, 440);
  pergamino.x = width / 2;
  pergamino.y = height * 0.48;

  btnGuardar.w = 250;
  btnGuardar.h = 50;
  btnGuardar.x = pergamino.x;
  btnGuardar.y = pergamino.y + pergamino.h * 0.36;
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
// CONTROL CENTRAL DE CAMBIO DE ESCENA
// ==========================================
function cambiarEscena(nuevaEscena) {
  escenaActual = nuevaEscena;

  if (escenaActual === 2) {
    telonAbierto = false;
    aperturaTelon = 0;
  }

  if (escenaActual === 4) {
    pergaminoVisible = false;
    escalaPergamino = 0;
    textoConfesionActual = "";
  }

  if (escenaActual >= 4) {
    detenerMusica();
  }
}

function detenerMusica() {
  if (cancion && musicaSonando) {
    cancion.pause();
    cancion.currentTime = 0;
    musicaSonando = false;
  }
}

// ==========================================
// ESCENA 1: INTRODUCCIÓN
// ==========================================
function dibujarEscena1() {
  background(8, 6, 10);
  noStroke();
  for (let r = max(width, height) * 0.7; r > 0; r -= 30) {
    fill(38, 10, 15, 14);
    ellipse(width / 2, height * 0.42, r * 1.3, r);
  }

  let altoImg = height * 0.48;
  let posYImg = height * 0.34;
  let posYTitulo = height - 135;

  if (imgEscena1 && imgEscena1.width > 0) {
    let anchoImg = (imgEscena1.width / imgEscena1.height) * altoImg;
    image(imgEscena1, width / 2, posYImg, anchoImg, altoImg);
  }

  textFont('Agincourt');

  let tamTitulo = constrain(width * 0.065, 44, 72);
  textSize(tamTitulo);
  fill(0);
  text("Nacho y sus aguacates", width / 2 + 3, posYTitulo + 3);
  fill(235, 215, 175);
  text("Nacho y sus aguacates", width / 2, posYTitulo);

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
  if (!cancion) {
    cancion = new Audio('elviejogordo.mp3');
    cancion.loop = true;
    cancion.volume = 0.7;
  }

  if (!musicaSonando) {
    cancion.play()
      .then(() => { musicaSonando = true; })
      .catch((err) => { console.error("Error al reproducir:", err); });
  } else {
    cancion.pause();
    musicaSonando = false;
  }
}

// ==========================================
// ESCENA 2: SILUETA + TELÓN (FONDO ROJO VINO PROFUNDO)
// ==========================================
function dibujarEscena2() {
  background(32, 6, 12);

  noStroke();
  for (let r = max(width, height) * 0.9; r > 0; r -= 35) {
    fill(62, 11, 22, 12);
    ellipse(width * 0.45, height * 0.5, r * 1.4, r);
  }

  for (let r = height * 0.75; r > 0; r -= 30) {
    fill(95, 28, 22, 10);
    ellipse(width * 0.24, height * 0.52, r * 0.9, r * 1.1);
  }

  let posXImg = width * 0.23;
  let posYImg = height * 0.53;
  let altoImg = height * 0.82;

  if (imgEscena2 && imgEscena2.width > 0) {
    let anchoImg = (imgEscena2.width / imgEscena2.height) * altoImg;
    image(imgEscena2, posXImg, posYImg, anchoImg, altoImg);
  } else {
    noFill();
    stroke(180, 90, 90);
    rect(posXImg, posYImg, altoImg * 0.65, altoImg, 10);
    noStroke();
    fill(235, 160, 160);
    textFont('sans-serif');
    textSize(15);
    text("Sube la imagen como\n'escena2.png'", posXImg, posYImg);
  }

  let mx = marcoTelon.x;
  let my = marcoTelon.y;
  let mw = marcoTelon.w;
  let mh = marcoTelon.h;

  fill(14, 4, 8);
  stroke(185, 150, 85);
  strokeWeight(3);
  rect(mx, my, mw, mh, 14);

  noStroke();
  textFont('Agincourt');
  fill(235, 215, 175);
  textSize(constrain(mw * 0.08, 28, 42));
  text("La Banda", mx, my - mh * 0.32);

  textFont('sans-serif');
  fill(210, 195, 180);
  textSize(constrain(mw * 0.032, 14, 18));
  text(
    "[ Descripción de la banda próximamente ]\n\nAquí irá la historia y esencia de\nNacho y sus aguacates.",
    mx,
    my - mh * 0.05,
    mw * 0.78,
    mh * 0.45
  );

  let sobreBtnShow = telonAbierto && aperturaTelon > 0.85 && mouseEnBoton(btnShow.x, btnShow.y, btnShow.w, btnShow.h);
  if (sobreBtnShow) {
    fill(175, 38, 38);
    stroke(235, 215, 175);
  } else {
    fill(90, 16, 26);
    stroke(185, 150, 85);
  }
  strokeWeight(2);
  rect(btnShow.x, btnShow.y, btnShow.w, btnShow.h, 12);

  noStroke();
  fill(245, 240, 230);
  textFont('Agincourt');
  textSize(constrain(btnShow.w * 0.095, 20, 28));
  text("Que comience el show", btnShow.x, btnShow.y - 2);

  if (telonAbierto && aperturaTelon < 1) {
    aperturaTelon = lerp(aperturaTelon, 1, 0.06);
    if (aperturaTelon > 0.995) aperturaTelon = 1;
  }

  dibujarTelon(mx, my, mw, mh, aperturaTelon);

  let sobreTelonCerrado = !telonAbierto && mouseEnBoton(mx, my, mw, mh);
  if (sobreTelonCerrado || sobreBtnShow) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function dibujarTelon(mx, my, mw, mh, apertura) {
  push();
  rectMode(CORNER);

  let bordeIzq = mx - mw / 2;
  let bordeDer = mx + mw / 2;
  let bordeSup = my - mh / 2;

  let anchoHoja = lerp(mw / 2, mw * 0.11, apertura);

  dibujarHojaTelon(bordeIzq, bordeSup, anchoHoja, mh, true);
  dibujarHojaTelon(bordeDer - anchoHoja, bordeSup, anchoHoja, mh, false);

  noStroke();
  let numOndas = 6;
  let anchoOnda = mw / numOndas;
  for (let i = 0; i < numOndas; i++) {
    let cx = bordeIzq + i * anchoOnda + anchoOnda / 2;
    fill(115, 16, 28);
    arc(cx, bordeSup + 6, anchoOnda + 6, 48, 0, PI);
    noFill();
    stroke(205, 170, 95);
    strokeWeight(2);
    arc(cx, bordeSup + 6, anchoOnda + 6, 48, 0.15, PI - 0.15);
    noStroke();
  }

  fill(185, 150, 85);
  rect(bordeIzq - 4, bordeSup - 4, mw + 8, 12, 6);

  if (!telonAbierto && apertura < 0.1) {
    rectMode(CENTER);
    fill(14, 4, 8, 210);
    stroke(205, 170, 95);
    strokeWeight(1.5);
    rect(mx, my, 270, 48, 24);

    noStroke();
    fill(240, 225, 190);
    textFont('sans-serif');
    textSize(15);
    text("🎭 Haz clic para abrir el telón", mx, my);
  }

  pop();
}

function dibujarHojaTelon(x, y, w, h, esIzquierda) {
  noStroke();
  fill(145, 22, 36);
  rect(x, y, w, h, 4);

  let numPliegues = 5;
  let anchoPliegue = w / numPliegues;
  for (let i = 0; i < numPliegues; i++) {
    let px = x + i * anchoPliegue;
    fill(75, 8, 18, 160);
    rect(px, y, anchoPliegue * 0.45, h);
    fill(190, 40, 55, 95);
    rect(px + anchoPliegue * 0.45, y, anchoPliegue * 0.3, h);
  }

  stroke(205, 170, 95);
  strokeWeight(3);
  if (esIzquierda) {
    line(x + w - 2, y + 10, x + w - 2, y + h - 4);
  } else {
    line(x + 2, y + 10, x + 2, y + h - 4);
  }
  noStroke();
}

// ==========================================
// ESCENA 3: TEXTO GIGANTE DE CONFESIÓN
// ==========================================
function dibujarEscena3() {
  background(10, 5, 8);
  noStroke();
  for (let r = max(width, height) * 0.85; r > 0; r -= 35) {
    fill(48, 8, 16, 12);
    ellipse(width / 2, height * 0.46, r * 1.4, r);
  }

  textFont('Agincourt');
  let tamGigante = constrain(width * 0.088, 52, 115);
  textSize(tamGigante);
  textLeading(tamGigante * 1.08);

  let textoConfesion = "HAZ TU CONFESIÓN\nANONIMA PARA EMPEZAR";
  let posYTexto = height * 0.44;

  fill(0);
  text(textoConfesion, width / 2 + 5, posYTexto + 5, width * 0.88, height * 0.65);

  let brillo = map(sin(frameCount * 0.04), -1, 1, 220, 250);
  fill(brillo, brillo - 20, brillo - 55);
  text(textoConfesion, width / 2, posYTexto, width * 0.88, height * 0.65);

  let sobreBtn = mouseEnBoton(btnConfesar.x, btnConfesar.y, btnConfesar.w, btnConfesar.h);
  if (sobreBtn) {
    fill(170, 35, 35);
    stroke(235, 215, 175);
    cursor(HAND);
  } else {
    fill(90, 18, 25);
    stroke(165, 140, 100);
    cursor(ARROW);
  }

  strokeWeight(2);
  rect(btnConfesar.x, btnConfesar.y, btnConfesar.w, btnConfesar.h, 12);

  noStroke();
  fill(245, 240, 230);
  textSize(28);
  text("CONTINUAR", btnConfesar.x, btnConfesar.y - 2);
}

// ==========================================
// ESCENA 4: FONDO DE CARTAS + PERGAMINO INTERACTIVO
// ==========================================
function dibujarEscena4() {
  background(8, 6, 10);

  if (imgEscena4 && imgEscena4.width > 0) {
    let escalaImg = min(width / imgEscena4.width, height / imgEscena4.height);
    let wImg = imgEscena4.width * escalaImg;
    let hImg = imgEscena4.height * escalaImg;
    image(imgEscena4, width / 2, height / 2, wImg, hImg);
  } else {
    fill(200, 90, 90);
    textFont('sans-serif');
    textSize(16);
    text("Sube la imagen como 'escena4.png' o 'IMAGEN ESCENA 4.jpg'", width / 2, height / 2);
  }

  if (!pergaminoVisible) {
    cursor(HAND);

    let alfa = map(sin(frameCount * 0.05), -1, 1, 180, 245);
    fill(12, 8, 10, 215);
    stroke(215, 180, 110, alfa);
    strokeWeight(2);
    rect(width / 2, height - 58, 390, 50, 25);

    noStroke();
    fill(240, 225, 190, alfa);
    textFont('sans-serif');
    textSize(16);
    text("📜 Haz clic en la pantalla para abrir el pergamino", width / 2, height - 58);
    return;
  }

  fill(0, 0, 0, 145 * escalaPergamino);
  noStroke();
  rect(width / 2, height / 2, width, height);

  if (escalaPergamino < 1) {
    escalaPergamino = lerp(escalaPergamino, 1, 0.1);
    if (escalaPergamino > 0.99) escalaPergamino = 1;
  }

  dibujarPergamino(pergamino.x, pergamino.y, pergamino.w, pergamino.h, escalaPergamino);
}

function dibujarPergamino(px, py, pw, ph, escala) {
  push();
  translate(px, py);
  scale(escala);

  // Sombra proyectada
  noStroke();
  fill(0, 0, 0, 150);
  rect(8, 12, pw + 24, ph, 12);

  // Cuerpo del papel antiguo
  fill(236, 216, 174);
  stroke(155, 118, 68);
  strokeWeight(3);
  rect(0, 0, pw, ph, 6);

  // Borde envejecido
  noFill();
  stroke(185, 148, 92, 160);
  strokeWeight(10);
  rect(0, 0, pw - 14, ph - 14, 4);

  // Líneas de escritura antigua
  stroke(160, 125, 78, 70);
  strokeWeight(1);
  let inicioLineas = -ph * 0.22;
  let finLineas = ph * 0.16;
  for (let y = inicioLineas; y <= finLineas; y += 30) {
    line(-pw * 0.36, y, pw * 0.36, y);
  }

  // Rollos superior e inferior
  dibujarRolloPergamino(0, -ph / 2, pw + 38);
  dibujarRolloPergamino(0, ph / 2, pw + 38);

  // Encabezado
  noStroke();
  textFont('Agincourt');
  fill(78, 42, 18);
  textSize(constrain(pw * 0.06, 26, 36));
  text("Tu Confesión Anónima", 0, -ph * 0.36);

  // Área de texto escrita directamente en el canvas
  textFont('Georgia');
  textStyle(ITALIC);
  textSize(20);
  textLeading(30);

  let cursorParpadeo = (frameCount % 50 < 28) ? "|" : "";

  if (textoConfesionActual.length === 0) {
    fill(135, 102, 62, 180);
    text(
      "Empieza a escribir en tu teclado...\n" + cursorParpadeo,
      0,
      -ph * 0.04,
      pw * 0.72,
      ph * 0.44
    );
  } else {
    fill(43, 25, 13);
    text(
      textoConfesionActual + cursorParpadeo,
      0,
      -ph * 0.04,
      pw * 0.72,
      ph * 0.44
    );
  }
  textStyle(NORMAL);

  // Botón "GUARDAR CONFESIÓN"
  let sobreBtnGuardar = mouseEnBoton(btnGuardar.x, btnGuardar.y, btnGuardar.w, btnGuardar.h);
  if (sobreBtnGuardar) {
    fill(145, 28, 28);
    stroke(78, 42, 18);
    cursor(HAND);
  } else {
    fill(92, 22, 24);
    stroke(140, 100, 55);
    cursor(TEXT);
  }

  strokeWeight(2);
  rect(0, ph * 0.36, btnGuardar.w, btnGuardar.h, 10);

  noStroke();
  fill(245, 232, 205);
  textFont('Agincourt');
  textSize(24);
  text("GUARDAR CONFESIÓN", 0, ph * 0.36 - 2);

  pop();
}

function dibujarRolloPergamino(rx, ry, anchoRollo) {
  fill(218, 192, 142);
  stroke(135, 98, 52);
  strokeWeight(2);
  rect(rx, ry, anchoRollo, 24, 12);

  noStroke();
  fill(175, 142, 92, 130);
  rect(rx, ry + 5, anchoRollo - 10, 7, 6);

  fill(85, 48, 24);
  stroke(50, 26, 12);
  strokeWeight(1.5);
  rect(rx - anchoRollo / 2 - 8, ry, 16, 32, 5);
  rect(rx + anchoRollo / 2 + 8, ry, 16, 32, 5);
}

// ==========================================
// ESCENAS 5 A 8
// ==========================================
function dibujarEscena5() {
  cursor(ARROW);
  background(22, 14, 16);
  mostrarPlantillaEscena(5, "Escena 5");

  if (confesionGuardada !== "") {
    fill(200, 185, 160);
    textFont('sans-serif');
    textSize(16);
    text('Confesión guardada: "' + confesionGuardada + '"', width / 2, height * 0.65);
  }
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
// CONTROLES DE NAVEGACIÓN, MOUSE Y TECLADO
// ==========================================
function mousePressed() {
  // Asegura foco en la ventana para capturar el teclado al instante
  window.focus();

  if (escenaActual === 1) {
    if (mouseEnBoton(btnAudioX, btnAudioY, btnAudioAncho, btnAudioAlto)) {
      alternarMusica();
      return;
    }

    if (mouseEnBoton(btnX, btnY, btnAncho, btnAlto)) {
      if (!musicaSonando) {
        alternarMusica();
      }
      cambiarEscena(2);
      return;
    }

    if (!musicaSonando) {
      alternarMusica();
    }
  } 
  else if (escenaActual === 2) {
    if (!telonAbierto && mouseEnBoton(marcoTelon.x, marcoTelon.y, marcoTelon.w, marcoTelon.h)) {
      telonAbierto = true;
      return;
    }

    if (telonAbierto && aperturaTelon > 0.7 && mouseEnBoton(btnShow.x, btnShow.y, btnShow.w, btnShow.h)) {
      cambiarEscena(3);
      return;
    }
  }
  else if (escenaActual === 3) {
    if (mouseEnBoton(btnConfesar.x, btnConfesar.y, btnConfesar.w, btnConfesar.h)) {
      cambiarEscena(4);
      return;
    }
  }
  else if (escenaActual === 4) {
    // 1. Si el pergamino aún no está abierto, al presionar la pantalla se abre
    if (!pergaminoVisible) {
      pergaminoVisible = true;
      return;
    }

    // 2. Si el pergamino está abierto y hacen clic en "GUARDAR CONFESIÓN"
    if (escalaPergamino > 0.85 && mouseEnBoton(btnGuardar.x, btnGuardar.y, btnGuardar.w, btnGuardar.h)) {
      let textoLimpio = textoConfesionActual.trim();
      confesionGuardada = textoLimpio !== "" ? textoLimpio : "(Confesión silenciosa)";
      cambiarEscena(5);
      return;
    }
  }
  else if (escenaActual < totalEscenas) {
    cambiarEscena(escenaActual + 1);
  } else {
    cambiarEscena(1);
  }
}

// Captura letras, números, espacios, tildes y signos al escribir en el pergamino
function keyTyped() {
  if (escenaActual === 4 && pergaminoVisible) {
    if (key !== 'Enter' && textoConfesionActual.length < 260) {
      textoConfesionActual += key;
    }
    return false; // Evita comportamientos por defecto del navegador
  }
}

function keyPressed() {
  // Manejo de teclas especiales (Borrar y Enter) cuando se escribe en el pergamino
  if (escenaActual === 4 && pergaminoVisible) {
    if (keyCode === BACKSPACE) {
      textoConfesionActual = textoConfesionActual.slice(0, -1);
      return false;
    }
    if (keyCode === ENTER || keyCode === RETURN) {
      if (textoConfesionActual.length < 250) {
        textoConfesionActual += "\n";
      }
      return false;
    }
    return;
  }

  if (keyCode === RIGHT_ARROW && escenaActual < totalEscenas) {
    cambiarEscena(escenaActual + 1);
  } else if (keyCode === LEFT_ARROW && escenaActual > 1) {
    cambiarEscena(escenaActual - 1);
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