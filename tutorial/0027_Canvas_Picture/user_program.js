var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fs = require('fs');
var path = require('path');
var process = require("process");


var pos_x = 0,  pos_y = 0;
var __canvas_background = "white";
var __shape_color = "black";
var __shape_border = 4;
var __fill_color   = new Boolean(false);
var __pencil_color = "black";
var __pencil_thickness = 4;
var __shadow_color = "black";
var __shadow_blur  = 20;

var image_names = [];
var sleeping = false;

var g_ctr = 10;

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

function clear_canvas()
{
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    noFill();
    context.fill();
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

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function sleep2(ms, callback){
    sleeping = true;
    setTimeout(callback, ms);
}

function sleep_callback(){
    sleeping=false;
}

function image(file_path)
{
    clear_canvas();
    context.restore();
    var image = new Image();
    //replace space with '\ '
    fp = file_path.replace(/ /g,'%20'); 
    //console.log(fp);
    image.src = fp;

    var width = image.width;
    var height = image.height;

    while(true){
        if((width > canvas.width) || (height > canvas.height)){
            width = width * 0.5;
            height = height * 0.5;
        }else{
            break;
        }
    }

    var center_x = canvas.width/2  - width/2;
    var center_y = canvas.height/2 - height/2;
    
    //var  p_x = canvas_w_mid - width/2;
    //var p_y = canvas_h_mid - height/2;

    //context.drawImage(image, p_x, p_y, canvas.width*0.5, canvas.height*0.5);
    image.onload = function (){context.drawImage(image, center_x, center_y, width, height);}
}

function slide_image(){
    len = image_names.length;

    if(g_ctr >= len){
        return;
    }

    file_name = image_names[g_ctr];
    console.log(file_name);
    image(file_name);
    g_ctr += 1;
    sleep2(2000, slide_image);
}

function iterate_directory(file_path, delay){
    
    fs.readdir(file_path, function (err, files) {
        if (err) {
            console.error("error: directory listing", err);
            process.exit(1);
        }

        files.forEach(function (file, index) {
            var file_n_path = path.join(file_path, file);

            //File Info
            fs.stat(file_n_path, function (error, stat) {
                if (error) {
                    console.error("Error stating file.", error);
                    return;
                }
                if (stat.isFile()){
                    //console.log("File : '%s'", file_n_path);
                    image_names.push(file_n_path);
                }else{
                    //console.log("Directory : '%s'", file_n_path);
                }
            });

        });
    });
}

function draw() 
{
    var color_orange = "#F39C12";
    pencil_color(color_orange);
    pencil_thickness(5);
    fill();
    gotoxy(0,0);
    shadow();
    //image("/Users/viki/Library/Mobile\ Documents/com\~apple\~CloudDocs/viki_flash/flash_card_sac1/607.png");
    image("/Users/viki/Library/Mobile%20Documents/com\~apple\~CloudDocs/viki_flash/flash_card_sac1/607.png");
    iterate_directory("/Users/viki/Library/Mobile\ Documents/com\~apple\~CloudDocs/viki_flash/flash_card_sac1/");
    //console.log(image_names[1]);
    //image(image_names.pop());
    slide_image();

    //var str = "B I O S T A L L" ; 
    //console.log(str);
    //image(im);

}
