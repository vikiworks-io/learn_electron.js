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

initialize();
var drop_files_row = 300;
var drop_operation_in_progress = false;

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
    context.lineWidth = '6';
    context.strokeRect(x, y, window.innerWidth, window.innerHeight);
    draw();
}

function gotoxy(x, y)
{
    pos_x = x;
    pos_y = y;
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

function text(text_string)
{
    context.font = "20px Arial";
    context.fillText(text_string, pos_x, pos_y);
}

function init_drag_event_handler(div_id) {
    var drag_handler = document.getElementById(div_id);

    drag_handler.ondragover   = func_drag_over;
    drag_handler.ondragleave  = func_drag_leave;
    drag_handler.ondragend    = func_drag_end;
    drag_handler.ondrop       = func_drop;

    function func_drag_over()  
    {
        return false;
    }

    function func_drag_leave() 
    {
        return false;
    }

    function func_drag_end()
    {
        return false;
    }


    function  func_drop(e)
    {
        e.preventDefault();

        var length =  e.dataTransfer.items.length;;
        var file_list = "";

        drop_operation_in_progress = true;
        draw();
        for (let file of e.dataTransfer.files) {
            var file_path = file.path;
            console.log('file(s) dragged here: ', file_path);
            drag_drop_callback(file_path);
            file_list += file_path+"\n";
        }
        drop_operation_in_progress = false;
        /*reset row*/
        drop_files_row = 300; 

        return false;
    }
}

function clear_canvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drag_drop_callback(path)
{
    column = 60;
    var st = "[ "+path+" ]";
    gotoxy(column, drop_files_row);
    text(st);
    drop_files_row = drop_files_row + 50;
}

function draw() 
{
    clear_canvas();
    var color_orange = "#F39C12";
    init_drag_event_handler("canvas");
    pencil_color(color_orange);
    pencil_thickness(5);
    fill();
    gotoxy(200,100);
    text("Drag and Drop your files here")
}


