var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var pos_x = 0,  pos_y = 0;
var __canvas_background = "white";
var __shape_color = "black";
var __shape_border = 4;
var __fill_color   = new Boolean(false);
var __pencil_color = "black";
var __pencil_thickness = 4;
var __shadow_color = "black";
var __shadow_blur  = 20;
var ctr = 60;


initialize();

function initialize() 
{
    window.addEventListener('resize', resize_canvas, false);
    resize_canvas();
}

function pencil_color(color)
{
    __pencil_color = color;
    context.strokeStyle = __pencil_color;
}

function pencil_thickness(color)
{
    __pencil_thickness = color;
    context.lineWidth = __pencil_thickness;
}


function resize_canvas() 
{
    var x = 0;
    var y = 0;
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
    context.strokeStyle = "#F1C40F";
    context.lineWidth = '20';
    context.strokeRect(x, y, window.innerWidth, window.innerHeight);
    draw();
}

function clear_canvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function set_canvas_border()
{
    var x = 0;
    var y = 0;
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
    context.strokeStyle = "#F1C40F";
    context.lineWidth = '20';
    context.strokeRect(x, y, window.innerWidth, window.innerHeight);
}

function draw_shape()
{
    if(__fill_color){
        context.fill();
    }else{
        context.stroke(); 
    }
}

function rectangle(width, height)
{
    context.beginPath();
    context.rect(pos_x, pos_y, width, height);
    draw_shape();
}

function circle(radius)
{
    context.beginPath();
    var center_x = pos_x;
    var center_y = pos_y;
    var start_angle = 0;            /*   0 : degree in radians */
    var end_angle   = 2 * Math.PI;  /* 360 : degree in radians */
    context.arc(center_x, center_y, radius, start_angle, end_angle);
    draw_shape();
}

function gotoxy(x, y)
{
    pos_x = x;
    pos_y = y;
}

function shadow()
{
    context.shadowColor = __shadow_color;
    context.shadowBlur = __shadow_blur;
}

function shadowBlur(value)
{
    __shadow_blur = value;
}

function noShadow()
{
    context.shadowColor = "#000000";
}

function shadowColor(color)
{
    __shadow_color = color;
}

function fill()
{
     __fill_color   = true;
    context.fillStyle = __pencil_color;
}

function noFill()
{
     __fill_color   = false;
    context.fillStyle = __canvas_background;
}

function draw() 
{
    clear_canvas();
    set_canvas_border();    
    var color_orange = "#F39C12";
    pencil_color(color_orange);
    pencil_thickness(5);
    fill();
    gotoxy(60,ctr);
    shadow();
    circle(30)
    ctr = ctr + 1;
    setInterval(draw, 1000);
}


