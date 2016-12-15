// ステージ（1～7）の設定
block._stageMAX = 7;

block.stage = function( Num )
{
	switch( Num )
	{
		case 0  : var data = block.stage.st0(); break;
		case 1  : var data = block.stage.st1(); break;
		case 2  : var data = block.stage.st2(); break;
		case 3  : var data = block.stage.st3(); break;
		case 4  : var data = block.stage.st4(); break;
		case 5  : var data = block.stage.st5(); break;
		case 6  : var data = block.stage.st6(); break;
		case 7  : var data = block.stage.st7(); break;
		default : var data = block.stage.st0(); break;
	}
	var output = new Array();
	var output2 = new Array();
	for( var i=0 in data )
	{
		for( var j=0 in data[i] )
		{
			switch( data[i][j] )
			{
				case 1  : output.push(block.stage.makeBLOCK(0,i,j)); break;
				case 2  : output.push(block.stage.makeBLOCK(1,i,j)); break;
				case 3  : output.push(block.stage.makeBLOCK(2,i,j)); break;
				case 4  : output.push(block.stage.makeBLOCK(3,i,j)); break;
				case 5  : output2.push(block.stage.makeBLOCK(4,i,j));break;
				default : break;
			}
		}
	}
	return [output,output2];
}
// ブロック作成
block.stage.makeBLOCK = function( imgn,i,j )
{
	var obj = document.createElement('img');
	obj.src = img_block_list[imgn].src;
	obj.style.position = "absolute";
	obj.style.top = i*block._blockSize + "px";
	obj.style.left = j*block._blockSize + "px";
	obj.style.display = "inline";
	obj.width = block._blockSize;
	obj.height = block._blockSize;
	obj._top = i*block._blockSize;
	obj._left = j*block._blockSize;
	obj._level = imgn;
	return obj;
}

block.stage.st0 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [0,0,0,0,0,0,0,0,0,0];
	    data[2]  = [1,1,1,1,1,1,1,1,1,1];
	    data[3]  = [1,1,1,1,1,1,1,1,1,1];
	    data[4]  = [1,1,1,1,1,1,1,1,1,1];
	    data[5]  = [1,1,1,1,1,1,1,1,1,1];
	    data[6]  = [1,1,1,1,1,1,1,1,1,1];
	    data[7]  = [0,0,0,0,0,0,0,0,0,0];
	    data[8]  = [0,0,0,0,0,0,0,0,0,0];
	    data[9]  = [0,0,0,0,0,0,0,0,0,0];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st1 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [2,2,2,2,2,2,2,2,2,2];
	    data[2]  = [2,2,2,2,2,2,2,2,2,2];
	    data[3]  = [2,2,2,2,2,2,2,2,2,2];
	    data[4]  = [1,1,1,1,1,1,1,1,1,1];
	    data[5]  = [1,1,1,1,1,1,1,1,1,1];
	    data[6]  = [1,1,1,1,1,1,1,1,1,1];
	    data[7]  = [0,0,0,0,0,0,0,0,0,0];
	    data[8]  = [0,0,0,0,0,0,0,0,0,0];
	    data[9]  = [0,0,0,0,0,0,0,0,0,0];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st2 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [0,0,0,0,0,0,0,0,0,0];
	    data[2]  = [3,3,3,3,3,3,3,3,3,3];
	    data[3]  = [2,2,2,2,2,2,2,2,2,2];
	    data[4]  = [2,2,2,2,2,2,2,2,2,2];
	    data[5]  = [1,1,1,1,1,1,1,1,1,1];
	    data[6]  = [1,1,1,1,1,1,1,1,1,1];
	    data[7]  = [0,0,0,0,0,0,0,0,0,0];
	    data[8]  = [0,0,0,0,0,0,0,0,0,0];
	    data[9]  = [0,0,0,0,0,0,0,0,0,0];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st3 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [5,5,5,5,5,5,5,5,5,5];
	    data[2]  = [4,0,0,0,1,1,0,0,0,4];
	    data[3]  = [4,0,0,0,1,1,0,0,0,4];
	    data[4]  = [3,0,0,0,2,2,0,0,0,3];
	    data[5]  = [3,0,0,0,0,0,0,0,0,3];
	    data[6]  = [2,0,0,0,0,0,0,0,0,2];
	    data[7]  = [2,0,0,0,2,2,0,0,0,2];
	    data[8]  = [1,0,0,0,1,1,0,0,0,1];
	    data[9]  = [1,0,0,0,1,1,0,0,0,1];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st4 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [0,3,3,0,3,3,0,3,3,0];
	    data[2]  = [0,2,2,0,2,2,0,2,2,0];
	    data[3]  = [0,2,2,0,2,2,0,2,2,0];
	    data[4]  = [0,1,1,0,1,1,0,1,1,0];
	    data[5]  = [0,1,1,0,1,1,0,1,1,0];
	    data[6]  = [0,1,1,0,1,1,0,1,1,0];
	    data[7]  = [0,2,2,0,2,2,0,2,2,0];
	    data[8]  = [0,2,2,0,2,2,0,2,2,0];
	    data[9]  = [0,0,0,0,0,0,0,0,0,0];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st5 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [5,5,5,5,5,5,5,5,5,5];
	    data[2]  = [4,5,5,5,5,5,5,5,5,4];
	    data[3]  = [1,4,5,5,5,5,5,5,4,1];
	    data[4]  = [0,1,4,5,5,5,5,4,1,0];
	    data[5]  = [0,0,1,4,5,5,4,1,0,0];
	    data[6]  = [0,0,0,1,4,4,1,0,0,0];
	    data[7]  = [0,0,0,0,1,1,0,0,0,0];
	    data[8]  = [0,0,0,0,0,0,0,0,0,0];
	    data[9]  = [0,0,0,0,0,0,0,0,0,0];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st6 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [1,1,1,1,1,1,1,1,1,1];
	    data[2]  = [1,2,2,2,2,2,2,2,2,1];
	    data[3]  = [1,2,3,3,3,3,3,3,2,1];
	    data[4]  = [1,2,3,4,4,4,4,3,2,1];
	    data[5]  = [1,2,3,4,5,5,4,3,2,1];
	    data[6]  = [1,2,3,4,5,5,4,3,2,1];
	    data[7]  = [1,2,3,4,4,4,4,3,2,1];
	    data[8]  = [1,2,3,3,3,3,3,3,2,1];
	    data[9]  = [1,2,2,2,2,2,2,2,2,1];
	    data[10] = [1,1,1,1,1,1,1,1,1,1];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

block.stage.st7 = function()
{
	var data = new Array(16);
	    data[0]  = [0,0,0,0,0,0,0,0,0,0];
	    data[1]  = [5,5,5,1,1,1,1,5,5,5];
	    data[2]  = [5,5,5,1,1,1,1,5,5,5];
	    data[3]  = [5,5,4,2,2,2,2,4,5,5];
	    data[4]  = [1,1,2,3,3,3,3,2,1,1];
	    data[5]  = [1,1,2,3,4,4,3,2,1,1];
	    data[6]  = [1,1,2,3,3,3,3,2,1,1];
	    data[7]  = [5,5,4,2,2,2,2,4,5,5];
	    data[8]  = [5,5,5,1,1,1,1,5,5,5];
	    data[9]  = [5,5,5,1,1,1,1,5,5,5];
	    data[10] = [0,0,0,0,0,0,0,0,0,0];
	    data[11] = [0,0,0,0,0,0,0,0,0,0];
	    data[12] = [0,0,0,0,0,0,0,0,0,0];
	    data[13] = [0,0,0,0,0,0,0,0,0,0];
	    data[14] = [0,0,0,0,0,0,0,0,0,0];
	    data[15] = [0,0,0,0,0,0,0,0,0,0];
	return data;
}

var block_list = new Array( "block.png", "block.png", "block.png", "block.png", "block.png" );
var paddle = "paddle.png";
var ball_list = new Array( "ball.png", "ball.png", "ball.png", "ball.png" );
var img_block_list = new Array();
var img_paddle;
var img_ball_list = new Array();
for( var i=0 in block_list )
{
	img_block_list[i] = new Image();
	img_block_list[i].src = block_list[i];
}
img_paddle = new Image();
img_paddle.src = paddle;
for( var i=0 in ball_list )
{
	img_ball_list[i] = new Image();
	img_ball_list[i].src = ball_list[i];
}

onload = function()
{
	block();
}

function block()
{
	block.stage_reset();
	block.setObject();
	block.Setting();
	Mev();
}

block._stage = 0;
block._player = 4;

block.setObject = function()
{
	block._obj = document.getElementById("blockout");
	while( block._obj.childNodes.length )block._obj.removeChild( block._obj.childNodes[0] );
	block._blList = new Array();	
	block._ballLevel = 0;
	block._ballObj = document.createElement('img');
	block._ballObj.src = img_ball_list[block._ballLevel].src;
	block._ballObj.width = 6;
	block._ballObj.height = 6;
	block._ballObj.style.position = "absolute";
	block._ballTheta;
	block._ball_past = [0,0];	
	block._paddleObj = document.createElement('img');
	block._paddleObj.src = img_paddle.src;
	block._paddleObj.width = 30;
	block._paddleObj.height = 5;
	block._paddleObj.style.position = "absolute";
	block._paddleObj.speed = [0,0,0,0];
	block._width = 150;
	block._height = 230;
	block._eventON = true;
	block._started = false;
	block._blockSize = 15;
	block.pxs = 3;
}


block.stage_reset = function()
{
	block._stage = 0;
	block._player = 4;
	block._score = 0;
	block._score_R = 1;
}

block.Setting = function()
{
	block.ball_reset();
    // ブロックをセット
	var obj_blocks = block.stage(block._stage);
	block._obj_block = obj_blocks[0];
	block._obj_stone = obj_blocks[1];
	for( var i=0 in block._obj_block )
		if( block._obj_block[i] )block._obj.appendChild( block._obj_block[i] );
	for( var j=0 in block._obj_stone )
		if( block._obj_stone[j] )block._obj.appendChild( block._obj_stone[j] );
	
	block._textObj = document.createElement('span');
	block._textObj.id = "Text";
	block._textObj.style.position = "absolute";
	block._textObj.style.top = "0px";
	block._textObj.style.left = "0px";
	block._textObj.appendChild(document.createTextNode( "STAGE."+block._stage+",LIFE:"+block._player ));
	block._obj.appendChild( block._textObj );
	
	block._scoreObj = document.createElement('span');
	block._scoreObj.id = "Score";
	block._scoreObj.style.position = "absolute";
	block._scoreObj.style.top = block._height-2+"px";
	block._scoreObj.style.left = "0px";
	block._scoreObj.appendChild(document.createTextNode( "SCORE:"+block._score ));
	block._obj.appendChild( block._scoreObj );
}


block.ball_reset = function()
{
	var br_w = block._paddleObj.width;
	var br_h = block._paddleObj.height
	var bl_w = block._ballObj.width;
	var bl_h = block._ballObj.height
	block.setObjPos( block._paddleObj,block._height-br_h,(block._width-br_w)/2 );
	block._obj.appendChild( block._paddleObj );
	block.setObjPos( block._ballObj,block._height-br_h-bl_h,(block._width-bl_w)/2 );
	block._obj.appendChild( block._ballObj );
	block._started = false;
	block._ballLevel = 0;
	block._ballObj.src = img_ball_list[block._ballLevel].src;
}

// スタート
block.start = function()
{
	block._started = true;
	block._obj.onclick = null;
	block._ballTheta = 45;
	block.main();
}

// メイン
block.main = function()
{
	var br_w = block._paddleObj.width;
	var br_h = block._paddleObj.height
	var bl_w = block._ballObj.width;
	var bl_h = block._ballObj.height
	var ball_px =  block.pxs*Math.cos( block._ballTheta/180*Math.PI );
	var ball_py = -block.pxs*Math.sin( block._ballTheta/180*Math.PI );
	block.setObjPosPlus( block._ballObj,ball_py,ball_px );
	var _top = block._ballObj._top;
	var _left = block._ballObj._left;	
	// 壁
	if(  _top  <=0 )block._ballTheta += (360-2*block._ballTheta);
	if( _left>=block._width-bl_h  || _left <=0 )block._ballTheta += (180-2*block._ballTheta);
	block._ballTheta %= 360;	
	// パドル
	block._paddleObj.speed = block._paddleObj.speed.slice(1,4);
	block._paddleObj.speed.push( block._paddleObj._left );
	var paddle_speed = block._paddleObj._left - block._paddleObj.speed[0];
	if( _top >=block._height-br_h-bl_h )
	{
		if( block._paddleObj._left<=_left+bl_w && block._paddleObj._left+br_w>=_left )
		{
			block._ballTheta += (360-2*(block._ballTheta+paddle_speed/2));
			block._ballTheta %= 360;
			if( block._paddleObj._left+br_w/2-1<=_left && block._paddleObj._left+br_w/2+1>=_left )
			{
				block._ballLevel++;
				block._score += block._ballLevel*100;
			}else block._ballLevel = 0;
			if( block._ballLevel>3 )block._ballLevel = 3;
			block._ballObj.src = img_ball_list[block._ballLevel].src;
			block._score_R = 1;
		}else{
			block.PlayerMI();
			return;
		}
	}	
	// ブロック
	var s_random_h = 1-Math.round(2*Math.random());
	var s_random_w = 1-Math.round(2*Math.random());
	var block_length = 0;
	for( var i=0 in block._obj_block )
	{
		var this_b = block._obj_block[i];
		if( !this_b||this_b.style.display=="none" )continue;
		block_length++;
		var blo_x = this_b._left;
		var blo_y = this_b._top;
		if( _top+bl_h>=blo_y&&_top<=blo_y+block._blockSize && _left+bl_w>=blo_x&&_left<=blo_x+block._blockSize )
		{
			if( block._ballLevel <= this_b._level )
			{
				if( block._ball_past[0]+bl_h<blo_y||block._ball_past[0]>blo_y+block._blockSize )block._ballTheta += (360-2*block._ballTheta-s_random_h);
				if( block._ball_past[1]+bl_w<blo_x||block._ball_past[1]>blo_x+block._blockSize )block._ballTheta += (180-2*block._ballTheta-s_random_w);
				block._ballTheta %= 360;
				this_b._level-=block._ballLevel+1;
				if( this_b._level<-1 )this_b._level = -1;
			}else this_b._level = -1;
			block._score += block._score_R*10;
			block._score_R++;
			if( this_b._level<0 )
			{
				this_b.style.display = "none";
				this_b = 0;
			}else this_b.src = img_block_list[this_b._level].src;
			break;
		}
	}		
	// 石
	var s_random_h = 1-Math.round(2*Math.random());
	var s_random_w = 1-Math.round(2*Math.random());
	for( var i=0 in block._obj_stone )
	{
		var this_b = block._obj_stone[i];
		var blo_x = this_b._left;
		var blo_y = this_b._top;
		if( _top+bl_h>=blo_y&&_top<=blo_y+block._blockSize && _left+bl_w>=blo_x&&_left<=blo_x+block._blockSize )
		{
			if( block._ball_past[0]+bl_h<blo_y||block._ball_past[0]>blo_y+block._blockSize )block._ballTheta += (360-2*block._ballTheta-s_random_h);
			if( block._ball_past[1]+bl_w<blo_x||block._ball_past[1]>blo_x+block._blockSize )block._ballTheta += (180-2*block._ballTheta-s_random_w);
			block._ballTheta %= 360;
			break;
		}
	}
	block._scoreObj.removeChild( block._scoreObj.childNodes[0] );
	block._scoreObj.appendChild(document.createTextNode( "SCORE:"+block._score ));
		
	if( block_length )
	{
		block._ball_past = [_top,_left];
		setTimeout( "block.main()",10 );
	}else block.NextStage();
}

block.PlayerMI = function()
{
		block._player--;
	
	if( block._player>=0 )
	{
		block.ball_reset();
		block._textObj.removeChild( block._textObj.childNodes[0] );
		block._textObj.appendChild(document.createTextNode( "STAGE."+block._stage+",LIFE:"+block._player ));
		Mev();
	}else block();
	
	block._scoreObj.removeChild( block._scoreObj.childNodes[0] );
	block._scoreObj.appendChild(document.createTextNode( "SCORE:"+block._score ));
}

// 次ステージ
block.NextStage = function()
{
	block._stage++;
	block._player+=2;
	block._score += block._stage*1000;
	
	if( block._stage <= block._stageMAX )
	{
		block.setObject();
		block.Setting();
		Mev();
	}else block.ALLClear();
}

// 全クリ
block.ALLClear = function()
{
	while( block._obj.childNodes.length )block._obj.removeChild( block._obj.childNodes[0] );
	block._obj.style.fontSize = "20px";
	block._obj.appendChild(document.createTextNode( "ALL CLEAR" ));
	block._obj.onclick = null;
	document.onmousemove = null;
}

// マウス追尾
block.MouseStalker = function(e)
{
	if( !block._eventON )return;
	if( window.event )e = window.event;
	var scl_x = scrollLeft() + winWidth();
	var x = e.clientX + scrollLeft();
	var br_w = block._paddleObj.width;
	var br_h = block._paddleObj.height
	var bl_w = block._ballObj.width;
	var bl_h = block._ballObj.height
	
	var ber_x = x  - scl_x/2 + block._width/2 - br_w/2;
	if( ber_x>block._width-br_w )ber_x = block._width-br_w;
	if( ber_x<0            )ber_x = 0;
	ber_x = numX(ber_x);
	block.setObjPos( block._paddleObj,null,ber_x );
	if( !block._started )
	{
		var ball_x = x  - scl_x/2 + block._width/2 - bl_w/2;
		if( ball_x>block._width-(bl_w+br_w)/2 )ball_x = block._width-(bl_w+br_w)/2;
		if( ball_x<(br_w-bl_w)/2              )ball_x = (br_w-bl_w)/2;

		ball_x = numX(ball_x);
		block.setObjPos( block._ballObj,null,ball_x );
	}
}
function Mev()
{
	if(document.getElementById)
	{
		block._obj.onclick = block.start;
		document.onmousemove = block.MouseStalker;
	}
}

block.setObjPos = function( obj,y,x )
{
	if( y!=null )
	{
		obj._top_or = y;
		obj._top = Math.round(obj._top_or);
		obj.style.top = obj._top + "px";
	}
	if( x!=null )
	{
		obj._left_or = x;
		obj._left = Math.round(obj._left_or);
		obj.style.left = obj._left + "px";
	}
}
block.setObjPosPlus = function( obj,y,x )
{
	if( y )
	{
		obj._top_or += y;
		obj._top = Math.round(obj._top_or);
		obj.style.top = obj._top + "px";
	}
	if( x )
	{
		obj._left_or += x;
		obj._left = Math.round(obj._left_or);
		obj.style.left = obj._left + "px";
	}
}


Array.prototype.pop = function()
{
	var last = this.length-1;
	return this[last];
}

Array.prototype.push = function( data )
{
	var plus = this.length;
	return this[plus] = data;
}

numX = function( input )
{
	var num = input - Math.round(input/block.pxs)*block.pxs;
	if( num>0 )return input + (block.pxs-num);
	else if( num<0 )return input - num;
		else return input;
	
}

function winWidth()
{
	if( window.innerWidth )return window.innerWidth;
	if( document.compatMode == "CSS1Compat" )return document.body.parentNode.clientWidth;
	if( document.body.clientWidth )return document.body.clientWidth;
	return 600;
}
function winHeight()
{
	if( window.innerHeight )return window.innerHeight;
	if( document.compatMode == "CSS1Compat" )return document.body.parentNode.clientHeight;
	if( document.body.clientHeight )return document.body.clientHeight;
	return 400;
}
function scrollLeft()
{
	if( window.pageXOffset )return window.pageXOffset;
	if( document.compatMode == "CSS1Compat" )return document.body.parentNode.scrollLeft;
	if( document.body.scrollLeft )return document.body.scrollLeft;
	return 0;
}
function scrollTop()
{
	if( window.pageYOffset )return window.pageYOffset;
	if( document.compatMode == "CSS1Compat" )return document.body.parentNode.scrollTop;
	if( document.body.scrollTop )return document.body.scrollTop;
	return 0;
}
