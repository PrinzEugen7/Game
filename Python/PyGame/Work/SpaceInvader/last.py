#coding: utf-8
import pygame
from pygame.locals import *
import random
import sys

START, PLAY, GAMEOVER = (0, 1, 2)  # ゲーム状態
SCREEN = Rect(0, 0, 640, 480)

# インベーダー
class Invader:
    def __init__(self):
        pygame.init()
        screen = pygame.display.set_mode(SCREEN.size)
        # 素材のロード
        self.load_images()
        self.load_sounds()
        # ゲームオブジェクトを初期化
        self.init_game()
        # メインループ開始
        clock = pygame.time.Clock()
        while (1):
            clock.tick(60)
            self.update()
            self.draw(screen)
            pygame.display.update()
            self.key_handler()

    def init_game(self):
        # ゲーム状態
        self.game_state = START
        # スプライトグループを作成して登録
        self.group = pygame.sprite.RenderUpdates()
        self.aliens = pygame.sprite.Group()  # エイリアングループ
        self.shots = pygame.sprite.Group()   # ミサイルグループ
        self.beams = pygame.sprite.Group()   # ビームグループ
        # デフォルトスプライトグループを登録
        Player.containers = self.group
        Shot.containers = self.group, self.shots
        Alien.containers = self.group, self.aliens
        Beam.containers = self.group, self.beams
        Explosion.containers = self.group
        # 自機を作成
        self.player = Player()
        # エイリアンを作成
        for i in range(0, 50):
            x = 20 + (i % 10) * 40
            y = 20 + (i / 10) * 40
            Alien((x,y))

    def update(self):
        """ゲーム状態の更新"""
        if self.game_state == PLAY:
            self.group.update()
            # ミサイルとエイリアンの衝突判定
            self.collision_detection()
            # エイリアンをすべて倒したらゲームオーバー
            if len(self.aliens.sprites()) == 0:
                self.game_state = GAMEOVER

    def draw(self, screen):
        """描画"""
        screen.fill((0, 0, 0))
        if self.game_state == START:  # スタート画面
            # タイトルを描画
            title_font = pygame.font.SysFont(None, 80)
            title = title_font.render("INVADER GAME", False, (255,0,0))
            screen.blit(title, ((SCREEN.width-title.get_width())/2, 100))
            # エイリアンを描画
            alien_image = Alien.images[0]
            screen.blit(alien_image, ((SCREEN.width-alien_image.get_width())/2, 200))
            # PUSH STARTを描画
            push_font = pygame.font.SysFont(None, 40)
            push_space = push_font.render("PUSH SPACE KEY", False, (255,255,255))
            screen.blit(push_space, ((SCREEN.width-push_space.get_width())/2, 300))
            # クレジットを描画
            credit_font = pygame.font.SysFont(None, 20)
            credit = credit_font.render(u"2008 http://pygame.skr.jp", False, (255,255,255))
            screen.blit(credit, ((SCREEN.width-credit.get_width())/2, 380))
        elif self.game_state == PLAY:  # ゲームプレイ画面
            self.group.draw(screen)
        elif self.game_state == GAMEOVER:  # ゲームオーバー画面
            # GAME OVERを描画
            gameover_font = pygame.font.SysFont(None, 80)
            gameover = gameover_font.render("GAME OVER", False, (255,0,0))
            screen.blit(gameover, ((SCREEN.width-gameover.get_width())/2, 100))
            # エイリアンを描画
            alien_image = Alien.images[0]
            screen.blit(alien_image, ((SCREEN.width-alien_image.get_width())/2, 200))
            # PUSH STARTを描画
            push_font = pygame.font.SysFont(None, 40)
            push_space = push_font.render("PUSH SPACE KEY", False, (255,255,255))
            screen.blit(push_space, ((SCREEN.width-push_space.get_width())/2, 300))

    def key_handler(self):
        """キーハンドラー"""
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == KEYDOWN and event.key == K_ESCAPE:
                pygame.quit()
                sys.exit()
            elif event.type == KEYDOWN and event.key == K_SPACE:
                if self.game_state == START:  # スタート画面でスペースを押したとき
                    self.game_state = PLAY
                elif self.game_state == GAMEOVER:  # ゲームオーバー画面でスペースを押したとき
                    self.init_game()  # ゲームを初期化して再開
                    self.game_state = PLAY

    def collision_detection(self):
        # エイリアンとミサイルの衝突判定
        alien_collided = pygame.sprite.groupcollide(self.aliens, self.shots, True, True)
        for alien in alien_collided.keys():
            Alien.kill_sound.play()
            Explosion(alien.rect.center)  # エイリアンの中心で爆発
        # プレイヤーとビームの衝突判定
        beam_collided = pygame.sprite.spritecollide(self.player, self.beams, True)
        if beam_collided:  # プレイヤーと衝突したビームがあれば
            Player.bomb_sound.play()
            self.game_state = GAMEOVER  # ゲームオーバー！

    def load_images(self):
        # スプライトの画像を登録
        Player.image = pygame.image.load("player.png").convert()
        Shot.image = pygame.image.load("shot.png").convert()
        Alien.images = split_image(pygame.image.load("alien.png").convert(), 2)
        Beam.image = pygame.image.load("beam.png").convert()
        Explosion.images = split_image(pygame.image.load("explosion.png").convert(), 16)

    def load_sounds(self):
        Alien.kill_sound = pygame.mixer.Sound("kill.wav")
        Player.shot_sound = pygame.mixer.Sound("shot.wav")
        Player.bomb_sound = pygame.mixer.Sound("bomb.wav")

# 自機
class Player(pygame.sprite.Sprite):
    speed = 5  # 移動速度
    reload_time = 15  # リロード時間
    def __init__(self):
        # imageとcontainersはmain()でセット
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.rect = self.image.get_rect()
        self.rect.bottom = SCREEN.bottom  # プレイヤーが画面の一番下
        self.reload_timer = 0
    def update(self):
        # 押されているキーをチェック
        pressed_keys = pygame.key.get_pressed()
        # 押されているキーに応じてプレイヤーを移動
        if pressed_keys[K_LEFT]:
            self.rect.move_ip(-self.speed, 0)
        elif pressed_keys[K_RIGHT]:
            self.rect.move_ip(self.speed, 0)
        self.rect.clamp_ip(SCREEN)
        # ミサイルの発射
        if pressed_keys[K_SPACE]:
            # リロード時間が0になるまで再発射できない
            if self.reload_timer > 0:
                # リロード中
                self.reload_timer -= 1
            else:

                Player.shot_sound.play()# 発射音
                Shot(self.rect.center)  # 作成すると同時にallに追加
                self.reload_timer = self.reload_time

# 敵機(エイリアン)
class Alien(pygame.sprite.Sprite):
    speed = 2  # 移動速度
    animcycle = 18  # アニメーション速度
    frame = 0
    move_width = 230  # 横方向の移動範囲
    prob_beam = 0.005  # ビームを発射する確率
    def __init__(self, pos):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.rect.center = pos
        self.left = pos[0]  # 移動できる左端
        self.right = self.left + self.move_width  # 移動できる右端
    def update(self):
        # 横方向への移動
        self.rect.move_ip(self.speed, 0)
        if self.rect.center[0] < self.left or self.rect.center[0] > self.right:
            self.speed = -self.speed
        # ビームを発射
        if random.random() < self.prob_beam:
            Beam(self.rect.center)
        # キャラクターアニメーション
        self.frame += 1
        self.image = self.images[self.frame/self.animcycle%2]

# 自機の攻撃
class Shot(pygame.sprite.Sprite):
    speed = 9  # 移動速度
    def __init__(self, pos):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.rect = self.image.get_rect()
        self.rect.center = pos  # 中心座標をposに
    def update(self):
        self.rect.move_ip(0, -self.speed)  # 上へ移動
        if self.rect.top < 0:  # 上端に達したら除去
            self.kill()

# 敵機のビーム
class Beam(pygame.sprite.Sprite):
    speed = 5  # 移動速度
    def __init__(self, pos):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.rect = self.image.get_rect()
        self.rect.center = pos
    def update(self):
        self.rect.move_ip(0, self.speed)  # 下へ移動
        if self.rect.bottom > SCREEN.height:  # 下端に達したら除去
            self.kill()

# 爆発
class Explosion(pygame.sprite.Sprite):
    animcycle = 2  # アニメーション速度
    frame = 0
    def __init__(self, pos):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.rect.center = pos
        self.max_frame = len(self.images) * self.animcycle  # 消滅するフレーム
    def update(self):
        self.image = self.images[self.frame/self.animcycle]
        self.frame += 1
        if self.frame == self.max_frame:
            self.kill()  # 消滅

# 画像の分割
def split_image(image, n):
    image_list = []
    w = image.get_width()
    h = image.get_height()
    w1 = w / n
    for i in range(0, w, w1):
        surface = pygame.Surface((w1,h))
        surface.blit(image, (0,0), (i,0,w1,h))
        surface.set_colorkey(surface.get_at((0,0)), RLEACCEL)
        surface.convert()
        image_list.append(surface)
    return image_list

# メイン
def main():
    Invader()

if __name__ == "__main__":
    main()
