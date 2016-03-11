# -*- coding:utf-8 -*-
import pygame
from pygame.locals import *
import datetime
import sys


def main():
    pygame.init()                                   # Pygameの初期化
    screen = pygame.display.set_mode((300, 200))    # 大きさ600*500の画面を生成
    pygame.display.set_caption("GAME")              # タイトルバーに表示する文字
    font = pygame.font.Font(None, 25)               # フォントの設定(25px)
    while (1):
        screen.fill((0,0,0))                                    # 画面を黒色に塗りつぶし
        text = font.render(str(datetime.datetime.now()), True, (255,255,255))   # 時間を取得して描画する文字に設定
        screen.blit(text, [20, 100])# 文字列の表示位置
        pygame.display.update()     # 画面を更新
        # イベント処理
        for event in pygame.event.get():
            if event.type == QUIT:  # 閉じるボタンが押されたら終了
                pygame.quit()       # Pygameの終了(画面閉じられる)
                sys.exit()


if __name__ == "__main__":
    main()
