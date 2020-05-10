/* async system call */
const spawnSync = require('child_process').spawnSync;

var SerialPort = require('serialport');
var ser_port;
var read_ine;
var serial_parser;
var debug = true;
var port_list = [];

function add_port(port, index)
{
	port_list[index] = port;
	/* Since add_port will be called asynchronously,
	 * we are generating dropdown list here 
	 */
	generate_dropdown_list(port_list);
}

/*Port list will be added to port_list[] asynchronously*/
function get_serial_ports(){
	let i = 0;
	/* The list will be returned asynchronously */
	SerialPort.list(function (err, ports) {
		ports.forEach(function(port) {
			if(debug == true){
				message = "[PORT : "+i+"] [ "+port.comName+" ]"
				console.log(message);
			}
			add_port(port.comName, i)
			i += 1;
		});
	});
}

function open_serial_port(port_name){
	if(debug == true){
		msg = "Opening Serial Monitor : " + port_name;
		console.log(msg);
	}
	ser_port = new SerialPort(port_name, 9600);
	readline = SerialPort.parsers.Readline;
	serial_parser = new readline();
	ser_port.pipe(serial_parser);

	ser_port.on("open", serial_open);
	serial_parser.on("data", read_serial_data);
	ser_port.on("close", serial_close);
	ser_port.on("error", serial_error);

}

function serial_open()
{
	message = "serial port opened";
	if(debug == true){
		console.log(message);
	}
	alert(message);
	print_serial_monitor_init_text();
}

function serial_close()
{
	message = "serial port closed"; 
	if(debug == true){
		console.log(message);
	}
	alert(message);
	refresh_dropdown_list();
}

function serial_error(error)
{
	message = "Serial Port Error : " + error;
	alert(message);
}

function read_serial_data(data)
{
	/*write to text area*/
    text_area_append_data('serial_monitor_data_area', data);
}


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

function refresh_dropdown_list()
{
	if(debug == true){
		console.log("refresh_dropdown_list()");
	}

	/*Crear Port List*/
	port_list = [];

	list = '';
	list += '<option selected>[ [ [ Scanning .... ] ] ]</option>';

	drop_down_id = "select_serial_ports"
	html_add(drop_down_id, list);
}



function generate_dropdown_list(array)
{
	if(debug == true){
		console.log("generate_dropdown_list()");
	}

	list = '';
	list += '<option selected>[ [ [ select serial port ] ] ]</option>';

	for(i=0; i<array.length; i++){
		list += '<option>'+array[i]+'</option>';
		if(debug == true){
			msg = "[ port : "+array[i]+" ]";
			console.log(msg);
		}
	}

	drop_down_id = "select_serial_ports"
	html_add(drop_down_id, list);
}


function event_sp_refresh()
{
	refresh_dropdown_list();

	if(debug == true){
		console.log("event_sp_refresh()");
	}

	get_serial_ports();
}

function event_sp_connect()
{
	if(debug == true){
		console.log("event_sp_connect()");
	}

	port = document.getElementById("select_serial_ports");
	selected_port = port.options[port.selectedIndex].value;

	if(debug == true){
		message = "[ SELECTED PORT : " + selected_port + " ] [ Index : " + port.selectedIndex + " ]";
		console.log(message);
	}

	open_serial_port(selected_port);
}

function print_serial_monitor_init_text(){
	text_area_append_data('serial_monitor_data_area', "[ CONNECTED ESTABLISHED ]\n");
	text_area_append_data('serial_monitor_data_area',  "######################\n\n");
}

function event_sp_disconnect()
{
	if(debug == true){
		console.log("event_sp_disconnect()");
	}

	ser_port.close();
}

function text_area_append_data(id, data)
{
    document.getElementById(id).value += data;
	auto_scroll(id);
}

/* autoscroll text area on feed */
function auto_scroll(id){
    document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight
}

function sleep(milliseconds){
	return new Promise(resolve=> setTimeout(resolve, milliseconds));
}

async function sleep_test(){
	alert("Going to sleep for 10 seconds");
	await sleep(10000);
	alert("Woke up after 10 seconds of nice rest!!");
}

get_serial_ports();
