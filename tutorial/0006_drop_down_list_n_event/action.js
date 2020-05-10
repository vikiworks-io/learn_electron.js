/* async system call */
const spawnSync = require('child_process').spawnSync;

/*Blocking Call*/
function execute_command()
{
	ls_cmd = "ls /dev/tty.*"
	const ls = spawnSync('/bin/bash', ['-c', ls_cmd]);

	/*Piping stdout of ls to stdin of sort*/
	sort = spawnSync('/bin/bash', ['-c', 'sort'], {
		input: ls.stdout
	});
	
	output = sort.stdout.toString();
	return output;
}

function parse_output(output)
{
	/*The array will have an extra new line character appended at the end*/
	array = output.split("\n");
	/*remove extra newline character at the end of the array*/
	array.pop();
	return array;
}

function html_add(id, data)
{
	document.getElementById(id).innerHTML = data;
}

function generate_dropdown_list(array)
{
	list = '';
	list += '<option selected>[ [ [ select serial port ] ] ]</option>';

	for(i=0; i<array.length; i++){
	  list += '<option>'+array[i]+'</option>';
	}
	return list;
}

function event_select_serial_port()
{
	port = document.getElementById("select_serial_ports");
	selected_port = port.options[port.selectedIndex].value;
	message = "[ SELECTED PORT : " + selected_port + " ] [ Index : " + port.selectedIndex + " ]";
	alert(message);
}

output = execute_command();
var port_list = parse_output(output);
drop_down_list = generate_dropdown_list(port_list);
drop_down_id = "select_serial_ports"
html_add(drop_down_id, drop_down_list);
