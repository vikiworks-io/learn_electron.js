var container = document.getElementById('neighbor_list');

var btn_ctr = 0;

function add_button(text_str){

    /* Do not display more than 10 ip address */
    if(btn_ctr > 10){
        return;
    }
    button = document.createElement('button');
    button.type = "button";
    
    if((btn_ctr%2)==0){
        button.className = "btn btn-warning btn-block";
    }else{
        button.className = "btn btn-success btn-block";
    }

    button.innerHTML  = text_str;
    container.appendChild(button);
    button.addEventListener('click', button_cb.bind(this, text_str));
    btn_ctr += 1;
}

function button_cb(text_string)
{
    alert(text_string)
}


add_button("192.168.0.1");
add_button("192.168.0.2");
add_button("192.168.0.3");
add_button("192.168.0.4");
