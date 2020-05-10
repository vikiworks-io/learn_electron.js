/* async system call */
const spawn = require('child_process').spawn;
var process;
var in_progress = 0
var out = 0, err = 0;
function button_click_action()
{
	if(in_progress == 1){
		alert("Previous operation in progress, Try after some time");
		return;
	}
	in_progress = 1;
	document.getElementById('text_area1').value += "Command Executed\n";
	process = spawn('python',['./scan_ip.py']);
	process.stdout.on('data', 
		(data) => {
			if(out == 0){
				document.getElementById('text_area1').value += "Output:\n";
				out = 1;
			}
			document.getElementById('text_area1').value += data;
			document.getElementById('text_area1').value += "\n";
			auto_scroll('text_area1');
		}
	);

	process.stderr.on('data', 
		(data) => {
			if(err == 0){
				document.getElementById('text_area1').value += "Error:\n\n";
				err = 1;
			}
			document.getElementById('text_area1').value += data;
			document.getElementById('text_area1').value += "\n";
			auto_scroll('text_area1');
		}
	);
	process.on('close', function(code){
		    document.getElementById('text_area1').value += "Close: ";
            document.getElementById('text_area1').value += code;
            document.getElementById('text_area1').value += "\n";
			auto_scroll('text_area1');
			in_progress = 0;
			out = 0; err = 0;
	})
}

function auto_scroll(textarea_id){
	document.getElementById(textarea_id).scrollTop = document.getElementById(textarea_id).scrollHeight 
}
