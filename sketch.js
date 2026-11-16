let escenaActual = 1;
const totalEscenas = 8;

let imgEscena1;
let fuenteAgincourt;

// Variables para el botón de empezar
let btnX, btnY, btnAncho, btnAlto;

function preload() {
  // Asegúrate de subir tu imagen con este exacto nombre a tu proyecto
  imgEscena1 = loadImage('IMAGEN ESCENA 1.jpg');
  
  // Carga la fuente Agincourt (debes subir el archivo .ttf o .otf a la carpeta de tu proyecto)
  fuenteAgincourt = loadFont('Agincourt.ttf'); 
}

function setup() {
  createCanvas(900, 650);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  
  // Dimensiones y posición del botón "Empezar"
  btnAncho = 200;
  btnAlto = 50;
  btnX = width / 2;
  btnY = height - 65;
}

function draw() {
  // Controlador de las 8 escenas en continuidad
  switch (escenaActual) {
    case 1:
      dibujarEscena1();
      break;
    case 2:
      dibujarEscena2();
      break;
    case 3:
      dibujarEscena3();
      break;
    case 4:
      dibujarEscena4();
      break;
    case 5:
      dibujarEscena5();
      break;
    case 6:
      dibujarEscena6();
      break;
    case 7:
      dibujarEscena7();
      break;
    case 8:
      dibujarEscena8();
      break;
  }
}

// ==========================================
// ESCENA 1: INTRODUCCIÓN
// ==========================================
function dibujarEscena1() {
  // Fondo con colores oscuros (negro profundo con un sutil resplandor rojizo/carmesí)
  background(8, 6, 10);
  noStroke();
  for (let r = 500; r > 0; r -= 25) {
    fill(35, 10, 15, 12);
    ellipse(width / 2, height / 2 - 20, r * 1.4, r);
  }

  // Imagen adjunta centrada y escalada proporcionalmente
  if (imgEscena1) {
    let altoImg = 350;
    let anchoImg = (imgEscena1.width / imgEscena1.height) * altoImg;
    image(imgEscena1, width / 2, height / 2 - 45, anchoImg, altoImg);
  }

  // Título "Nacho y sus aguacates" en fuente Agincourt
  if (fuenteAgincourt) {
    textFont(fuenteAgincourt);
  }
  textSize(52);
  
  // Sombra sutil del texto para darle profundidad
  fill(0);
  text("Nacho y sus aguacates", width / 2 + 3, height - 137);
  
  // Color principal del título (tono hueso/dorado envejecido que combina con el cuerno)
  fill(230, 210, 175);
  text("Nacho y sus aguacates", width / 2, height - 140);

  // Botón "Empezar" con efecto hover
  let sobreBoton = mouseEnBoton(btnX, btnY, btnAncho, btnAlto);
  
  if (sobreBoton) {
    fill(165, 35, 35); // Rojo intenso al pasar el mouse
    stroke(230, 210, 175);
    cursor(HAND);
  } else {
    fill(95, 20, 25); // Rojo oscuro en reposo
    stroke(150, 130, 100);
    cursor(ARROW);
  }
  
  strokeWeight(2);
  rect(btnX, btnY, btnAncho, btnAlto, 12);

  // Texto del botón
  noStroke();
  fill(245, 240, 230);
  textSize(24);
  text("EMPEZAR", btnX, btnY - 2);
}

// ==========================================
// ESCENAS 2 A 8 (Plantilla de continuidad)
// ==========================================
function dibujarEscena2() {
  cursor(ARROW);
  background(15, 18, 22);
  mostrarPlantillaEscena(2, "Escena 2: El inicio de la historia");
}

function dibujarEscena3() {
  background(18, 15, 24);
  mostrarPlantillaEscena(3, "Escena 3: Desarrollo");
}

function dibujarEscena4() {
  background(14, 20, 18);
  mostrarPlantillaEscena(4, "Escena 4: El encuentro");
}

function dibujarEscena5() {
  background(22, 14, 16);
  mostrarPlantillaEscena(5, "Escena 5: El conflicto");
}

function dibujarEscena6() {
  background(16, 16, 26);
  mostrarPlantillaEscena(6, "Escena 6: El clímax");
}

function dibujarEscena7() {
  background(20, 18, 14);
  mostrarPlantillaEscena(7, "Escena 7: Desenlace");
}

function dibujarEscena8() {
  background(10, 10, 12);
  mostrarPlantillaEscena(8, "Escena 8: Fin (Clic para reiniciar)");
}

// Función auxiliar visual para probar el paso entre escenas 2-8
function mostrarPlantillaEscena(numero, descripcion) {
  fill(220);
  textSize(36);
  text(descripcion, width / 2, height / 2 - 20);
  
  fill(150);
  textSize(18);
  text("Haz clic en cualquier lugar o presiona la flecha derecha (→) para continuar", width / 2, height / 2 + 40);
}

// ==========================================
// INTERACCIÓN Y NAVEGACIÓN
// ==========================================
function mousePressed() {
  if (escenaActual === 1) {
    // En la escena 1 solo avanza si se hace clic dentro del botón "Empezar"
    if (mouseEnBoton(btnX, btnY, btnAncho, btnAlto)) {
      escenaActual = 2;
    }
  } else if (escenaActual < totalEscenas) {
    // En las demás escenas avanza a la siguiente (puedes cambiar esto por botones específicos luego)
    escenaActual++;
  } else {
    // Al terminar la escena 8, vuelve a la 1
    escenaActual = 1;
  }
}

function keyPressed() {
  // Permite navegar con las flechas del teclado para probar rápido
  if (keyCode === RIGHT_ARROW && escenaActual < totalEscenas) {
    escenaActual++;
  } else if (keyCode === LEFT_ARROW && escenaActual > 1) {
    escenaActual--;
  }
}

// Detecta si el cursor está dentro de un rectángulo centrado
function mouseEnBoton(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}