# -*- coding: utf-8 -*-
import pygame
from pygame.locals import *
import sys

def main():
    (w,h) = (400,400)                       # 画面サイズ
    pygame.init()                           # pygame初期化
    pygame.display.set_mode((w, h), 0, 32)  # 画面設定
    screen = pygame.display.get_surface()
    bg = pygame.image.load("bg.jpg").convert_alpha()    # 背景画像の取得
    rect_bg = bg.get_rect()

    while (1):
        pygame.display.update()             # 画面更新
        pygame.time.wait(30)                # 更新時間間隔
        screen.fill((0, 20, 0, 0))          # 画面の背景色
        screen.blit(bg, rect_bg)            # 背景画像の描画
        # 終了用のイベント処理
        for event in pygame.event.get():
            if event.type == QUIT:          # 閉じるボタンが押されたとき
                pygame.quit()
                sys.exit()
            if event.type == KEYDOWN:       # キーを押したとき
                if event.key == K_ESCAPE:   # Escキーが押されたとき
                    pygame.quit()
                    sys.exit()

if __name__ == "__main__":
        main()
