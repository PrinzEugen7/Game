PImage bg;
 
void setup() {
  size(640, 480);
}
 
void draw() {
  bg = loadImage("bg.jpg");
  image(bg, 0, 0);
}
