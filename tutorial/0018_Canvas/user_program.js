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
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
    context.fillStyle = "#F1C40F";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    draw();
}



function draw() 
{

}


