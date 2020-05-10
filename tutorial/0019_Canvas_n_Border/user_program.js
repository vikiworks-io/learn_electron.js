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
    context.strokeStyle = "#F1C40F";
    context.lineWidth = '6';
    context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    draw();
}



function draw() 
{

}


