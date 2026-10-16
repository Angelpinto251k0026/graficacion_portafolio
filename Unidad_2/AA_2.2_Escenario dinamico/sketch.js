//  VARIABLES GLOBALES BÁSICAS 
let logoTec;
let musicaAltar = new Audio('terror.mp3');
musicaAltar.loop = true; 
let musicaReproduciendo = false;

// Variables para animaciones continuas
let rotacionFlores = 0;
let xFantasma = -100;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);

  //  logo de la escuela
  logoTec = await loadImage('logo.png'); 
}

function draw() {
  // Fondo de noche profunda
  background(10, 5, 25);
  
  //  1. FONDO Y CIELO
  dibujarEstrellas();
  dibujarLuna(width * 0.85, height * 0.3);

  // Fuegos artificiales (x, y, retraso, colorR, colorG, colorB)
  dibujarFuegoArtificial(width * 0.2, height * 0.25, 0, 255, 50, 150);   
  dibujarFuegoArtificial(width * 0.5, height * 0.15, 50, 50, 255, 100);  
  dibujarFuegoArtificial(width * 0.75, height * 0.2, 100, 255, 200, 50); 

  // 2. DECORACIONES SUPERIORES 
  dibujarPapelPicado();
  dibujarFantasma();
  dibujarLluviaPetalos(); // Pétalos cayendo desde el cielo

  // variable para que las flores giren
  rotacionFlores = rotacionFlores + 1;

  // GRUPO PRINCIPAL: ALTAR GIGANTE
  // Usamos un solo scale() para hacer todo grande fácilmente
  push();
  translate(width / 2, height); // Nos posicionamos en el piso, al centro
  scale(1.35); //TAMAÑO DE ALTAR

  dibujarArco(0, 0); //Arco de cempasúchil de fondo

  //  ESCALONES DE LA BASE 
  // Escalón 3 (Inferior)
  fill(100, 50, 15);
  stroke(0);
  strokeWeight(2);
  rect(0, -50, 650, 100, 5);
  fill(255, 120, 0); 
  rect(0, -90, 630, 10); // Mantel
  
  // Escalón 2 (Medio)
  fill(120, 60, 20);
  rect(0, -140, 480, 100, 5);
  fill(255, 0, 128); 
  rect(0, -180, 460, 10); // Mantel
  
  // Escalón 1 (Superior)
  fill(140, 70, 25);
  rect(0, -230, 300, 100, 5);
  fill(255, 255, 0); 
  rect(0, -270, 285, 10); // Mantel

  //  OFRENDAS TECNOLÓGICAS (SISTEMAS)
  dibujarServidor(-200, -120);
  dibujarHardware(180, -80);
  
  //  RETRATO
  dibujarRetrato(0, -315);
  dibujarComputadora(0, -380); 

  //  OFRENDAS TRADICIONALES 
  dibujarPanDeMuerto(-120, -160);
  dibujarCopal(180, -150);
  dibujarCalaveritaAzucar(-80, -250);
  dibujarCalaveritaAzucar(80, -250);

  //  VELADORAS CON FUEGO PARPADEANTE
  dibujarVela(-190, -180); 
  dibujarVela(190, -180); 
  dibujarVela(-90, -270);  
  dibujarVela(90, -270);  

  // -- CALAVERITA INTERACTIVA 
  dibujarCalaverita(0, -130);

  // FLORES DE CEMPASÚCHIL 
  dibujarCempasuchil(-280, -50);
  dibujarCempasuchil(-200, -50);
  dibujarCempasuchil(200, -50);
  dibujarCempasuchil(280, -50);

  pop(); 

  // Pétalos tirados en el piso
  dibujarPetalosPiso();
  
  // --- TEXTOS EN PANTALLA ---
  fill(0, 255, 100);
  textSize(16);
  textAlign(LEFT);
  text("ALTAR DIGITAL - SISTEMAS ITSFCP", 20, 30);
  fill(255);
  text("1. Mueve el mouse a los lados para que la calavera mire.", 20, 50);
  text("2. Haz CLIC en la pantalla para iniciar el audio.", 20, 70);
}


// FUNCIONES SIMPLES DE DIBUJO


function dibujarLluviaPetalos() {
  noStroke();
  fill(255, 120, 0, 180); // Naranja cempasúchil
  
  // Usamos un simple ciclo FOR y matemáticas para que caigan infinitamente
  for (let i = 0; i < 20; i++) {
    let x = (i * (width / 20)) + sin(frameCount * 2 + i * 10) * 30;
    let y = (frameCount * (1.5 + (i % 3)) + i * 50) % height;
    
    push();
    translate(x, y);
    rotate(frameCount * 3 + i * 20);
    ellipse(0, 0, 12, 6); 
    pop();
  }
}

function dibujarRetrato(x, y) {
  push();
  translate(x, y);
  
  // Marco de madera
  fill(80, 40, 10);
  rect(0, 0, 60, 75, 3);
  fill(200, 150, 50); // Borde dorado
  rect(0, 0, 50, 65);
  fill(40); // Fondo de la foto
  rect(0, 0, 45, 60);
  
  // Avatar Anónimo
  fill(180);
  noStroke();
  circle(0, -10, 22); // Cabeza
  arc(0, 25, 40, 35, 180, 360); // Hombros
  
  // Reflejo del vidrio
  fill(255, 255, 255, 30);
  triangle(-20, -30, 20, -30, -20, 10);
  pop();
}

function dibujarFantasma() {
  push();
  // El fantasma avanza en X
  xFantasma = xFantasma + 2; 
  if (xFantasma > width + 100) { xFantasma = -100; } // Reinicia al salir
  
  let flotar = sin(frameCount * 3) * 15; // Sube y baja
  translate(xFantasma, height * 0.35 + flotar); 
  
  noStroke();
  fill(255, 255, 255, 120); 
  
  ellipse(0, -20, 60, 60); // Cabeza
  rect(0, 10, 60, 60); // Cuerpo
  circle(-20, 40, 20); circle(0, 40, 20); circle(20, 40, 20); // Ondas abajo
  
  // Cara
  fill(0, 150);
  ellipse(-10, -25, 8, 15);
  ellipse(10, -25, 8, 15);
  ellipse(0, -8, 12, 18);
  pop();
}

function dibujarEstrellas() {
  fill(255, 255, 150, 200);
  noStroke();
  // if sencillo con el módulo (%) para parpadear
  if (frameCount % 30 < 15) {
    circle(width * 0.1, height * 0.15, 3);
    circle(width * 0.85, height * 0.08, 2);
    circle(width * 0.3, height * 0.35, 2);
  } else {
    circle(width * 0.1, height * 0.15, 1);
    circle(width * 0.85, height * 0.08, 1);
    circle(width * 0.3, height * 0.35, 1);
  }
}

function dibujarLuna(x, y) {
  push();
  translate(x, y);
  scale(1.8); 
  
  fill(255, 255, 255, 20); circle(0, 0, 130);
  fill(255, 255, 255, 40); circle(0, 0, 110);
  fill(220); circle(0, 0, 100); // Luna base
  
  fill(180); // Cráteres
  circle(-20, -15, 20);
  circle(15, 20, 30);
  circle(20, -10, 15);
  circle(-10, 30, 10);
  pop();
}

function dibujarFuegoArtificial(x, y, offset, r, g, b) {
  push();
  translate(x, y);
  let tiempo = (frameCount + offset) % 150; 

  if (tiempo > 0 && tiempo < 60) { 
    let radio = tiempo * 3.5; 
    let opacidad = map(tiempo, 0, 60, 255, 0); 
    
    stroke(r, g, b, opacidad);
    strokeWeight(3);
    
    // Ciclo FOR basico para dibujar chispas en círculo
    for (let angulo = 0; angulo < 360; angulo += 45) {
      let xChispa = cos(angulo) * radio;
      let yChispa = sin(angulo) * radio;
      let xCola = cos(angulo) * (radio - 20);
      let yCola = sin(angulo) * (radio - 20);
      line(xCola, yCola, xChispa, yChispa);
    }
  }
  pop();
}

function dibujarArco(x, y) {
  push();
  translate(x, y);
  noFill();
  stroke(255, 120, 0); 
  strokeWeight(25); 
  arc(0, -50, 750, 650, 180, 360);
  stroke(255, 200, 0);
  strokeWeight(10);
  arc(0, -50, 750, 650, 180, 360);
  pop();
}

function dibujarPapelPicado() {
  push();
  stroke(255, 100);
  strokeWeight(2);
  line(0, 30, width, 30); // Hilo
  
  noStroke();
  let colorActual = 0; 
  
  for (let x = 40; x < width; x += 100) {
    // Escogemos el color 
    if (colorActual == 0) { fill(255, 0, 128); }
    else if (colorActual == 1) { fill(0, 191, 255); }
    else if (colorActual == 2) { fill(255, 165, 0); }
    else { fill(50, 205, 50); }
    
    colorActual++;
    if (colorActual > 3) { colorActual = 0; }
    
    push();
    translate(x, 30);
    let balanceo = sin(frameCount + x) * 3;
    rotate(balanceo);
    
    rect(0, 25, 80, 60);
    fill(10, 5, 25); // Color fondo para hacer recortes
    triangle(-40, 55, -20, 40, 0, 55);
    triangle(0, 55, 20, 40, 40, 55);
    circle(-15, 20, 10); circle(15, 20, 10); circle(0, 35, 10);
    pop();
  }
  pop();
}

function dibujarServidor(x, y) {
  push();
  translate(x, y);
  fill(40); stroke(80); strokeWeight(2);
  rect(0, 0, 70, 90, 5);
  fill(20); noStroke();
  rect(0, -20, 50, 10);
  
  for (let i = -10; i <= 30; i += 15) {
    if ((frameCount + i) % 30 < 15) { fill(0, 255, 0); } else { fill(0, 50, 0); }
    circle(-20, i, 6);
  }
  pop();
}

function dibujarHardware(x, y) {
  push();
  translate(x, y);
  fill(0, 100, 50); stroke(255, 120, 0, 100); strokeWeight(1);
  rect(0, 0, 80, 50, 3);
  fill(20); rect(0, 0, 20, 20); // Chip
  
  noStroke();
  fill(0, 0, 255); circle(-25, 15, 6);
  fill(150); rect(25, -12, 8, 18);
  pop();
}

function dibujarCopal(x, y) {
  push();
  translate(x, y);
  fill(130); stroke(50);
  ellipse(0, 10, 40, 15);
  rect(0, 25, 15, 20);
  triangle(-20, 10, 20, 10, 0, -10); 
  
  noStroke();
  let opacidad = map(sin(frameCount * 5), -1, 1, 100, 200);
  fill(200, 200, 200, opacidad);
  let oscilacion = sin(frameCount * 3) * 15;
  circle(oscilacion, -20, 15);
  circle(oscilacion * 0.7, -35, 20);
  pop();
}

function dibujarPanDeMuerto(x, y) {
  push();
  translate(x, y);
  fill(190, 130, 70); stroke(100, 60, 20); strokeWeight(1.5);
  ellipse(0, 5, 55, 30);
  fill(210, 150, 90);
  ellipse(0, -5, 45, 12); ellipse(-12, 5, 20, 8); ellipse(12, 5, 20, 8);
  circle(0, -9, 12);
  pop();
}

function dibujarCalaveritaAzucar(x, y) {
  push();
  translate(x, y);
  fill(255); stroke(180);
  ellipse(0, 0, 35, 30);
  rect(0, 12, 20, 12, 3);
  noStroke();
  fill(0, 191, 255); ellipse(-8, -4, 10, 10);
  fill(255, 0, 128); ellipse(8, -4, 10, 10);
  fill(0); circle(-8, -4, 4); circle(8, -4, 4);
  pop();
}

function dibujarPetalosPiso() {
  push();
  fill(255, 120, 0); noStroke();
  // Ciclo muy básico para hacer los pétalos de abajo
  for (let i = 0; i < 40; i++) {
    let x = width / 2 + sin(i * 45) * (200 + i * 8);
    let y = height - 10 - (i % 5) * 4;
    ellipse(x, y, 12, 6);
  }
  pop();
}

function dibujarComputadora(x, y) {
  push();
  translate(x, y);
  fill(160); stroke(80); strokeWeight(3);
  rect(0, 0, 110, 85, 5);
  fill(10); rect(0, 0, 95, 70);
  
  noStroke();
  fill(0, 255, 0);
  textSize(9); textAlign(LEFT, CENTER);
  text(">_ ERROR 404", -42, -22);
  text("ALMA NO_FOUND", -42, -8);
  text("MEMORIA_ETERNA", -42, 6);
  
  if (logoTec) { image(logoTec, 30, 16, 22, 22); }
  pop();
}

function dibujarVela(x, y) {
  push();
  translate(x, y);
  fill(220, 30, 30); stroke(50); strokeWeight(1);
  rect(0, 0, 20, 45); // Vaso rojo
  fill(255); rect(0, -10, 18, 20); // Cera
  
  translate(0, -25);
  if (frameCount % 10 < 5) { scale(1.25); } else { scale(0.85); }
  
  fill(255, 150, 0, 80); circle(0, -5, 25); // Halo
  fill(255, 120, 0); triangle(-7, 0, 7, 0, 0, -20); // Fuego naranja
  fill(255, 255, 0); triangle(-4, 0, 4, 0, 0, -12); // Fuego amarillo
  pop();
}

function dibujarCalaverita(x, y) {
  push();
  translate(x, y);
  
  // Transformación interactiva (rota según el mouse)
  let inclinacion = (mouseX - width / 2) / 35;
  rotate(inclinacion);
  
  fill(255); stroke(200); strokeWeight(2);
  ellipse(0, 0, 70, 60); rect(0, 24, 34, 22, 5); 
  
  stroke(0); line(-10, 24, -10, 34); line(10, 24, 10, 34); noStroke();
  
  fill(0); ellipse(-14, -6, 18, 22); ellipse(14, -6, 18, 22);
  fill(255, 0, 128); circle(-14, -6, 6);
  fill(0, 191, 255); circle(14, -6, 6);
  fill(0); triangle(0, 6, -5, 14, 5, 14);
  pop();
}

function dibujarCempasuchil(x, y) {
  push();
  translate(x, y);
  rotate(rotacionFlores);
  
  fill(255, 120, 0);
  ellipse(0, -20, 15, 30); ellipse(0, 20, 15, 30);
  ellipse(-20, 0, 30, 15); ellipse(20, 0, 30, 15);
  ellipse(-15, -15, 25, 25); ellipse(15, 15, 25, 25);
  ellipse(15, -15, 25, 25); ellipse(-15, 15, 25, 25);
  
  fill(255, 200, 0); circle(0, 0, 20);
  pop();
}

function mousePressed() {
  // Al hacer clic, la música inicia 
  if (!musicaReproduciendo) {
    musicaAltar.play(); 
    musicaReproduciendo = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
