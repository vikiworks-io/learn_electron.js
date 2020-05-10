var THREE = require('three');

var scene, camera, renderer, cube;

function init_perspective_camera()
{
	/*Field of View of camera in degrees*/
	fov = 75; 
	
	/*aspect ratio*/
	asp = (window.innerWidth / window.innerHeight); 

	/*Stop Rendering When Camera is nearer than */
	rend_near_limit = 0.1;

	/*Stop Rendering When Camera is farther than */
	rend_far_limit = 1000;

	/*Create camera object*/
	camera = new THREE.PerspectiveCamera( fov, asp, rend_near_limit, rend_far_limit);
}

function init_scene()
{
	//var color = 0xc0c0c0; /*Grey*/
	var color = 0xFFFFFF; /*White*/
	scene = new THREE.Scene();
	scene.background = new THREE.Color(color);
}

function init_render_scene()
{
	/*render scene*/
	renderer = new THREE.WebGLRenderer();

	/*rendering area*/
	renderer.setSize( window.innerWidth, window.innerHeight );

	/*Add render element to HTML Document*/
	document.body.appendChild( renderer.domElement );
}

function create_cube()
{
	var w = 2;	/* cube width	*/
	var h = 2;	/* cube height	*/
	var d = 2;  /* cube depth	*/
	var material_color = 0xD8DE24; //OLIVE-YELLOW
	//var material_color = 0x000000;
	
	var geometry = new THREE.BoxGeometry( w, h, d );
	var material = new THREE.MeshBasicMaterial({ color : material_color });
	cube = new THREE.Mesh( geometry, material );
}

var limit = 0;
var direction = 0;
/*Animation Loop*/
function animate()
{
	requestAnimationFrame( animate );
	cube.rotation.x += 0.04;
	cube.rotation.y += 0.04;
	
	if(limit > 500)
	{
		limit = 0;
		if(direction == 1){
			direction = 0;
		}else{
			direction = 1;
		}
	}

	limit += 1;
	
	if(direction){
		cube.position.x += 0.01;
	}else{
		cube.position.x -= 0.01;
	}

	renderer.render( scene, camera );
}


init_perspective_camera();
init_scene();
init_render_scene();
create_cube();

var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

/*add cube to the scene*/
scene.add(cube);
camera.position.z = 10;
animate();
