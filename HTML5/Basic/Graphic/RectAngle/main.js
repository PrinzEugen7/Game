// 直線を描く (canvas, 左上端座標(x1, y1), 幅, 高さ, 色
function drawRect(ctx, x, y, w, h, color)
{
    ctx.beginPath();        	// パスの初期化
    ctx.fillStyle = color;      // 線色
    ctx.fillRect(x, y, w, h);   // 四角形の始点(x1, y1), 幅w, 高さh
    ctx.closePath();            // パスの終了
}

function main()
{
    var cvs = document.getElementById("cv");
    var ctx = cvs.getContext("2d");
    drawRect(ctx, 10, 10, 200, 100, "#00aa00");
}
