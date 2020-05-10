var BABYLON = require( 'babylonjs')
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

function create_scene() 
{    
	var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera",1,1,140,BABYLON.Vector3.Zero(),scene);

	var camera_position = new BABYLON.Vector3(0,40,0);

    camera.setTarget(camera_position);

    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    light.intensity = 0.7;

	BABYLON.SceneLoader.ImportMesh("", "./", "Dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {
	    var mesh = newMeshes[0];
		var skeleton = skeletons[0];
		
		var animation = scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
		
		var bone = skeleton.bones[2];
		
		var scale = 2;
		
		scene.registerBeforeRender(function () {

			bone.setScale(new BABYLON.Vector3(scale, scale, scale), false);

		});
		
	});
	

    return scene;
};


function screen_resize_event_handler()
{
	window.addEventListener('resize', function() {
			engine.resize();
			});
}

function rendering_loop()
{
	engine.runRenderLoop(function() { 
		scene.render();
	});
}

scene = create_scene();
rendering_loop();
screen_resize_event_handler();
