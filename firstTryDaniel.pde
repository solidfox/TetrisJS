
        int width = 10;
        int x = 0;
	int [] xa = new int[20];
	int [] ya = new int[20];
	

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
        	background(100);
				stroke(50,50,50);
			beginShape();
			
				vertex(1*width, x + 1*width);
				
				vertex(2*width, x + 1*width);
				
				vertex(2*width, x + 2*width);
				
				vertex(3*width, x + 2*width);
				
				vertex(3*width, x + 4*width);
				
				vertex(2*width, x + 4*width);
				
				vertex(2*width, x + 3*width);
				
				vertex(1*width, x + 3*width);
				
				vertex(1*width, x + 1*width);
			
			endShape();

          x = x + 2;
        }

        void keyPressed(){
            if(key == CODED) {
		if(keyCode == UP) {
			loop();
		}
	    }
		
        }






