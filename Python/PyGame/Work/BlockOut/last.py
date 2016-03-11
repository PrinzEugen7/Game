#coding: utf-8
import pygame
from pygame.locals import *
import math
import sys

SCREEN = Rect(0, 0, 400, 400)

# バドルのクラス
class Paddle(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.image.load("paddle.png").convert()
        self.rect = self.image.get_rect()
        self.rect.bottom = SCREEN.bottom - 20          # パドルのy座標
    def update(self):
        self.rect.centerx = pygame.mouse.get_pos()[0]  # マウスのx座標をパドルのx座標に
        self.rect.clamp_ip(SCREEN)                     # ゲーム画面内のみで移動

# ボールのクラス
class Ball(pygame.sprite.Sprite):
    speed = 5
    angle_left = 135
    angle_right = 45

    def __init__(self, paddle, blocks, score_board):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.image.load("ball.png").convert()
        self.rect = self.image.get_rect()
        self.dx = self.dy = 0  # ボールの速度
        self.paddle = paddle  # パドルへの参照
        self.blocks = blocks  # ブロックグループへの参照
        self.update = self.start
        self.score_board = score_board
        self.hit = 0  # 連続でブロックを壊した回数

    def start(self):
        # ボールの初期位置(パドルの上)
        self.rect.centerx = self.paddle.rect.centerx
        self.rect.bottom = self.paddle.rect.top
        # 左クリックでボール射出
        if pygame.mouse.get_pressed()[0] == 1:
            self.dx = 0
            self.dy = -self.speed
            self.update = self.move

    def move(self):
        self.rect.centerx += self.dx
        self.rect.centery += self.dy
        # 壁との反射
        if self.rect.left < SCREEN.left:    # 左側
            self.rect.left = SCREEN.left
            self.dx = -self.dx              # 速度を反転
        if self.rect.right > SCREEN.right:  # 右側
            self.rect.right = SCREEN.right
            self.dx = -self.dx
        if self.rect.top < SCREEN.top:      # 上側
            self.rect.top = SCREEN.top
            self.dy = -self.dy
        # パドルとの反射(パドルの左端に当たったとき135度方向、右端で45度方向とし、その間は線形補間で反射方向を計算)
        if self.rect.colliderect(self.paddle.rect) and self.dy > 0:
            self.hit = 0                                # 連続ヒットを0に戻す
            x1 = self.paddle.rect.left - self.rect.width# ボールが当たる左端
            y1 = self.angle_left                        # 左端での反射方向（135度）
            x2 = self.paddle.rect.right                 # ボールが当たる右端
            y2 = self.angle_right                       # 右端での反射方向（45度）
            m = float(y2-y1) / (x2-x1)                  # 直線の傾き
            x = self.rect.left                          # ボールが当たった位置
            y = m * (x - x1) + y1
            angle = math.radians(y)
            self.dx = self.speed * math.cos(angle)
            self.dy = -self.speed * math.sin(angle)
            self.paddle_sound.play()
        # ボールを落とした場合
        if self.rect.top > SCREEN.bottom:
            self.update = self.start                    # ボールを初期状態に
            self.gameover_sound.play()
            self.hit = 0
            self.score_board.add_score(-100)            # スコア減点-100点
        # ボールと衝突したブロックリストを取得
        blocks_collided = pygame.sprite.spritecollide(self, self.blocks, True)
        if blocks_collided:  # 衝突ブロックがある場合
            oldrect = self.rect
            for block in blocks_collided:
                # ボールが左から衝突
                if oldrect.left < block.rect.left < oldrect.right < block.rect.right:
                    self.rect.right = block.rect.left
                    self.dx = -self.dx
                # ボールが右から衝突
                if block.rect.left < oldrect.left < block.rect.right < oldrect.right:
                    self.rect.left = block.rect.right
                    self.dx = -self.dx
                # ボールが上から衝突
                if oldrect.top < block.rect.top < oldrect.bottom < block.rect.bottom:
                    self.rect.bottom = block.rect.top
                    self.dy = -self.dy
                # ボールが下から衝突
                if block.rect.top < oldrect.top < block.rect.bottom < oldrect.bottom:
                    self.rect.top = block.rect.bottom
                    self.dy = -self.dy
                self.block_sound.play()     # 効果音を鳴らす
                self.hit += 1               # 衝突回数
                self.score_board.add_score(self.hit * 10)   # 衝突回数に応じてスコア加点

# ブロックのクラス
class Block(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.image.load("block.png").convert()
        self.rect = self.image.get_rect()
        self.rect.left = SCREEN.left + x * self.rect.width
        self.rect.top = SCREEN.top + y * self.rect.height

# スコアのクラス
class Score():
    def __init__(self):
        self.sysfont = pygame.font.SysFont(None, 20)
        self.score = 0
    def draw(self, screen):
        score_img = self.sysfont.render("SCORE:"+str(self.score), True, (255,255,250))
        screen.blit(score_img, (10, 10))
    def add_score(self, x):
        self.score += x

def main():
    pygame.init()
    screen = pygame.display.set_mode(SCREEN.size)
    Ball.paddle_sound = pygame.mixer.Sound("paddle.wav")    # パドルにボールが衝突した時の効果音取得
    Ball.block_sound = pygame.mixer.Sound("block.wav")    # ブロックにボールが衝突した時の効果音取得
    Ball.gameover_sound = pygame.mixer.Sound("gameover.wav")    # ゲームオーバー時の効果音取得
    all = pygame.sprite.RenderUpdates()  # 描画用のスプライトグループ
    blocks = pygame.sprite.Group()       # 衝突判定用のスプライトグループ
    Paddle.containers = all
    Ball.containers = all
    Block.containers = all, blocks
    paddle = Paddle()           # パドルの作成
    # 10*5のブロックを作成
    for x in range(1, 11):
        for y in range(1, 6):
            Block(x, y)

    score = Score()    # スコアを作成
    Ball(paddle, blocks, score) # ボールを作成
    clock = pygame.time.Clock()

    while (1):
        clock.tick(60)
        screen.fill((0,20,0))
        all.update()        # 全てのスプライトグループを更新
        all.draw(screen)    # 全てのスプライトグループを描画
        score.draw(screen)  # スコアを描画
        pygame.display.update()
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            if event.type == KEYDOWN and event.key == K_ESCAPE:
                pygame.quit()
                sys.exit()

if __name__ == "__main__":
    main()
