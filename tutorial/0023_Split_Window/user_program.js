var main_container;
function initialize(div_id)
{
    main_container = document.getElementById(div_id);
}

function MoveFromLeft(div_id, pixels)
{
    distance = pixels.toString()+"px";
    document.getElementById(div_id).style.left = distance;
}

function MoveFromRight(div_id, pixels)
{
    distance = pixels.toString()+"px";
    document.getElementById(div_id).style.right = distance;
}

function MoveFromTop(div_id, pixels)
{
    distance = pixels.toString()+"px";
    document.getElementById(div_id).style.top = distance;
}

function MoveFromBottom(div_id, pixels)
{
    distance = pixels.toString()+"px";
    document.getElementById(div_id).style.bottom = distance;
}

function div_color(div_id, color)
{
    document.getElementById(div_id).style.color = color;
}

function split_window()
{
    left_div = document.createElement('div');
    left_div.setAttribute("id", "left_section");
    left_div.className = "split left";

    right_div = document.createElement('div');
    right_div.setAttribute("id", "right_section");
    right_div.className = "split right";
   
    main_container.appendChild(left_div);
    main_container.appendChild(right_div);

    div_left_name = document.createElement('div');
    div_left_name.setAttribute("id", "left_name");
    div_left_name.className = "centered";
    
    div_right_name = document.createElement('div');
    div_right_name.setAttribute("id", "right_name");
    div_right_name.className = "centered";
    
    left_div.appendChild(div_left_name);
    right_div.appendChild(div_right_name);
    
    left_name = document.createElement('P');

    right_name = document.createElement('P');

    name1 = document.createTextNode("Left Display");
    name2 = document.createTextNode("Right Display");
    
    left_name.appendChild(name1);
    right_name.appendChild(name2);

    div_left_name.appendChild(left_name);
    div_right_name.appendChild(right_name);

    div_color("left_section", "white");
    div_color("right_section", "black");

    MoveFromTop("left_name", 40);
    
    
}


initialize("main_container");
split_window();
