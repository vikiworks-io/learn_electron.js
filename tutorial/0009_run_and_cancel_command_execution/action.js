/* async system call */
const spawn = require('child_process').spawn;
var process;
var in_progress = 0
var out = 0, err = 0;

function button_execute_action()
{
	if(in_progress == 1){
		alert("Previous operation in progress, Try after some time");
		return;
	}

	in_progress = 1;
	document.getElementById('text_area1').value += "Command Executed\n";
	document.getElementById('text_area1').value += "-----------------\n";

	process = spawn('find',['/Users/viki/', '-name', '*.jpg']);

	process.stdout.on('data', 
		(data) => {
			if(out == 0){
				document.getElementById('text_area1').value += "Output:\n";
				document.getElementById('text_area1').value += "----------------\n";
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
			document.getElementById('text_area1').value += "\n----------------\n";
		    document.getElementById('text_area1').value += "Execution Completed: ret_code [ ";
            document.getElementById('text_area1').value += code;
			document.getElementById('text_area1').value += " ]\n----------------\n";
			auto_scroll('text_area1');
			in_progress = 0;
			out = 0; err = 0;
	})
}

function button_cancel_action(){
	if(in_progress == 1){
		process.kill();
		in_progress = 0;
	}else{
        alert("There is no operation in progress!");
	}
}

function auto_scroll(textarea_id){
	document.getElementById(textarea_id).scrollTop = document.getElementById(textarea_id).scrollHeight 
}
