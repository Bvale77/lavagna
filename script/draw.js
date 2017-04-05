var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var lastX;
var lastY;
var strokeColor="red";
var strokeWidth=5;
var mouseX;
var mouseY;
var canvasOffset=$("#canvas").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var isMouseDown=false;


function handleMouseDown(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  lastX=mouseX;
  lastY=mouseY;
  isMouseDown=true;
}

function handleMouseUp(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseup stuff here
  isMouseDown=false;
}

function handleMouseOut(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseOut stuff here
  isMouseDown=false;
}

function handleMouseMove(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousemove stuff here
  if(isMouseDown){
	ctx.lineJoin = 'bevel';
	ctx.beginPath();
    if(mode=="pen"){
      ctx.globalCompositeOperation="source-over";
      ctx.moveTo(lastX,lastY);
      ctx.lineTo(mouseX,mouseY);
	  ctx.quadraticCurveTo(lastX,lastY,mouseX,mouseY);
	  ctx.globalAlpha = 1;
	  ctx.strokeStyle = $('#pcolor').val();
	  ctx.lineWidth = $('#punta').val();
      ctx.stroke();     
    }
	else if (mode == "evidenz") {
      ctx.globalCompositeOperation="source-over";
      ctx.moveTo(lastX,lastY);
      ctx.lineTo(mouseX,mouseY);
	  ctx.quadraticCurveTo(lastX,lastY,mouseX,mouseY);
	  ctx.globalAlpha = 0.2;
	  ctx.strokeStyle = $('#pcolor').val();
	  ctx.lineWidth = 20;
      ctx.stroke();   
	}
	else{
      ctx.globalCompositeOperation="destination-out";
      ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
	  ctx.globalAlpha = 1;
      ctx.fill();
    }
    lastX=mouseX;
    lastY=mouseY;
  }
}

$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

var mode="pen";
$("#pen").click(function(){ mode="pen"; $('#alpha').val('1'); });
$("#evidenz").click(function(){ mode="evidenz"; $('#pcolor').val('yellow');  });
$("#eraser").click(function(){ mode="eraser"; $('#alpha').val(1); });


function SwitchZIndex(idToActive) {
	x = $('#stuffs').css('z-index');
	y = $('#canvas').css('z-index');

	if (idToActive == 'stuffs') {
		if (x < y) {
			$('#stuffs').css('z-index', x + 1);
			$('#canvas').css('z-index', y - 1);
			$('#whichlevel').html('interattivo');
			}
		}
	if (idToActive == 'canvas') {
		if (y < x) {
			$('#stuffs').css('z-index', x - 1);
			$('#canvas').css('z-index', y + 1);
			$('#whichlevel').html('lavagna');
			}
	}
	
	if (idToActive == '') {
		if (x < y) {
			$('#stuffs').css('z-index', x + 1);
			$('#canvas').css('z-index', y - 1);
			$('#whichlevel').html('interattivo');
			}
		else {
			$('#stuffs').css('z-index', x - 1);
			$('#canvas').css('z-index', y + 1);
			$('#whichlevel').html('lavagna');
		}
	}
}