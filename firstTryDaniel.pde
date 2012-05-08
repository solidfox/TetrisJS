int width = 10;

void setup()
{
  size(200,200);
  background(125);
  fill(255);
  noLoop();
  PFont fontA = loadFont("courier");
  textFont(fontA, 14);  
}

void draw(){  
  beginShape();
  
	  vertex(1*width, 1*width);
	  
	  vertex(2*width, 1*width);
	  
	  vertex(2*width, 2*width);
	  
	  vertex(3*width, 2*width);
	  
	  vertex(3*width, 4*width);
	  
	  vertex(2*width, 4*width);
	  
	  vertex(2*width, 3*width);
	  
	  vertex(1*width, 3*width);

  	  vertex(1*width, 1*width);
	  
  endShape();
}