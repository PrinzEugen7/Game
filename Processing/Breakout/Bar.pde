// バーのパラメータ
int bar_width = 60; // バーの幅
int bar_height = 15;// バーの高さ
int bar_x = 200;    // バーのx座標
int bar_y = 470;    // バーのy座標
color bar_color = color(200, 0, 200); // バーの色

// その他
color back_color = color(0, 20, 0); // 背景色
boolean start_click = false;        // クリック判定  

void setup(){
  size(400, 500); 
}

void draw(){
  background(back_color);
  // バーの描画
  fill(200,155,155);  
  rect(bar_x, bar_y, bar_width, bar_height);
  bar_x = mouseX - bar_width/2;
  
  // バーが画面外にある場合の処理
  if(bar_x > width - bar_width){
    bar_x = width - bar_width;
  }
  if(bar_x < 0){
    bar_x = 0;
  }
}

void mousePressed(){
  start_click = !start_click;
}

