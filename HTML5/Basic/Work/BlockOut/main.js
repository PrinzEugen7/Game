//設定項目
var config = { 
	fps: 30,
	canvas: {width: 400,height: 300},
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

window.addEventListener('load', function() {
	var canvas = document.getElementById('sample');
	system.context = canvas.getContext('2d');

	//ボール初期化
	var ball = new Ball({size: config.ball.size,positionX: 0,positionY: 0,speed: config.ball.speed});
	ball.positionX = 200;
	ball.positionY = 260;
	ball.movingX = config.ball.speed;
	ball.movingY = config.ball.speed * -1;

	//パドル初期化
	var paddle = new Paddle({size: config.paddle.size});

	//ブロック初期化
	var blocks = [];
	var blockX = 8;
	var blockY = 4;

	for (var i = 0; i < blockY; i++) {
		for (var j = 0; j < blockX; j++) {
			blocks[i * blockX + j] = new Block({positionX: 40 + j * 40,　positionY: 40 + i * 20,　width: 40,　height: 20});
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
		if (ball.positionY >= paddle.y - ball.size && ball.positionY <= paddle.y + ball.size && ball.positionX >= paddle.x - (paddle.size / 2) && ball.positionX <= paddle.x + (paddle.size / 2)) {
			ball.movingY *= -1;
		}
		//ボール移動テスト
		var position = ball.moveTest();
		//ブロック当たり判定
		for (var i = 0; i < blockY; i++) {
			for (var j = 0; j < blockX; j++) {
				if (blocks[i * blockX + j].flag) {
					//左からヒット
					if ( ball.positionX <= blocks[i * blockX + j].positionX && blocks[i * blockX + j].positionX <= position.x && position.y >= blocks[i * blockX + j].positionY && position.y <= blocks[i * blockX + j].positionY + blocks[i * blockX + j].height ) {
						ball.movingX *= -1;
						blocks[i * blockX + j].flag = false;
					}
					//右からヒット
					if (position.x <= blocks[i * blockX + j].positionX + blocks[i * blockX + j].width && blocks[i * blockX + j].positionX + blocks[i * blockX + j].width <= ball.positionX && position.y >= blocks[i * blockX + j].positionY && position.y <= blocks[i * blockX + j].positionY + blocks[i * blockX + j].height) {
						ball.movingX *= -1;
						blocks[i * blockX + j].flag = false;
					}
					//上からヒット
					if (ball.positionY <= blocks[i * blockX + j].positionY && blocks[i * blockX + j].positionY <= position.y && position.x >= blocks[i * blockX + j].positionX && position.x <= blocks[i * blockX + j].positionX + blocks[i * blockX + j].width) {
						ball.movingY *= -1;
						blocks[i * blockX + j].flag = false;
					}
					//下からヒット
					if (position.y <= blocks[i * blockX + j].positionY + blocks[i * blockX + j].height && blocks[i * blockX + j].positionY + blocks[i * blockX + j].height <= ball.positionY && position.x >= blocks[i * blockX + j].positionX && position.x <= blocks[i * blockX + j].positionX + blocks[i * blockX + j].width) {
						ball.movingY *= -1;
						blocks[i * blockX + j].flag = false;
					}
				}
			}
		}
		//ボール移動
		ball.move();

		//アウト判定
		if (ball.positionY >= config.canvas.height - ball.size) {
			system.status = 'gameover';
		}
		//クリア判定
		var flag = true;
		for (var i = 0; i < blockY; i++) {
			for (var j = 0; j < blockX; j++) {
				if (blocks[i * blockX + j].flag) {
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
		for (var i = 0; i < blockY; i++) {
			for (var j = 0; j < blockX; j++) {
				blocks[i * blockX + j].draw();
			}
		}

		//テキスト描画
		system.context.fillStyle = '#FFFFFF';
		system.context.font = '15px "Arial Black"';
		system.context.fillText('time : ' + system.time, 10, config.canvas.height - 10);
		system.context.fillText(ball.positionY + ', ' + config.canvas.height, 10, config.canvas.height - 30);
	}, parseInt(1000 / config.fps));
}, false);


window.addEventListener('mousedown', function(e) {}, false);
window.addEventListener('mousemove', function(e) {
	var rect = e.target.getBoundingClientRect();
	system.position.x = e.clientX - rect.left;
	system.position.y = e.clientY - rect.top;
}, false);

//パドル管理クラス
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

//ボール管理クラス
function Ball() {
	this.initialize.apply(this, arguments);
}
Ball.prototype = {
	size: 0,
	positionX: 0,
	positionY: 0,
	movingX: 0,
	movingY: 0,
	//コンストラクタ
	initialize: function(option) {
		this.size = option.size;
		this.positionX = option.positionX;
		this.positionY = option.positionY;
		this.movingX = option.speed;
		this.movingY = option.speed;
	},
	//移動テスト
	moveTest: function() {
		return {
			x: this.positionX + this.movingX,
			y: this.positionY + this.movingY
		};
	},
	//移動
	move: function() {
		var position = this.moveTest();
		if (position.x < this.size || position.x > config.canvas.width - this.size) {
			this.movingX *= -1;
		}
		if (position.y < this.size || position.y > config.canvas.height - this.size) {
			this.movingY *= -1;
		}
		this.positionX += this.movingX;
		this.positionY += this.movingY;
	},
	//描画
	draw: function() {
		system.context.fillStyle = '#FFFFFF';
		system.context.beginPath();
		system.context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI, false);
		system.context.fill();
		system.context.closePath();
	}
};

//ブロック管理クラス
function Block() {
	this.initialize.apply(this, arguments);
}
Block.prototype = {
	positionX: 0,
	positionY: 0,
	width: 0,
	height: 0,
	flag: true,
	//コンストラクタ
	initialize: function(option) {
		this.positionX = option.positionX;
		this.positionY = option.positionY;
		this.width  = option.width;
		this.height = option.height;
	},
	//描画
	draw: function() {
		if (this.flag) {
			system.context.fillStyle = '#666666';
			system.context.fillRect(this.positionX, this.positionY, this.width, this.height);
		}
	}
};
