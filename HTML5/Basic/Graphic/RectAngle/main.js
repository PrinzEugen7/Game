// 直線を描く (canvas, 左上端座標(x1, y1), 幅, 高さ, 色
function drawLine(ctx, x, y, w, h, color)
{
    ctx.beginPath();        	// 描画を開始
    ctx.fillStyle = color; // 線色
    ctx.fillRect(x, y, w, h);     	// 直線の始点(x1, y1)
    ctx.stroke();           		// Canvas上に描画
}

function main()
{
    var cvs = document.getElementById("cv");
    var ctx = cvs.getContext("2d");
    drawLine(ctx, 10, 10, 200, 100, "#00aa00");
}
