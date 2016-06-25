// ブロックのパラメータ
int blocks_row = 10;  // ブロックの行数
int blocks_col = 11;  // ブロックの列数
int[] blockX = new int[blocks_row * blocks_col];  // ブロックのx座標格納用の配列
int[] blockY = new int[blocks_row * blocks_col];  // ブロックのy座標格納用の配列
color[] blockColor = new int[blocks_row * blocks_col];
int first_block_x = 10;    // 最初のブロックのx座標
int first_block_y = 10;    // 最初のブロックのy座標
int block_width = 33;      // ブロックの幅
int block_height = 20;     // ブロックの高さ
int block_interval_x = 35; // ブロックの間隔(x方向)
int block_interval_y = 20; // ブロックの間隔(y方向)
color block_color = color(10,150,10); // ブロックの色
DrawBlock[] block = new DrawBlock[blocks_row * blocks_col]; // ブロック描画用オブジェクトの宣言

// その他
color back_color = color(0, 20, 0); // 背景色

// ブロック描画用クラス
class DrawBlock{
  int x, y, w, h;
  color rgb;
  
  DrawBlock(int block_x, int block_y, int block_width, int block_height, color rgb_color){
    x = block_x;
    y = block_y;
    w = block_width;
    h = block_height;
    rgb = rgb_color;
  }
  
  void init(){
    fill(rgb);
    rect(x, y, w, h);
  }
}

void setup(){
  size(400, 500); 
  // ブロックの初期化
  for(int y = 0; y < blocks_row; y++){
    for(int x = 0; x < blocks_col; x++){
      int i = x + (y * blocks_col);
      blockColor[i] = block_color;
      blockX[i] = first_block_x + block_interval_x * x;
      blockY[i] = first_block_y + block_interval_y * y;
      block[i] = new DrawBlock(blockX[i], blockY[i], block_width, block_height, blockColor[i]);
    }
  }
}

void draw(){
  background(back_color);
  
  // ブロックの初期化
  for(int i = 0; i < block.length; i++){
    block[i].init();
  }
}
