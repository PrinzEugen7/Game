ArrayList beams;
ArrayList enemies;
int lives = 3;
int numCol = 10;
Player player;
Enemy testEnemy;
boolean keyAPressed = false, keyDPressed = false;

// 初期設定
void setup() {
  size(500, 500);
  player = new Player();
  beams = new ArrayList();
  enemies = new ArrayList();
  generateEnemies();
}

// メインループ
void draw() {
  background(0, 0, 0);
  player.display();
  movePlayer();
  player.hitCheck();
  handleEnemies();
  handleBeams();
}

// 敵機の生成
void generateEnemies() {
  for (int i = 0; i < 20; i++) {
    float x = width*.1 + i%numCol*50;
    float y = 25 + int(i/numCol)*60 ;
    enemies.add(new Enemy(x, y));
  }
}

// 敵機の操作
void handleEnemies() {
  for (int i = 0; i < enemies.size(); i++) {
    Enemy enemy = (Enemy) enemies.get(i);
    enemy.move();
    enemy.display();
    enemy.hitCheck();
    if (random(1) > .995) {
      enemy.shoot();
    }
  }
}

// ビームの操作
void handleBeams() {
  for (int i = 0; i < beams.size(); i++) {
    Beam b = (Beam) beams.get(i);
    b.move();
    b.display();
  }
}

// 自機の移動
void movePlayer() {
  if (keyAPressed) {
    player.x -=10;
  }
  if (keyDPressed) {
    player.x +=10;
  }
}

// キー離した時
void keyPressed() {
  if (key == 'a') {
    keyAPressed = true;
  }
  else {
    if (key == 'd') {
      keyDPressed = true;
    }
    else {
      if (key == ' ') {
        player.shoot();
      }
    }
  }
}

void keyReleased() {
  if (key == 'a') {
    keyAPressed = false;
  }
  else {
    if (key == 'd') {
      keyDPressed = false;
    }
  }
}

// ビームクラス
class Beam {
  float x, y, v;

  Beam(float x, float y, float v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }

  void display(){
    rect(this.x, this.y, 5,20);
  }

  void move(){
    this.y+=this.v;
  }
}

// 敵機クラス
class Enemy {
  float x, y, v;

  Enemy(float x, float y) {
    this.x = x;
    this.y = y;
    this.v = 5;
  }

  void display() {
    fill(250, 0, 0);
    ellipse(this.x, this.y, 30, 30);
  }

  void move() {
    this.x+=this.v;
    if (this.x > width*.9) {
      this.x = width*.9;
      this.v *= -1;
      this.y+=30;
    }

    if (this.x < width*.1) {
      this.v*=-1;
      this.x = width*.1;
      this.y+=30;
    }
  }

  void shoot(){
    Beam b = new Beam(this.x, this.y, 5);
    beams.add(b);
  }

  void hitCheck() {
    for (int i = 0; i < beams.size(); i++){
      Beam b = (Beam) beams.get(i);
      float distBetween = dist(b.x, b.y, this.x, this.y);
      if (distBetween < 15 && b.v < 0){
        enemies.remove(this);
      }
    }
  }
}

// 自機クラス
class Player {
  float x, y;
  int lives;
  int score;
  boolean canShoot;

  Player() {
    this.x = width/2;
    this.y = height-50;
  }

  void display() {
    fill(0, 250, 0);
    rect(this.x-10, this.y-10, 30, 30);
  }

  void shoot() {
    Beam beam = new Beam(this.x, this.y, -5);
    beams.add(beam);
  }

  void hitCheck() {
    for (int i = 0; i < beams.size(); i++) {
      Beam b = (Beam) beams.get(i);
      float distBetween = dist(b.x, b.y, this.x, this.y);
      if (distBetween < 15 && b.v > 0) {
        this.die();
      }
    }
  }

  void die(){
    this.x = width/2;
  }
}
