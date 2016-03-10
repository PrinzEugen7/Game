# -*- coding: utf-8 -*-
import pygame
from pygame.locals import *
import sys

def main():
    (w,h) = (400,400)   # 画面サイズ
    (x,y) = (w/2, h/2)
    pygame.init()       # pygame初期化
    pygame.display.set_mode((w, h), 0, 32)  # 画面設定
    screen = pygame.display.get_surface()
    bg = pygame.image.load("bg.jpg").convert_alpha()
    player = pygame.image.load("player.png").convert_alpha()
    rect_bg = player.get_rect()
    rect_player = player.get_rect()
    rect_bg.center = (0, 0)
    rect_player.center = (w/2, h/2)
    while (1):
        # キーイベント処理(キャラクタ画像の移動)
        pressed_key = pygame.key.get_pressed()
        if pressed_key[K_LEFT]:
            rect_player.move_ip(-1, 0)
        if pressed_key[K_RIGHT]:
            rect_player.move_ip(1, 0)
        if pressed_key[K_UP]:
            rect_player.move_ip(0, -1)
        if pressed_key[K_DOWN]:
            rect_player.move_ip(0, 1)

        pygame.display.update()     # 画面更新
        pygame.time.wait(30)        # 更新時間間隔
        screen.fill((0, 20, 0, 0))  # 画面の背景色
        screen.blit(bg, rect_bg)       # 画像の描画
        screen.blit(player, rect_player)       # 画像の描画
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
