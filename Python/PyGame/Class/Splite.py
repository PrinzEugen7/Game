# -*- coding: utf-8 -*-
import pygame
from pygame.locals import *
import sys

SCREEN = Rect(0, 0, 400, 400)

# スプライトのクラス
class Sprite(pygame.sprite.Sprite):
    # 画像ファイル名, 位置x, 位置y, x方向の速さ, y方向の速さ
    def __init__(self, filename, x, y, vx, vy):
        pygame.sprite.Sprite.__init__(self)
        self.img = pygame.image.load(filename).convert_alpha()
        w = self.img.get_width()
        h = self.img.get_height()
        self.rect = Rect(x, y, w, h)
        self.vx = vx
        self.vy = vy

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
        screen.blit(self.image, self.rect)

def main():
    pygame.init()
    screen = pygame.display.set_mode(SCREEN.size)
    # スプライトを作成
    player = Sprite("player.png", 10, 10, 5, 5)
    enemy1 = Sprite("enemy1.jpg", 0, 0, 2, 2)
    enemy2 = Sprite("enemy2.jpg", 0, 0, 2, 2)
    clock = pygame.time.Clock()

    while (1):
        clock.tick(30)  # フレームレート(30fps)
        screen.fill((0,0,255))
        # スプライトを更新
        python1.update()
        python2.update()
        python3.update()
        # スプライトを描画
        python1.draw(screen)
        python2.draw(screen)
        python3.draw(screen)
        # 画面更新
        pygame.display.update()

        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()

if __name__ == "__main__":
    main()
