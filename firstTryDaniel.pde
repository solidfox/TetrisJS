int width = 10;

// Global variables
int posx, posy;
int nX, nY;
int delay = 16;

// Setup the Processing Canvas
void setup(){
  size( 200, 300 );
  strokeWeight( 2 );
  frameRate( 15 );
  posx = width / 2;
  posy = width / 2;
  nX = X;
  nY = Y;  
}

// Main draw loop
void draw(){
	// Track circle to new destination
	posx+=(nX-posx)/delay;
	posy+=(nY-posy)/delay;  

	// Set fill-color to blue
	fill( 0, 121, 184 );

	// Fill canvas grey
	background( 100 );
	
	// Set stroke-color white
	stroke(255); 

	beginShape();
	
		  vertex(posx, posyy);
		  
		  vertex(posx + 1*width, posy + 0*width);
		  
		  vertex(posx + 1*width, posy + 1*width);
		  
		  vertex(posx + 2*width, posy + 1*width);
		  
		  vertex(posx + 2*width, posy + 3*width);
		  
		  vertex(posx + 1*width, posy + 3*width);
		  
		  vertex(posx + 1*width, posy + 2*width);
		  
		  vertex(posx + 1*width, posy + 2*width);
	
		  vertex(posx, posy);
		  
	endShape();
	
	               
}


// Set circle's next destination
void mouseMoved(){
  nX = mouseX;
  nY = mouseY;  
}

