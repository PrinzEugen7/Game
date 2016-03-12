

#coding: utf-8
import pygame
from pygame.locals import *
import math
import sys
import pygame.mixer
SCREEN = Rect(0, 0, 400, 400)

# バドルのクラス
class Paddle(pygame.sprite.Sprite):
    def __init__(self, filename):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.image.load(filename).convert()
        self.rect = self.image.get_rect()
        self.rect.bottom = SCREEN.bottom - 20          # パドルのy座標
    def update(self):
        self.rect.centerx = pygame.mouse.get_pos()[0]  # マウスのx座標をパドルのx座標に
        self.rect.clamp_ip(SCREEN)                     # ゲーム画面内のみで移動

# ブロックのクラス
class Block(pygame.sprite.Sprite):
    def __init__(self, filename, x, y):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.image.load(filename).convert()
        self.rect = self.image.get_rect()
        self.rect.left = SCREEN.left + x * self.rect.width
        self.rect.top = SCREEN.top + y * self.rect.height

def main():
    pygame.init()
    screen = pygame.display.set_mode(SCREEN.size)
    group = pygame.sprite.RenderUpdates()   # 描画用のスプライトグループ
    blocks = pygame.sprite.Group() # 衝突判定用のスプライトグループ
    Paddle.containers = group
    Block.containers = group, blocks
    paddle = Paddle("paddle.png")           # パドルの作成
    # ブロックの作成(14*10)
    for x in range(1, 15):
        for y in range(1, 11):
            Block("block.png", x, y)
    clock = pygame.time.Clock()

    while (1):
        clock.tick(60)      # フレームレート(60fps)
        screen.fill((0,20,0))
        group.update()        # 全てのスプライトグループを更新
        group.draw(screen)    # 全てのスプライトグループを描画
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

