var stats;
var mesh, camera, scene, renderer;
var helper;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var clock = new THREE.Clock();
var controls;
var modelReady = false;
var musicReady = false;

function init() {
	// シーンの作成
	scene = new THREE.Scene();

	// FPSの表示
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	document.body.appendChild(stats.domElement);

	// 光の作成
	var ambient = new THREE.AmbientLight(0xeeeeee);
	scene.add(ambient);
	var light1 = new THREE.DirectionalLight(0x888888, 0.3);
	light1.position.set(-50, 15, 30);
	scene.add(light1);
	var light2 = new THREE.DirectionalLight(0x888888, 0.3);
	light2.position.set(50, 15, 30);
	scene.add(light2);

	// 画面表示の設定
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(windowWidth, windowHeight);
	renderer.setClearColor(new THREE.Color( 0xffffff));
	document.body.appendChild(renderer.domElement);

	// カメラの作成
	camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, 1, 1000);
	camera.position.set(0, 10, 35);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 60;
    controls.maxPolarAngle = Math.PI * 0.5;

	// ステージの作成
	var sGeometry = new THREE.PlaneGeometry(150, 50);
	var stageTexture = THREE.ImageUtils.loadTexture('stage.png');
    stageTexture.wrapS = stageTexture.wrapT = THREE.RepeatWrapping;
    stageTexture.repeat.set(45, 15);
	var sMaterial = new THREE.MeshLambertMaterial({map:stageTexture, side: THREE.DoubleSlide});
	var stage = new THREE.Mesh(sGeometry, sMaterial);
	stage.position.set(0, -10, 0)
	stage.rotation.x = -90 * Math.PI / 180;
	scene.add(stage);

	// モデルとモーションの読み込み準備
	helper = new THREE.MMDHelper(renderer);
	var onProgress = function (xhr) {
	};
	var onError = function (xhr) {
		alert('読み込みに失敗しました。');
	};
	var modelFile = 'models/pmd/lat_miku.pmd';
	var vmdFiles = ['models/vmd/nekomimi_lat.vmd'];

	// モデルとモーションの読み込み
	var loader = new THREE.MMDLoader();
	loader.load(modelFile, vmdFiles, function(object) {
		modelReady = true;
		mesh = object;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.set(0, -10, 0);
		helper.add(mesh);
		helper.setAnimation(mesh);

		helper.setPhysics(mesh);
		helper.unifyAnimationDuration({
			afterglow: 2.0
		});
		scene.add(mesh);
	}, onProgress, onError);


	// サウンドの読み込み
	var audioFile = 'models/music/music.m4a';
	loader.loadAudio(audioFile, function(audio, listener) {
		musicReady = true;
		listener.position.z = 1;
		helper.setAudio(audio, listener);
		helper.unifyAnimationDuration();
		scene.add(audio);
		scene.add(listener);
		ready = true;
	}, onProgress, onError);

	// リサイズ時
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	camera.aspect = windowWidth / windowHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(windowWidth, windowHeight);
}

function render() {
	requestAnimationFrame(render);
	if(modelReady && musicReady) {
		helper.animate(clock.getDelta());
		helper.render(scene, camera);
	} else {
		renderer.clear();
		renderer.render(scene, camera);
	}
	stats.update();
	controls.update();
}

function main()
{
  init();
  render();
}
