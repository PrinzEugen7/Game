import ddf.minim.*;  // minimライブラリのインポート
Minim minim;         // Minim型変数であるminimの宣言
AudioPlayer player;  // サウンドデータ格納用の変数
 
void setup(){
  size(400, 400);
  minim = new Minim(this);              // 初期化
  player = minim.loadFile("test.wav");  // test.wavを読み込む
  player.play();                        // 再生
}
 
void draw(){
}
 
void stop(){
  player.close();  //サウンドデータを終了
  minim.stop();
  super.stop();
}
