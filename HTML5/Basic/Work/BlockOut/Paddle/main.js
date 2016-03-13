// ゲームシステム変数
var game = {
	ctx: null,
	time: 0,
	status: 'play',
	pos: {x: 0, y: 0},
	fps: 30,
	cvs: {width: 640,height: 480},														// キャンバス：サイズ
	paddle: {size: 50, color: '#00dd00'},												// パドル：サイズ, 色
	block: {size: 5, speed: 5, color: '#00aa00', strokeColor: '#003300'},	// ブロック：サイズ, 速さ, 色(内部), 色(外枠)
	background: {color: '#001100'}													// 背景: 色
};

// パドル管理用のクラス
function Paddle() { this.initialize.apply(this, arguments); }
Paddle.prototype = {
	size: 0, x: 0, y: 0,
	// コンストラクタ
	initialize: function(option) { this.size = option.size; },
	// 移動
	move: function(x, y) {
		this.x = x;
		this.y = y;
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > game.cvs.width) {
			this.x = game.cvs.width;
		}
	},
	// 描画
	draw: function() {
		game.ctx.fillStyle = game.paddle.color;
		game.ctx.fillRect(this.x - (this.size / 2), this.y, this.size, 10);
	}
};

// マウスイベント(パドル操作用)
window.addEventListener('mousedown', function(e) {}, false);
window.addEventListener('mousemove', function(e) {
	var rect = e.target.getBoundingClientRect();
	game.pos.x = e.clientX - rect.left;
	game.pos.y = e.clientY - rect.top;
}, false);

function main() {
	var cvs = document.getElementById('sample');
	game.ctx = cvs.getContext('2d');
	// パドル初期化
	var paddle = new Paddle({size: game.paddle.size});
	// アニメーション
	setInterval(function() {
		if (game.status != 'play') {
			game.ctx.fillStyle = game.background.color;
			game.ctx.fillRect(0, 0, game.cvs.width, game.cvs.height);
			return;
		}
		game.time++;																// 時間加算
		game.ctx.clearRect(0, 0, game.cvs.width, game.cvs.height);	// キャンバスクリア
		game.ctx.fillStyle = '#001100';										// キャンバスを塗りつぶす
		game.ctx.fillRect(0, 0, game.cvs.width, game.cvs.height);
		paddle.move(game.pos.x, game.cvs.height - 40);					// パドル移動
		var flag = true;		// クリア判定
		paddle.draw();							//バドル描画
		// ブロック描画
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				blocks[i * col + j].draw();
			}
		}
	}, parseInt(1000 / game.fps));
}
