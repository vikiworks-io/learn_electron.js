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

var circle_color_tracker = {};

circle_default_color = "#F39C12";
circle_click_color   = "#27AE60";

var mouse_x = 0;
var mouse_y = 0;

var circle_tracker = {};
var circle_radius = 20;
initialize();


function initialize() 
{
    window.addEventListener('resize', resize_canvas, false);
    canvas.addEventListener('click', (e) => {
        console.log('canvas click');
        const mouse_pointer = {
            x: e.clientX,
            y: e.clientY
        };
        mouse_x = mouse_pointer.x;
        mouse_y = mouse_pointer.y;
        check_circle_click();
    });
    resize_canvas();
}

function str(num){
    base = 10;
    return num.toString(base);
}

function check_circle_click()
{
    for(i=0; i<circle_count(); i++){
        [x, y] = circle_xy_get(i)
        //console.log("[ x : "+x+" ] "+" [ y : "+y+" ]");

        x_sq = (mouse_x - x) ** 2;
        y_sq = (mouse_y - y) ** 2;
    
        hyp  = Math.sqrt(x_sq + y_sq);

        /*Circle Clicked*/
        if (hyp < circle_radius){
            console.log("Circle [ "+str(i)+" ] Clicked");
            var new_color = circle_default_color;
            if(circle_color_tracker[i] == circle_default_color){
                new_color = circle_click_color;
            }
            circle_color_tracker[i] = new_color;
            gotoxy(x, y);
            pencil_color(new_color);
            fill();
            circle(circle_radius);
            break;
        }
    }

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
    context.lineWidth = '6';
    context.strokeRect(x, y, window.innerWidth, window.innerHeight);
    draw();
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


function circle_xy_add(index, x_value, y_value){
    x_index = str(index) + "." + "0";
    y_index = str(index) + "." + "1";
    circle_tracker[x_index] = x_value; 
    circle_tracker[y_index] = y_value; 
}

function circle_xy_get(index){
    x_index = str(index) + "." + "0";
    y_index = str(index) + "." + "1";
    x =  circle_tracker[x_index];
    y =  circle_tracker[y_index];
    return  [x, y];
}

function circle_count(){
    length = Object.keys(circle_tracker).length;
    /*0 and 1 index of array has circle 1 and so on*/
    return length/2;
}

function str(num){
    base = 10;
    return num.toString(base);
}

function text(text_string)
{
    context.font = "20px Arial";
    context.fillText(text_string, pos_x, pos_y);
}

function draw() 
{
    var color_orange = circle_default_color;
    pencil_color(color_orange);
    pencil_thickness(5);
    fill();
    shadow();
    gotoxy(40,40);
    circle_xy_add(0, 40, 40); 
    circle_color_tracker[0] = circle_default_color;
    circle(circle_radius)
    
    gotoxy(100,100);
    circle_color_tracker[1] = circle_default_color;
    circle_xy_add(1, 100, 100); 
    circle(circle_radius)
    
    gotoxy(200,200);
    circle_color_tracker[2] = circle_default_color;
    circle_xy_add(2, 200, 200); 
    circle(circle_radius)
}


