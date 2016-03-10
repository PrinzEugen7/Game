# -*- coding: utf-8 -*-
import pygame
from pygame.locals import *
import sys

SCREEN = Rect(0, 0, 400, 400)

# スプライトのクラス
class Sprite(pygame.sprite.Sprite):
    # 画像ファイル名, 位置x, 位置y, x方向の速さ, y方向の速さ
    def __init__(self, filename, (x, y), (vx, vy), angle=0):
        pygame.sprite.Sprite.__init__(self)
        self.img = pygame.image.load(filename).convert_alpha()
        if angle != 0: self.img = pygame.transform.rotate(self.img, angle)
        w = self.img.get_width()
        h = self.img.get_height()
        self.rect = Rect(x, y, w, h)
        self.vx = vx
        self.vy = vy
        self.angle = angle

    def update(self):
        self.rect.move_ip(self.vx, self.vy)
        # 壁と衝突時の処理(跳ね返り)
        if self.rect.left < 0 or self.rect.right > SCREEN.width:
            self.vx = -self.vx
        if self.rect.top < 0 or self.rect.bottom > SCREEN.height:
            self.vy = -self.vy
        # 壁と衝突時の処理(壁を超えないように)
        self.rect = self.rect.clamp(SCREEN)

    def draw(self, screen):
        screen.blit(self.img, self.rect)

# メイン
def main():
    pygame.init()
    screen = pygame.display.set_mode(SCREEN.size)
    # スプライトを作成(画像ファイル名, 位置(x, y), 速さ(vx, vy), 回転angle)
    player = Sprite("player.png", (200, 200), (2, 0), 0)
    enemy1 = Sprite("enemy1.png", (200, 200), (0, 2), 0)
    enemy2 = Sprite("enemy2.png", (200, 200), (2, 2), 10)
    clock = pygame.time.Clock()

    while (1):
        clock.tick(30)  # フレームレート(30fps)
        screen.fill((0, 20, 0, 0)) # 画面の背景色
        # スプライトを更新
        player.update()
        enemy1.update()
        enemy2.update()
        # スプライトを描画
        player.draw(screen)
        enemy1.draw(screen)
        enemy2.draw(screen)
        # 画面更新
        pygame.display.update()
        # イベント処理
        for event in pygame.event.get():
            # 終了用のイベント処理
            if event.type == QUIT:          # 閉じるボタンが押されたとき
                pygame.quit()
                sys.exit()
            if event.type == KEYDOWN:       # キーを押したとき
                if event.key == K_ESCAPE:   # Escキーが押されたとき
                    pygame.quit()
                    sys.exit()

if __name__ == "__main__":
    main()
