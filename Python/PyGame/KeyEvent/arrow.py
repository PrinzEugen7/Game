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

    while (1):
        pygame.display.update()     # 画面更新
        pygame.time.wait(30)        # 更新時間間隔
        screen.fill((0, 20, 0, 0))  # 画面の背景色
        # 円の中心座標が画面の範囲外にある場合
        if x < 0:
            x = 0
        if x > w:
            x = w
        if y < 0:
            y = 0
        if y > h:
            y = h
        # 円を描画
        pygame.draw.circle(screen, (0, 200, 0), (x, y), 5)
        # イベント処理
        for event in pygame.event.get():
            # 画面の閉じるボタンを押したとき
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            # キーを押したとき
            if event.type == KEYDOWN:
                # ESCキーなら終了
                if event.key == K_ESCAPE:
                    pygame.quit()
                    sys.exit()
                # 矢印キーなら円の中心座標を矢印の方向に移動
                if event.key == K_LEFT:
                    x -= 1
                if event.key == K_RIGHT:
                    x += 1
                if event.key == K_UP:
                    y -= 1
                if event.key == K_DOWN:
                    y += 1


if __name__ == "__main__":
        main()
