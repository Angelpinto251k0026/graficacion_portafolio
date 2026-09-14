function setup() {
  createCanvas(400, 500);
}

function draw() {
  // Un azul oscuro para el cielo de noche
  background(10, 25, 60);

  // CIELO Y ESTRELLAS
  noStroke(); // Quitamos los bordes para las estrellas

  // LUNA (Arriba a la derecha)
  fill(255, 200, 0, 50); // ultimo digito transparencia 
  circle(320, 80, 80);   // Círculo grande transparente
  circle(320, 80, 60);   // Círculo mediano transparente
  fill(255, 200, 0);     // Sin transparencia para el centro
   arc(320,80 ,40, 40, 0, PI + QUARTER_PI, PIE);  // Centro sólido

  // ESTRELLA 1 (Izquierda)
  fill(255, 255, 0, 50);
  circle(80, 100, 60);
  circle(80, 100, 40);
  fill(255, 255, 0);
  circle(80, 100, 15);

  // ESTRELLA 2 (Izquierda abajo)
  fill(255, 255, 0, 50);
  circle(80, 220, 30);
  fill(255, 255, 0);
  circle(80, 220, 10);

  // ESTRELLA 3 (Derecha abajo de la luna)
  fill(255, 255, 0, 50);
  circle(350, 220, 50);
  circle(350, 220, 30);
  fill(255, 255, 0);
  circle(350, 220, 10);

  // ESTRELLA 4 (derecha abajo)
  fill(255, 255, 0, 50);
  circle(320, 320, 30);
  fill(255, 255, 0);
  circle(320, 320, 10);

  
  // REMOLINOS
  noFill(); 
  stroke(100, 150, 255, 100); // Azul claro con transparencia
  strokeWeight(4);
  
  // arcos simples para simular el viento
  arc(200, 150, 250, 100, PI, 0); 
  arc(150, 250, 200, 150, PI, 0);
  arc(300, 180, 180, 100, 0, PI);
  arc(90, 110, 150, 90, PI, 0);
  arc (300,330,150,100,PI,0);
  arc(70,370,200,100,PI,0);
  //AGUA
  noStroke();
  fill(20, 40, 80); // Azul un poco más claro
  rect(0, 350, 400, 150); // Un rectángulo para el río

  // TORRE 
  
  stroke(30, 15, 10); 
  strokeWeight(8);
 
  line(150, 350, 180, 200); // Pata izquierda baja
  line(250, 350, 220, 200); // Pata derecha baja
  line(180, 200, 195, 80);  // Pata izquierda alta
  line(220, 200, 205, 80);  // Pata derecha alta

  // Pico de la torre
  line(195, 80, 200, 40);
  line(205, 80, 200, 40);

  // Pisos
  line(160, 280, 240, 280); // Piso de abajo
  line(175, 200, 225, 200); // Piso de en medio
  line(190, 130, 210, 130); // Piso de arriba
  line(205,150,195,90);
  // Arco en la base de la torre
  noFill();
  arc(200, 350, 100, 80, PI, 0);

  //LAS LUCES DE LA TORRE Puntos
  stroke(255, 255, 0); // Color amarillo brillante
  strokeWeight(6);    

  //puntos
  point(200, 40);  // Punta
  point(195, 80);
  point(205, 80);
  point(175, 200);
  point(225, 200);
  point(160, 280);
  point(240, 280);
  point(150, 350); // Base izquierda
  point(250, 350); // Base derecha
// decoración
  point(145,375);
  point(140,400);
  point(135,425);
  point(130,450);
  point(255,375);
  point(260,400);
  point(265,425);
  point(270,450);

  point(280,360);
  point (310,365);
  point (340,370);
  point(370,375);
  point(400,380);
  point(120,360);
  point(90,365);
  point(60,370);
  point(30,375);
  point(0,380);
  
  //DETALLES DEL AGUA
  stroke(255, 255, 255, 150); // Blanco transparente
  strokeWeight(2);
  line(100, 380, 160, 380);
  line(240, 410, 310, 410);
  line(180, 460, 220, 460);

  // Botecito
  noStroke();
  fill(10); 
  arc(200, 430, 80, 40, 0, PI); // La forma del bote


fill(255);
text("X: " + floor(mouseX) + "  Y: " + floor(mouseY), 20, 30);
}
