var BABYLON = require( 'babylonjs')
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

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
	var box1 = BABYLON.Mesh.CreateBox("Box1", 2.0, scene);

    box1.position.y = 1;

	var materialBox = new BABYLON.StandardMaterial("mat", scene);
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);

    box1.material = materialBox;

	var fps = 30;
	
	var animationBox = new BABYLON.Animation(
								"electron_animation", 
								"scaling.x",								/* Scale Object in x axis*/ 
								fps,			
								BABYLON.Animation.ANIMATIONTYPE_FLOAT,		/* Type of Change, Translation, Direction or Quaternion */
								BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE	/* Restart From Initial Value */
								);


	
	/* key frame parameters */
	var keys = [];

	/*animation parameters : At frame 0 -> scaling factor of cube = 1 */
    keys.push({
        frame: 0,
        value: 1
    });
	
	
	/*animation parameters : At frame 20 -> scaling factor of cube = 0.1 */
	keys.push({
        frame: 40,
        value: 0.2
    });
	
	/*animation parameters : At frame 100 -> scaling factor of cube = 1 */
	keys.push({
        frame: 100,
        value: 1
    });

    animationBox.setKeys(keys);

    box1.animations.push(animationBox);

	setTimeout(async () => {
		var loop = true;
		var starting_frame = 0;
		var ending_frame = 100;
        var anim = scene.beginAnimation(box1, starting_frame, ending_frame, loop);

        console.log("Begin");
        await anim.waitAsync();
        console.log("End");
    });

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
