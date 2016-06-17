import ddf.minim.signals.*;
import ddf.minim.*;  // minimライブラリのインポート
Minim minim;         // Minim型変数であるminimの宣言
AudioPlayer player; // サウンドデータ格納用の変数

// 初期化処理
void setup(){
  size(600, 400);                       // 画面サイズ
  minim = new Minim(this);              // 初期化
  player = minim.loadFile("test.mp3");  // test.mp3を読み込む
  player.play();                        // 再生
}

// メイン処理
void draw(){
  background(0,0,0);  // 背景色
  stroke(0,220,0);    // 線色(背景)
  int amp = 100;      // 振幅(音声チャンネルを画面上に波形で映し出す際の振幅)

  // 波形描画
  for(int i = 0; i < player.left.size()-1; i++){
    line(i, 100 + player.left.get(i)*amp, i+1, 100 + player.left.get(i+1)*amp);    // Lチャンネルの波形
    line(i, 300 + player.right.get(i)*amp, i+1, 300 + player.right.get(i+1)*amp);  // Rチャンネルの波形
  }
}

// stopボタン押されたときの動き？
void stop(){
  player.close();
  minim.stop(); 
}
