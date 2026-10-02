function setup() {
  // Lienzo horizontal y ancho para que quepan las 5 etapas
  createCanvas(800, 300);
  angleMode(DEGREES); // Usamos grados para rotar más fácilmente
}

function draw() {
  background(210, 240, 255); // Fondo azul claro

  // ETAPA 1: Bebé
  push();
  translate(80, 150);       // Posición izquierda
  scale(0.5);               // Muy pequeña
  rotate(-15);              // Postura inclinada
  drawTurtle(color(152, 251, 152)); // Color: Verde muy claro
  pop();
  // ETAPA 2: Infante
 
  push();
  translate(190, 150);      // Se mueve a la derecha
  scale(0.9);               // Crece un poco
  rotate(10);               // Cambia de postura
  drawTurtle(color(50, 205, 50)); // Color: Verde lima vivo
  pop();

  // ETAPA 3: Joven
  
  push();
  translate(340, 150);      // Al centro
  scale(1.4);               // Ya es mediana
  rotate(-5);               // Postura recta pero relajada
  drawTurtle(color(34, 139, 34)); // Color: Verde bosque
  pop();

  // ETAPA 4: Adulto
  push();
  translate(520, 150);      // Más a la derecha
  scale(1.9);               // Grande
  rotate(15);               // Caminando hacia arriba
  drawTurtle(color(107, 142, 35)); // Color: Verde  apagado
  pop();


  // ETAPA 5: Anciana
  push();
  translate(720, 150);      // Extremo derecho
  scale(2.3);               // Tamaño máximo
  rotate(-8);               // Postura pesada
  drawTurtle(color(85, 107, 47)); // Color: Verde musgo oscuro
  pop();
}

/**
 * Función propia: Síntesis gráfica de una tortuga.
 *  {color} colorCaparazon - Atributo visual que cambia según la etapa
 */
function drawTurtle(colorCaparazon) {
  // TODA la tortuga se dibuja asumiendo que su centro es (0,0)
  
  // 1. Patas
  fill(120, 150, 80); // Color de piel fijo
  noStroke();
  ellipse(-20, -20, 15, 20); // Pata superior izquierda
  ellipse(20, -20, 15, 20);  // Pata superior derecha
  ellipse(-20, 25, 15, 20);  // Pata inferior izquierda
  ellipse(20, 25, 15, 20);   // Pata inferior derecha

  // 2. Cabeza
  ellipse(0, -35, 20, 25);
  
  // 3. Ojos detalles pequeños
  fill(0); // Negro
  ellipse(-6, -38, 4, 4);
  ellipse(6, -38, 4, 4);

  // 4. Caparazón (Utiliza el atributo que pasa por parámetro)
  fill(colorCaparazon);
  stroke(30, 50, 20); // Borde oscuro para el caparazón
  strokeWeight(2);
  ellipse(0, 0, 50, 60); // Justo en el centro local (0,0)

  // 5. Detalle del caparazón (un círculo concéntrico)
  noFill();
  stroke(30, 50, 20, 150);
  ellipse(0, 0, 30, 40);
}
