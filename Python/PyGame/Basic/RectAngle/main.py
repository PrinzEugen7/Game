# -*- coding:utf-8 -*-
import pygame
from pygame.locals import *
import sys


def main():
    pygame.init()                                               # Pygameの初期化
    screen = pygame.display.set_mode((300, 200))                # 大きさ600*500の画面を生成
    pygame.display.set_caption("GAME")                          # タイトルバーに表示する文字

    while (1):
        screen.fill((0,0,0))                                    # 画面を黒色に塗りつぶし
        pygame.draw.rect(screen,(0,80,0),Rect(10,10,80,50),5)   # 四角形を描画(塗りつぶしなし)
        #pygame.draw.rect(screen,(0,80,0),Rect(10,10,80,50))    # 四角形を描画(塗りつぶし)
        pygame.display.update()                                 # 画面を更新
        # イベント処理
        for event in pygame.event.get():
            if event.type == QUIT:                              # 閉じるボタンが押されたら終了
                pygame.quit()                                   # Pygameの終了(画面閉じられる)
                sys.exit()


if __name__ == "__main__":
    main()
