// --- ESTADOS DEL UNIVERSO MUSICAL ---
let estadoActual = 0;

// Variables de interfaz y texto
let inputConfesion;
let botonEnviar;
let botonSiguiente, botonAnterior;
let confesionGuardada = "";

// Paleta visual esquemática
let colEscenario, colTelon, colLuces;

function setup() {
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
  
  colEscenario = color(60, 40, 30);
  colTelon = color(120, 20, 30);
  colLuces = color(255, 230, 150, 80);

  // --- BOTONES DE NAVEGACIÓN HTML ---
  botonAnterior = createButton('◀ Anterior');
  botonAnterior.position(20, 20);
  botonAnterior.size(100, 30);
  botonAnterior.mousePressed(retrocederEscena);

  botonSiguiente = createButton('Siguiente ▶');
  botonSiguiente.position(135, 20);
  botonSiguiente.size(100, 30);
  botonSiguiente.mousePressed(avanzarEscena);

  // Campo de texto para el Aquelarre Anónimo (Escena 6)
  inputConfesion = createInput('');
  inputConfesion.position(width / 2 - 150, height / 2 + 20);
  inputConfesion.size(300, 30);
  inputConfesion.attribute('placeholder', 'Escribe tu confesión anónima aquí...');
  inputConfesion.hide();

  // Botón para enviar confesión
  botonEnviar = createButton('Enviar Confesión y Tocar');
  botonEnviar.position(width / 2 - 80, height / 2 + 70);
  botonEnviar.size(160, 35);
  botonEnviar.mousePressed(enviarConfesion);
  botonEnviar.hide();
}

function draw() {
  background(20);

  // DIBUJAR BASE COMÚN: El Escenario Teatral
  dibujarEscenarioBase();

  // RENDERIZADO SEGÚN LA ESCENA ACTUAL
  switch (estadoActual) {
    case 0:
      escenaConstruccionEscenario();
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      escenaArmadoBanda(estadoActual);
      break;
    case 6:
      escenaAquelarreAnonimo(); // Escena renombrada con impacto teatral
      break;
    case 7:
      escenaToqueFinalEnMovimiento(); // Concierto animado
      break;
  }

  // Indicador de estado en pantalla
  dibujarIndicadorEstado();
}

// --- ESCENAS ---

function escenaConstruccionEscenario() {
  fill(255);
  textSize(22);
  text("ESCENA 0: EL MONTAJE DEL ESCENARIO", width / 2, 80);
  textSize(15);
  text("Haz clic en 'Siguiente ▶' para comenzar a armar a 'Nacho y sus Aguacates'", width / 2, 110);
  
  stroke(255, 200, 0);
  noFill();
  rect(width / 2 - 120, height / 2 - 50, 240, 100);
  fill(255, 200, 0);
  noStroke();
  text("Escenario Base Listo", width / 2, height / 2);
}

function escenaArmadoBanda(id) {
  dibujarBandaInteractiva(id, false);

  fill(255);
  textSize(22);
  text(`ESCENA ${id}: INTEGRANDO AL INTEGRANTE ${id}`, width / 2, 60);
  textSize(14);
  text("Haz CLIC sobre el elemento flotante de la derecha para ponérselo en la cara y entregar su instrumento", width / 2, 88);

  dibujarElementoFlotante(id);
}

function escenaAquelarreAnonimo() {
  fill(255);
  textSize(22);
  text("ESCENA 6: AQUELARRE ANÓNIMO", width / 2, 60);
  textSize(15);
  text("El ritual de la banda: el público deposita su confesión secreta para invocar el toque.", width / 2, 95);

  // Buzón místico en el escenario central
  fill(80, 30, 40);
  stroke(180, 80, 90);
  strokeWeight(2);
  rect(width / 2 - 70, height / 2 - 65, 140, 70, 5);
  fill(255);
  noStroke();
  textSize(13);
  text("ALTAR DE CONFESIONES", width / 2, height / 2 - 30);

  dibujarBandaInteractiva(5, false);

  inputConfesion.show();
  botonEnviar.show();
}

function escenaToqueFinalEnMovimiento() {
  inputConfesion.hide();
  botonEnviar.hide();

  // La banda completa se dibuja animada (cantando y tocando)
  dibujarBandaInteractiva(5, true);

  // Luces de concierto dinámicas y parpadeantes
  fill(255, 255, 0, random(80, 180));
  triangle(100, 0, width / 2 - 200, height - 100, width / 2 + 200, height - 100);

  fill(255);
  textSize(24);
  text("ESCENA 7: EN VIVO - 'NACHO Y SUS AGUACATES'", width / 2, 50);
  
  fill(0, 255, 150);
  textSize(16);
  text("🎶 ¡Tocando en vivo tras el Aquelarre Anónimo! 🎶", width / 2, 80);

  if (confesionGuardada !== "") {
    fill(255, 230, 100);
    textSize(14);
    text(`Secreto revelado: "${confesionGuardada}"`, width / 2, height - 35);
  }
}

// --- DIBUJO DE ELEMENTOS GRÁFICOS BASE ---

function dibujarEscenarioBase() {
  // Telones laterales
  fill(colTelon);
  noStroke();
  rect(0, 0, 120, height);
  rect(width - 120, 0, 120, height);

  // Piso del escenario
  fill(colEscenario);
  rect(100, height - 150, width - 200, 150);
  
  // Luces cenitales
  fill(colLuces);
  triangle(200, 0, 100, height - 150, 300, height - 150);
  triangle(width - 200, 0, width - 300, height - 150, width - 100, height - 150);
}

// Dibuja los músicos con animaciones opcionales para el concierto
function dibujarBandaInteractiva(totalActivos, animar) {
  let posicionesX = [-300, -150, 0, 150, 300];
  let nombresRoles = ["Percusión", "Bajo", "Guitarra (Aguacate)", "Teclados", "Nacho (Voz)"];

  for (let i = 0; i < 5; i++) {
    push();
    let x = width / 2 + posicionesX[i];
    let y = height - 180;
    
    let offsetVertical = 0;
    let offsetBoca = 0;
    
    if (animar) {
      offsetVertical = sin(frameCount * 0.1 + i) * 6; 
      if (i === 4) { // Nacho (Voz) cantando de forma más expresiva
        offsetVertical = sin(frameCount * 0.15) * 9;
        offsetBoca = sin(frameCount * 0.2) * 3;
      }
    }

    translate(x, y + offsetVertical);
    
    // Cuerpo del músico
    fill(70, 70, 90);
    noStroke();
    rect(-22, 10, 44, 75, 5);
    rect(-6, 0, 12, 15);

    // Cabeza base
    fill(30);
    ellipse(0, -15, 45, 55);

    if (i < totalActivos) {
      dibujarDisenoMascara(i + 1, offsetBoca);
      dibujarInstrumento(i + 1, animar);
    } else {
      fill(100);
      textSize(10);
      text("En espera", 0, -15);
    }

    // Etiqueta del rol
    fill(255);
    noStroke();
    textSize(11);
    text(nombresRoles[i], 0, 100);
    
    pop();
  }
}

// Elemento flotante para ensamblar
function dibujarElementoFlotante(id) {
  push();
  translate(width - 220, height / 2 - 30);
  
  stroke(0, 255, 200);
  strokeWeight(2);
  fill(30, 50, 50, 200);
  rect(-70, -60, 140, 130, 10);

  noStroke();
  fill(255);
  textSize(12);
  text(`Pieza ${id} Lista`, 0, -40);
  text("(Haz Clic Aquí)", 0, 45);

  scale(0.8);
  push();
  translate(0, -5);
  dibujarDisenoMascara(id, 0);
  pop();

  pop();
}

// --- DISEÑOS DE MÁSCARAS E INSTRUMENTOS ---

function dibujarDisenoMascara(idNum, animBoca) {
  switch(idNum) {
    case 1: // Percusión
      fill(160, 90, 40);
      stroke(90, 40, 10);
      strokeWeight(2);
      rect(-16, -32, 32, 40, 4);
      fill(255, 220, 150);
      ellipse(-8, -20, 6, 10);
      ellipse(8, -20, 6, 10);
      break;

    case 2: // Bajo
      fill(210, 210, 220);
      stroke(100);
      strokeWeight(1.5);
      ellipse(0, -16, 38, 48);
      fill(20, 20, 30);
      noStroke();
      triangle(-10, -12, -4, -18, -16, -18);
      triangle(10, -12, 4, -18, 16, -18);
      break;

    case 3: // Guitarra / Aguacate
      fill(90, 160, 60);
      stroke(40, 90, 20);
      strokeWeight(2);
      ellipse(0, -14, 42, 52);
      fill(240, 220, 130);
      ellipse(0, -5, 18, 22);
      fill(40);
      ellipse(-6, -20, 5, 7);
      ellipse(6, -20, 5, 7);
      break;

    case 4: // Teclados
      fill(50, 180, 200);
      stroke(20, 90, 110);
      strokeWeight(2);
      quad(-18, -30, 18, -30, 12, 0, -12, 0);
      fill(255);
      noStroke();
      rect(-10, -20, 20, 6);
      break;

    case 5: // Nacho (Voz principal)
      fill(230, 170, 50);
      stroke(120, 70, 10);
      strokeWeight(2);
      ellipse(0, -15, 46, 58);
      fill(180, 40, 40);
      ellipse(0, 2, 12 + animBoca, 16 + animBoca * 1.5);   
      fill(20);
      ellipse(-10, -22, 7, 10);
      ellipse(10, -22, 7, 10);
      break;
  }
}

function dibujarInstrumento(idNum, animar) {
  stroke(200);
  strokeWeight(1.5);
  noFill();

  let vibracion = animar ? random(-1, 1) : 0;

  switch(idNum) {
    case 1: // Percusión
      fill(120, 80, 50);
      rect(-45, 30 + vibracion, 25, 20, 3);
      rect(20, 30 - vibracion, 25, 20, 3);
      break;

    case 2: // Bajo
      fill(40);
      rect(15, -10 + vibracion, 8, 55, 2);
      break;

    case 3: // Guitarra
      fill(150, 100, 50);
      rect(-22, -5 + vibracion, 7, 50, 2);
      break;

    case 4: // Teclados
      fill(220);
      rect(-30, 40, 60, 12, 2);
      fill(30);
      rect(-25, 42, 50, 4);
      break;

    case 5: // Nacho / Micrófono
      stroke(200, 200, 50);
      strokeWeight(2);
      line(15, 60, 15, -10 + vibracion);
      ellipse(15, -12 + vibracion, 8, 10);
      break;
  }
}

function dibujarIndicadorEstado() {
  fill(250);
  textSize(13);
  text(`Escena actual: ${estadoActual} / 7`, width - 100, 35);
}

// --- INTERACCIÓN POR CLIC EN PANTALLA ---

function mousePressed() {
  if (estadoActual >= 1 && estadoActual <= 5) {
    let xBtn = width - 220;
    let yBtn = height / 2 - 30;
    
    if (mouseX > xBtn - 70 && mouseX < xBtn + 70 && mouseY > yBtn - 60 && mouseY < yBtn + 70) {
      avanzarEscena();
    }
  }
}

// --- LÓGICA DE CONTROL ---

function enviarConfesion() {
  if (inputConfesion.value().trim() !== "") {
    confesionGuardada = inputConfesion.value();
    avanzarEscena();
  }
}

function avanzarEscena() {
  if (estadoActual < 7) {
    estadoActual++;
    actualizarVisibilidadControles();
  }
}

function retrocederEscena() {
  if (estadoActual > 0) {
    estadoActual--;
    actualizarVisibilidadControles();
  }
}

function actualizarVisibilidadControles() {
  if (estadoActual !== 6) {
    inputConfesion.hide();
    botonEnviar.hide();
  }
}