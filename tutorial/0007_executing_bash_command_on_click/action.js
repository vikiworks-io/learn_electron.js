const spawnSync = require('child_process').spawnSync;

function button_click_action()
{
 const out = spawnSync('ls');
 document.getElementById('text_area1').value += "Output:\n\n"
 document.getElementById('text_area1').value += out.stdout
 document.getElementById('text_area1').value += "\n\n--------\n\n"

 document.getElementById('text_area1').value += "Error:\n\n"
 document.getElementById('text_area1').value += out.stderr
}


