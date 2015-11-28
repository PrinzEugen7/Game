# -*- coding: utf-8 -*-
import sys
import pygame
import math
from pygame.locals import *

def main():
    (x,y) = (400,400)   # 画面サイズ
    deg = 0             # 初期角度
    pygame.init()       # pygame初期化
    pygame.display.set_mode((x, y), 0, 32)  # 画面設定
    screen = pygame.display.get_surface()

    while (1):
        deg += 2
        if deg >= 360:  # 角度が360以上になったら初期化(0)
			deg = 0
        # レーダー画面の背景描画
        pygame.draw.circle(screen, (0, 200, 0), (x/2, y/2), x/2, 1)
        pygame.draw.circle(screen, (0, 200, 0), (x/2, y/2), x/4, 1)
        pygame.draw.line(screen, (0, 200, 0), (0, y/2), (x, y/2))
        pygame.draw.line(screen, (0, 200, 0), (x/2, 0), (x/2, y))
        # レーダービームの軌跡描画
        for i in range(1, 30):
            dx = x/2 + x/2 * math.cos(math.radians(deg-i))
            dy = y/2 + x/2 * math.sin(math.radians(deg-i))
            pygame.draw.aaline(screen, (0, 255/i, 0), (x/2, y/2), (dx, dy),5)

        pygame.display.update()     # 画面更新
        pygame.time.wait(30)        # 更新時間間隔
        screen.fill((0, 20, 0, 0))  # 画面の背景色

        # イベント
        for event in pygame.event.get():
            if event.type == QUIT:      # 閉じるボタンが押されたら終了
                pygame.quit()           # Pygameの終了(画面閉じられる)
                sys.exit()


if __name__ == "__main__":
	main()
