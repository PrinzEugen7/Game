function drawLine(ctx, x1, y1, x2, y2, color, lw)
{
    ctx.beginPath();        // 描画を開始
    ctx.lineWidth = lw;     // 線の太さ
    ctx.lineStyle = color;  // 線の色
    ctx.moveTo(x1, y1);     // 描画開始位置(x1, y1)
    ctx.lineTo(x2, y2);    // 指定座標(x2, y2)まで線を引く
    ctx.stroke();           // Canvas上に描画
}

function main()
{
    var cvs = document.getElementById("cv");
    var ctx = cvs.getContext("2d");
    drawLine(ctx, 0, 0, 100, 100, "#ff0000", 10);
}
