var BABYLON = require( 'babylonjs')
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var box1;

function create_scene() 
{
	var x = 0;
	var y = 0.8;
	var z = 10;
	var camera_position =  new BABYLON.Vector3(x, y, z);
	var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", x, y, z, new BABYLON.Vector3.Zero(), scene);

    /* Attach camera to canvas */
	camera.attachControl(canvas, false);

	x = 0;
	y = 1;
	z = 0;
    
	/* Create light aiming at x, y, z*/
	var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(x, y, z), scene);

    /* Create a Cube Shape */
	box1 = BABYLON.Mesh.CreateBox("Box1", 2.0, scene);

    box1.position.y = 1;

	var materialBox = new BABYLON.StandardMaterial("mat", scene);
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);

    box1.material = materialBox;

	/* Create Ground Plane */
	var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:10, width:10, subdivisions: 2}, scene);

    return scene;
}

function screen_resize_event_handler()
{
	window.addEventListener('resize', function() {
			engine.resize();
			});
}

var limit=false, ctr = 0;
function rendering_loop()
{
	engine.runRenderLoop(function() { 
		ctr += 1;

		if(ctr > 100){
			if(limit){
				limit = false;
			}else{
				limit = true;
			}
			ctr = 0;
		}

		if(limit){
			box1.scaling.x += 0.01;
		}else{
			box1.scaling.x -= 0.01;
		}
		scene.render();
	});
}

scene = create_scene();
rendering_loop();
screen_resize_event_handler();
