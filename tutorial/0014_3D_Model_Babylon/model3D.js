var BABYLON = require( 'babylonjs')
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

function create_scene() 
{
	var x = 0;
	var y = 5;
	var z = -10;
	var camera_position =  new BABYLON.Vector3(x, y, z);
	var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera('camera', camera_position, scene);

    /* Set Camera to Origin */
	camera.setTarget(BABYLON.Vector3.Zero());

    /* Attach camera to canvas */
	camera.attachControl(canvas, false);

	x = 0;
	y = 1;
	z = 0;
    
	/* Create light aiming at x, y, z*/
	var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(x, y, z), scene);

    /* Create a Sphere Shape */
	var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:10, diameter:1}, scene);

    sphere.position.y = 1;

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

function rendering_loop()
{
	engine.runRenderLoop(function() { scene.render();});
}
scene = create_scene();

rendering_loop();

screen_resize_event_handler();

