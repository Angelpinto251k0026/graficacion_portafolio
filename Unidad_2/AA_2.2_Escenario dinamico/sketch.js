// Variables básicas para controlar el vuelo
let faseDeVuelo = 0; 
let alturaNave = 0;
let escalaNave = 1;

// Variables para los propulsores que se separan
let separacionX = 0;
let caidaY = 0;
let anguloRotacion = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); 
  rectMode(CENTER); 
  alturaNave = windowHeight * 0.85; // Empieza abajo
}

function draw() {
  // 1. TRANSICIÓN DE ATMÓSFERA
  let colorCielo = alturaNave / 5; 
  background(10, 15, colorCielo);

  // 2. ESTRELLAS PARPADEANTES
  fill(255);
  noStroke();
  circle(random(width), random(height), 2);
  circle(random(width), random(height), 1);
  circle(random(width), random(height), 3);
  circle(random(width), random(height), 1);

  // --- LÓGICA DE ANIMACIÓN ---
  if (faseDeVuelo == 1) {
    alturaNave = alturaNave - 2;      
    escalaNave = escalaNave - 0.0005; 
  } else if (faseDeVuelo == 2) {
    alturaNave = alturaNave - 4;      
    escalaNave = escalaNave - 0.001;  
    separacionX = separacionX + 1.5;   
    caidaY = caidaY + 2;          
    anguloRotacion = anguloRotacion + 2;  
  }

  // DIBUJO DE LA NAVE (Objeto Principal)
  push();
  translate(width / 2, alturaNave);
  scale(escalaNave); 

  // Inclinación interactiva con el mouse
  let inclinacion = (mouseX - width / 2) / 25;
  rotate(inclinacion);

  // Efecto temblor al despegar
  if (faseDeVuelo == 1) {
    translate(random(-2, 2), random(-2, 2));
  }

  //  A. PROPULSOR IZQUIERDO (Objeto Anidado)
  push(); 
  translate(-45, 30);
  if (faseDeVuelo == 2) {
    translate(-separacionX, caidaY);
    rotate(-anguloRotacion);
  }
  dibujarPropulsor();
  pop();

  // B. PROPULSOR DERECHO (Objeto Anidado) 
  push(); 
  translate(45, 30);
  if (faseDeVuelo == 2) {
    translate(separacionX, caidaY);
    rotate(anguloRotacion);
  }
  dibujarPropulsor();
  pop();

  // C. CUERPO PRINCIPAL
  dibujarCuerpoNave();

  pop();

  //  INTERFAZ DE USUARIO
  fill(0, 255, 100);
  textSize(16);
  textAlign(LEFT);
  text("Fase de vuelo: " + faseDeVuelo, 20, 30);
  fill(255);
  text("1. Haz clic para cambiar de fase.", 20, 50);
  text("2. Mueve el mouse a los lados para inclinar la nave.", 20, 70);
}

// FUNCIONES DE DIBUJO

function dibujarPropulsor() {
  fill(180, 40, 40); 
  rect(0, 0, 25, 90, 5); 
  fill(100); 
  triangle(-12.5, -45, 12.5, -45, 0, -70); 
  fill(50);
  rect(0, 45, 15, 10); 

  // Fuego del propulsor (Objeto Anidado Nivel 2)
  if (faseDeVuelo == 0 || faseDeVuelo == 1) {
    push();
    translate(0, 55);
    
    if (frameCount % 10 < 5) {
      scale(1.2);
    } else {
      scale(0.8);
    }

    fill(255, 150, 0); 
    triangle(-15, 0, 15, 0, 0, 50);
    fill(255, 255, 0); 
    triangle(-8, 0, 8, 0, 0, 30);
    pop();
  }
}

function dibujarCuerpoNave() {
  push();
  // Aletas
  fill(150);
  triangle(-25, 50, -65, 80, -25, 80);
  triangle(25, 50, 65, 80, 25, 80);

  // Cilindro central
  fill(230); 
  rect(0, 0, 50, 160, 10); 
  
  fill(50);
  rect(0, 80, 30, 15);

  // Punta de la nave
  fill(200);
  triangle(-25, -80, 25, -80, 0, -140);

  // Ventana
  fill(30, 150, 255);
  ellipse(0, -50, 25, 35);

  // Textos institucionales
  fill(50);
  textSize(12);
  textAlign(CENTER, CENTER);
  push();
  rotate(-90); 
  text("ITSFCP", 0, -5);
  text("SISTEMAS", 0, 10);
  pop();

  // Fuego central
  push();
  translate(0, 90);
  
  let multiplicadorDeFuego = 1;
  if (faseDeVuelo > 0) {
    multiplicadorDeFuego = 1.5;
  }

  if (frameCount % 10 < 5) {
    scale(1.2 * multiplicadorDeFuego);
  } else {
    scale(0.8 * multiplicadorDeFuego);
  }

  fill(255, 150, 0); 
  triangle(-15, 0, 15, 0, 0, 50);
  fill(255, 255, 0); 
  triangle(-8, 0, 8, 0, 0, 30);
  pop();

  pop();
}

function mousePressed() {
  if (faseDeVuelo == 0) {
    faseDeVuelo = 1;
  } else if (faseDeVuelo == 1) {
    faseDeVuelo = 2;
  } else if (faseDeVuelo == 2) {
    faseDeVuelo = 0;
    alturaNave = height * 0.85;
    escalaNave = 1;
    separacionX = 0;
    caidaY = 0;
    anguloRotacion = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (faseDeVuelo == 0) {
    alturaNave = height * 0.85;
  }
}
