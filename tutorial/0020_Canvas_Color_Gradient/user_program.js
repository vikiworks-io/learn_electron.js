var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
initialize();


function initialize() 
{
    window.addEventListener('resize', resize_canvas, false);
    resize_canvas();
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

function gradient_rectangle()
{
    var color_orange = "#F39C12";
    var x = 0;
    var y = 0;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var gradient_start_x = 0;
    var gradient_start_y = 0;

    var gradient_end_x  = window.innerWidth;
    var gradient_end_y  = window.innerHeight;

    var gradient = context.createLinearGradient(gradient_start_x, gradient_start_y, 
                                                gradient_end_x, gradient_end_y);
    gradient.addColorStop(0,    "black" );
    gradient.addColorStop(0.5,  color_orange);
    gradient.addColorStop(1,    "white" );
    context.fillStyle = gradient;
    context.fillRect(x, y, width, height);
}

function draw() 
{
    gradient_rectangle();
}


