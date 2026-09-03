function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // 1. Color de la cara
  fill(255, 204, 0); 
  stroke(0,0,0);
  rect(100,100,200,200); 
  
  // 2. Contorno grueso (rojo) para los ojos
  stroke(255, 0, 0);
  strokeWeight(4);
  fill(255,255,255);
  ellipse(150,160,40,40);
  ellipse(250,160,40,40);
  
  // 3. Pupilas sin borde
  noStroke(); 
  fill(0)
  ellipse(150,160,15,15);
  ellipse(250,160,15,15);
  
  stroke(0);
  strokeWeight(4);
  line(150,240,250,240); // La boca se queda igual
  
  // 4. Nariz hueca (sin relleno, solo línea)
  noFill(); 
  strokeWeight(2);
  triangle(200,180,185,210,215,210);
  
  // 5. Rectángulo con transparencia (Lentes)
  noStroke();
  fill(0, 0, 255, 120); // El 120 es el nivel de transparencia
  rect(100, 140, 200, 50); 
}
  
