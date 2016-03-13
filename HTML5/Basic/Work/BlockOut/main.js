// パドル管理用のクラス
function Paddle() {
	this.initialize.apply(this, arguments);
}
Paddle.prototype = {
	size: 0,
	x: 0,
	y: 0,
	//コンストラクタ
	initialize: function(option) { this.size = option.size; },
	//移動
	move: function(x, y) {
		this.x = x;
		this.y = y;
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > config.canvas.width) {
			this.x = config.canvas.width;
		}
	},
	//描画
	draw: function() {
		system.context.fillStyle = '#AAAAAA';
		system.context.fillRect(this.x - (this.size / 2), this.y, this.size, 10);
	}
};

// ボール管理用のクラス
function Ball() {
	this.initialize.apply(this, arguments);
}
Ball.prototype = {
	size: 0, x: 0, y: 0, dx: 0, dy: 0,
	//コンストラクタ
	initialize: function(option) {
		this.size = option.size;
		this.x = option.x;
		this.y = option.y;
		this.dx = option.speed;
		this.dy = option.speed;
	},
	//移動テスト
	moveTest: function() {
		return {
			x: this.x + this.dx,
			y: this.y + this.dy
		};
	},
	//移動
	move: function() {
		var pos = this.moveTest();
		if (pos.x < this.size || pos.x > config.canvas.width - this.size) {
			this.dx *= -1;
		}
		if (pos.y < this.size || pos.y > config.canvas.height - this.size) {
			this.dy *= -1;
		}
		this.x += this.dx;
		this.y += this.dy;
	},
	//描画
	draw: function() {
		system.context.fillStyle = '#FFFFFF';
		system.context.beginPath();
		system.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		system.context.fill();
		system.context.closePath();
	}
};

// ブロック管理用のクラス
function Block() {
	this.initialize.apply(this, arguments);
}
Block.prototype = {
	x: 0, y: 0, w: 0, h: 0, flag: true,
	//コンストラクタ
	initialize: function(option) {
		this.x = option.x;
		this.y = option.y;
		this.w  = option.w;
		this.h = option.h;
	},
	//描画
	draw: function() {
		if (this.flag) {
			system.context.fillStyle = '#666666';
			system.context.fillRect(this.x, this.y, this.w, this.h);
		}
	}
};

// マウスイベント
window.addEventListener('mousedown', function(e) {}, false);
window.addEventListener('mousemove', function(e) {
	var rect = e.target.getBoundingClientRect();
	system.position.x = e.clientX - rect.left;
	system.position.y = e.clientY - rect.top;
}, false);

//設定項目
var config = { 
	fps: 30,
	canvas: {width: 640,height: 480},
	paddle: {size: 50},
	ball: {size: 5, speed: 5}
};

//システム変数
var system = {
	context: null,
	time: 0,
	status: 'play',
	position: {x: 0, y: 0}
};

function main() {
	var canvas = document.getElementById('sample');
	system.context = canvas.getContext('2d');

	//ボール初期化
	var ball = new Ball({size: config.ball.size, x: 0, y: 0,speed: config.ball.speed});
	ball.x = 320;
	ball.y = 400;
	ball.dx = config.ball.speed;
	ball.dy = config.ball.speed * -1;

	//パドル初期化
	var paddle = new Paddle({size: config.paddle.size});

	//ブロック初期化
	var blocks = [];
	var col = 16;
	var row = 8;

	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			blocks[i * col + j] = new Block({x: 40 + j * 40,　y: 40 + i * 20,　w: 40,　h: 20});
		}
	}

	//アニメーション
	setInterval(function() {
		if (system.status != 'play') {
			system.context.fillStyle = '#000000';
			system.context.fillRect(0, 0, config.canvas.width, config.canvas.height);
			system.context.fillStyle = '#FFFFFF';
			system.context.font = '15px "Arial Black"';
			if (system.status == 'gameover') {
				system.context.fillText('Game Over...', 150, 150);
			} 
			else if (system.status == 'clear') {
				system.context.fillText('Game Clear !', 150, 150);
			}

			return;
		}

		system.time++;		//時間加算
		system.context.clearRect(0, 0, config.canvas.width, config.canvas.height);		//キャンバスクリア
		system.context.fillStyle = '#000000';		//キャンバスを塗りつぶす
		system.context.fillRect(0, 0, config.canvas.width, config.canvas.height);
		//パドル移動
		paddle.move(system.position.x, config.canvas.height - 40);
		//パドル当たり判定
		if (ball.y >= paddle.y - ball.size && ball.y <= paddle.y + ball.size && ball.x >= paddle.x - (paddle.size / 2) && ball.x <= paddle.x + (paddle.size / 2)) {
			ball.dy *= -1;
		}
		//ボール移動テスト
		var pos = ball.moveTest();
		//ブロック当たり判定
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				if (blocks[i * col + j].flag) {
					//左からヒット
					if ( ball.x <= blocks[i * col + j].x && blocks[i * col + j].x <= pos.x && pos.y >= blocks[i * col + j].y && pos.y <= blocks[i * col + j].y + blocks[i * col + j].h ) {
						ball.dx *= -1;
						blocks[i * col + j].flag = false;
					}
					//右からヒット
					if (pos.x <= blocks[i * col + j].x + blocks[i * col + j].w && blocks[i * col + j].x + blocks[i * col + j].w <= ball.x && pos.y >= blocks[i * col + j].y && pos.y <= blocks[i * col + j].y + blocks[i * col + j].h) {
						ball.dx *= -1;
						blocks[i * col + j].flag = false;
					}
					//上からヒット
					if (ball.y <= blocks[i * col + j].y && blocks[i * col + j].y <= pos.y && pos.x >= blocks[i * col + j].x && pos.x <= blocks[i * col + j].x + blocks[i * col + j].w) {
						ball.dy *= -1;
						blocks[i * col + j].flag = false;
					}
					//下からヒット
					if (pos.y <= blocks[i * col + j].y + blocks[i * col + j].h && blocks[i * col + j].y + blocks[i * col + j].h <= ball.y && pos.x >= blocks[i * col + j].x && pos.x <= blocks[i * col + j].x + blocks[i * col + j].w) {
						ball.dy *= -1;
						blocks[i * col + j].flag = false;
					}
				}
			}
		}
		//ボール移動
		ball.move();

		//アウト判定
		if (ball.y >= config.canvas.height - ball.size) {
			system.status = 'gameover';
		}
		//クリア判定
		var flag = true;
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				if (blocks[i * col + j].flag) {
					flag = false;
				}
			}
		}
		if (flag) {
			system.status = 'clear';
		}
		//バドル描画
		paddle.draw();
		//ボール描画
		ball.draw();

		//ブロック描画
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				blocks[i * col + j].draw();
			}
		}

		//テキスト描画
		system.context.fillStyle = '#FFFFFF';
		system.context.font = '15px "Arial Black"';
		system.context.fillText('time : ' + system.time, 10, config.canvas.height - 10);
		system.context.fillText('score : ' );
	}, parseInt(1000 / config.fps));
}
