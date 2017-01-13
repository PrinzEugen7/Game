# -*- coding:utf-8 -*-
import pygame
from pygame.locals import *
import sys
SCR_RECT = Rect(0, 0, 640, 480) # 画面サイズ

# マップのクラス
class Map:
    # マップデータ
    map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
           [1,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1],
           [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
           [1,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1],
           [1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1],
           [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
           [1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1,0,0,0,1],
           [1,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1],
           [1,0,0,0,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,1],
           [1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
           [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
           [1,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,0,1,0,1],
           [1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
    row,col = len(map), len(map[0]) # マップの行数,列数を取得
    imgs = [None] * 256             # マップチップ
    msize = 32                      # 1マスの大きさ[px]
    # マップの描画
    def draw(self, screen):
        for i in range(self.row):
            for j in range(self.col):
                screen.blit(self.imgs[self.map[i][j]], (j*self.msize,i*self.msize))

# 画像の読み込み
def load_img(filename, colorkey=None):
    img = pygame.image.load(filename)
    img = img.convert()
    if colorkey is not None:
        if colorkey == -1:
            colorkey = img.get_at((0,0))
        img.set_colorkey(colorkey, RLEACCEL)
    return img

def main():
    pygame.init()
    screen = pygame.display.set_mode(SCR_RECT.size)
    Map.imgs[0] = load_img("grass.png")         # 草地
    Map.imgs[1] = load_img("water.png")         # 水
    map = Map()
    while (1):
        map.draw(screen)
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
