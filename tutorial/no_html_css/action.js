/*Starting position of cursor*/
var _x = 0;
var _y = 0; 
var FALSE = 0;
var TRUE  = 1;
/*End position of cursor*/
var _cur_end_x = 0; 
var _cur_end_y = 0;
var __current_id = "container";
var __div_id = 0;
var __marker_color_r = 0;
var __marker_color_g = 0;
var __marker_color_b = 0;

var __Fill   = FALSE;
var __Stroke = FALSE;

class HTML_Object {
    constructor(){
        this.width  = 0;
        this.height = 0;
        this.type = "null";
        this.src  = "null";
        this.font_size = 0;
        this.font_face = "";
        this.background_color = "";
        this.bd_color = "";
        this.border_thickness = 0;
    }

    bg_color(r, g, b)
    {
        this.background_color = "rgb("+r+"," +g+"," +b+")";
    }

    border_color(r, g, b)
    {
         this.bd_color = "rgb("+r+"," +g+"," +b+")";
    }
}

function fill()
{
    __Fill = TRUE;
}

function noFill()
{
    __Fill = FALSE;
}

function stroke(r, g, b)
{
    __Stroke = TRUE;
    __marker_color_r = r;
    __marker_color_g = g;
    __marker_color_b = b;
}

function noStroke()
{
    __Stroke = FALSE;
}

function main_background(r, g, b)
{
    document.body.style.backgroundColor = "rgb("+r+"," +g+"," +b+")";
}

/*Bug: Testing Still in progress */
function main_border(r, g, b, thickness, dotted)
{
    element = document.getElementById("container");
    var w = document.documentElement.clientWidth - 10;
    var h = document.documentElement.clientHeight - 10;
    element.style.width = w.toString()+"px";
    element.style.height = h.toString()+"px";


    element.style.borderColor = "rgb("+r+"," +g+"," +b+")";
    element.style.borderWidth = thickness.toString()+"px";

    if(dotted == TRUE){
        element.style.borderStyle = "dotted";
    }else{
        element.style.borderStyle = "solid";
    }

}

function gotoxy(x, y)
{
    _x = x;
    _y = y;
}

function append_bottom()
{
    _x = _cur_end_x; 
}

function append_right()
{
    _y = _cur_end_y; 
}

function update_cursor(width, height)
{
    _cur_end_x = _x + width;
    _cur_end_y = _y + height;
}

function canvas(width, height)
{

}

function text(text_string)
{
//btn.innerHTML
}

function blank_line()
{

}

function update_id()
{
    __current_id = __div_id;
    __div_id = __div_id + 1;
}

function image(path)
{
    var element = document.getElementById(__current_id);
    var image = document.createElement("IMG");
    image.src = path;
    image.style.maxWidth = "100%"; 
    image.style.maxHeight = "100%"; 
    element.appendChild(image);
}

/*
function image(path, width, height)
{
    var element = document.getElementById(__current_id);
    var div     = document.createElement("DIV"); 
    div.id = __div_id;
    div.style.position = "fixed";
    div.style.top  = _x.toString()+"px";
    div.style.left = _y.toString()+"px";
 
    div.style.width = width.toString()+"px";
    div.style.height = height.toString()+"px";

    var image = document.createElement("IMG");
    image.src = path;
    image.style.maxWidth = "100%"; 
    image.style.maxHeight = "100%"; 
    element.appendChild(div);
    div.appendChild(image);
    update_id();
    update_cursor(width, height);
}
*/

function object_area(width, height)
{
    var element = document.getElementById(__current_id);
    var div     = document.createElement("DIV"); 
    div.id = __div_id;
    div.style.position = "fixed";
    div.style.top  = _x.toString()+"px";
    div.style.left = _y.toString()+"px";
 
    div.style.width = width.toString()+"px";
    div.style.height = height.toString()+"px";

    div.style.borderColor = "green";
    div.style.borderWidth = "1px";
    div.style.borderStyle = "solid";

    element.appendChild(div);
    update_id();
    update_cursor(width, height);
}

function place_object(x, y, object)
{
    var element = document.getElementById(__current_id);
    var div     = document.createElement("DIV"); 
    div.id = __div_id;
    div.style.position = "fixed";
    div.style.top  = _x.toString()+"px";
    div.style.left = _y.toString()+"px";
 
    div.style.width = object.width.toString()+"px";
    div.style.height = object.height.toString()+"px";

    if(object.bd_color){
        div.style.borderStyle = "solid";
        div.style.borderColor = object.bd_color;
    }

    if(object.border_thickness > 0){
        div.style.borderWidth = object.border_thickness.toString()+"px";
    }else{
        div.style.borderWidth = "2px";
    }

    if(object.background_color){
        div.style.backgroundColor = object.background_color;
    }

    element.appendChild(div);
    update_id();
    update_cursor(object.width, object.height);

}

/*
function append_right(object)
{

}

function append_bottom(object)
{

}
*/

function app_main()
{
    main_background(240,230,140);
    main_border(112,34, 34, 4, TRUE); 
    window.addEventListener('resize', function(event){
        main_border(112,34, 34, 4, TRUE);
    });
    var main_obj = new HTML_Object();
    main_obj.width = 20;
    main_obj.height = 20;
    main_obj.border_color(112,34, 34);
    main_obj.border_thickness  = 5;
    main_obj.bg_color(0,0,255);
    place_object(0,0, main_obj)

    //add_bottom();
    //image("images/1.jpeg", 100, 100);
}
