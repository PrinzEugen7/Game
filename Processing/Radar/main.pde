int w=400,h=400;
int deg=0;

void setup() {
  size(400, 400);
}
 
void draw() {
  background(0, 20, 0);
  for(int i=1;i<50;i++){
    stroke(0, 235/i+20, 0);
    float dx = w/2 * cos(radians(deg-i)) + w/2;
    float dy = h/2 * sin(radians(deg-i)) + h/2;
    line(w/2, h/2, dx, dy);
  }
  strokeWeight(2);
  stroke(0, 130, 0);
  noFill();
  ellipse(w/2, h/2, w, w);
  ellipse(w/2, h/2, w/2, w/2);
  line(0, h/2, w, h/2);
  line(w/2, 0, w/2, h);
  deg++;
}
