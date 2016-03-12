// 直線を描く (canvas, 始点(x1, y1), 端点(x2, y2), 線色, 線幅
function drawLine(ctx, x1, y1, x2, y2, color, lw)
{
    ctx.beginPath();        	// 描画を開始
    ctx.lineWidth = lw;     	// 線幅
    ctx.strokeStyle = color; // 線色
    ctx.moveTo(x1, y1);     	// 直線の始点(x1, y1)
    ctx.lineTo(x2, y2);    	// 直線の端点(x2, y2)
    ctx.stroke();           		// Canvas上に描画
}

function main()
{
    var cvs = document.getElementById("cv");
    var ctx = cvs.getContext("2d");
    drawLine(ctx, 0, 0, 100, 100, "#ff0000", 10);
}
