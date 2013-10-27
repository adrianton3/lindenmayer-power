/*
 * Lindenmayer power
 * Developed and maintanined by Adrian Toncean
 * Licensed under the MIT license
 */

require.config({
	paths: {
		goo: '../lib/goo',
		purl: '../lib/purl'
	}
});

require(['goo'], function() {
	require([
		'purl',
		'goo/entities/GooRunner',
		'goo/entities/EntityUtils',
		'goo/renderer/Material',
		'goo/renderer/Camera',
		'goo/entities/components/CameraComponent',
		'goo/shapes/ShapeCreator',
		'goo/entities/components/ScriptComponent',
		'goo/renderer/shaders/ShaderLib',
		'goo/entities/World',
		'goo/scripts/OrbitCamControlScript',
		'goo/math/Vector3',

		'SubString',
		'Prod',
		'Gic',
		'Instruction',
		'StateString',
		'Procedure',
		'ProcedureSet',
		'TurtleState',
		'Turtle',
		'Presets',
		'Background'
	], function (
		purl,
		GooRunner,
		EntityUtils,
		Material,
		Camera,
		CameraComponent,
		ShapeCreator,
		ScriptComponent,
		ShaderLib,
		World,
		OrbitCamControlScript,
		Vector3,

		SubString,
		Prod,
		Gic,
		Instruction,
		StateString,
		Procedure,
		ProcedureSet,
		TurtleState,
		Turtle,
		Presets,

		Background
		) {
		'use strict';

		var goo;
		var cameraScript;
		var urlParams = purl(true).param();

		function setup() {
			function initGoo() {
				goo = new GooRunner();
				goo.renderer.domElement.id = 'gooCanvas';
				document.body.appendChild(goo.renderer.domElement);
			}
			
			function addCamera(goo) {
				var camera = new Camera(35, 1, 0.1, 1000);
	
				var cameraEntity = goo.world.createEntity('Camera');
				cameraEntity.setComponent(new CameraComponent(camera));
				cameraEntity.transformComponent.transform.translation.set(0, 0, 25);
	
				var scriptComponent = new ScriptComponent();
				cameraScript = new OrbitCamControlScript({
					domElement: goo.renderer.domElement,
					spherical: new Vector3(100, 0, 0),
					maxZoomDistance: 550,
					zoomSpeed: 1.6
				});
				scriptComponent.scripts.push(cameraScript);
	
				cameraEntity.setComponent(scriptComponent);
	
				cameraEntity.addToWorld();
			}
			
			function addBackground() {
				var themeIndex = 2;
				var theme = urlParams.theme;
				if (theme && !isNaN(theme)) {
					themeIndex = +theme;
				}
				Background.add(goo, themeIndex);
			}
			
			initGoo();
			addCamera(goo);
			addBackground(goo);	
		}

		setup();
//=============================================================================
		var gic;
		var stateString;
		var turtle;
		var procedureSet;
		var nlev;
		
		initLin();
		readAndDraw();

		function initLin() {
			function setupInitialStructure() {
				var defaultStructure;
				if (urlParams.grammar && urlParams.commands) {
					defaultStructure = {
						grammar: urlParams.grammar,
						commands: urlParams.commands,
						startLevel: typeof urlParams.level !== 'undefined' ? urlParams.level : 4
					};
					console.log(defaultStructure);
				} else {
					defaultStructure = Presets.binaryTree;
				}
				
				document.getElementById("inp_gic").value = defaultStructure.grammar;
				document.getElementById("inp_turtle").value = defaultStructure.commands;
				nlev = defaultStructure.startLevel;
			}

			function setupEventListeners() {
				document.getElementById('but_less').addEventListener('click', less);
				document.getElementById('but_more').addEventListener('click', more);
				document.getElementById('but_config').addEventListener('click', configShow);
				document.getElementById('but_config_ok').addEventListener('click', onConfigOk);
	
				document.getElementById('cmb_presets').addEventListener('change', onPresetSelected);
			}
			
			function fillDropdown() {
				var select = document.getElementById('cmb_presets');
				
				for (var key in Presets) {
					var preset = Presets[key];
					
					var option = document.createElement('option');
					option.text = preset.name;
					select.add(option);
				}
			}
		 
		 	setupInitialStructure();
		 	setupEventListeners();
		 	fillDropdown();
		}

		function onPresetSelected() {
			var collection = Object.keys(Presets);

			var cmb = document.getElementById("cmb_presets");
			var index = cmb.selectedIndex;

			var preset = Presets[collection[index]];

			document.getElementById("inp_gic").value = preset.grammar;
			document.getElementById("inp_turtle").value = preset.commands;
			nlev = preset.startLevel;
		}

		function readAndDraw() {
			var tmp = document.getElementById("inp_gic").value;
			gic = Gic.fromString(tmp);
			
			generate(nlev);
			draw();
		}

		function more() {
			nlev++;
			readAndDraw();
		}

		function less() {
			if(nlev > 2) nlev--;
			readAndDraw();
		}

		function onConfigOk() {
			readAndDraw();
			document.getElementById('d_dialog').style.display = 'none';
			document.getElementById('d_overlay').style.display = 'none';
		}

		function configShow() {
			document.getElementById('d_dialog').style.display = 'block';
			document.getElementById('d_overlay').style.display = 'block';
		}		

		function generate(nlev) {
			var strout = 'Start string:\n';
		 
			stateString = StateString.fromFirstNonterm(gic);
			strout += stateString.toString();

			for (var i = 0; i < nlev; i++) {
				stateString = stateString.derive(gic);
				strout += '\n\nString after ' + (i + 1) + ' derivation' + (i > 0 ? 's' : '') + ':\n' + stateString.toString();
			}
			
			document.getElementById("out_gic").value = strout;
		}

		function draw() {
			var startX = 0;
			var startY = 0;
			var startZ = 0;
			var startYaw = 90;
			var startPitch = 0;
			var startPen = true;
			var startR = 0;
			var startG = 0;
			var startB = 0;
			var getStartVars = function() { return {}; };
			var startThickness = 1;
		 
			var tmp = document.getElementById("inp_turtle").value;
			procedureSet = ProcedureSet.fromString(tmp);
		 
			turtle = new Turtle(
				new TurtleState(
					startX,
					startY,
					startZ,
					startYaw,
					startPitch,
					startPen,
					startR,
					startG,
					startB,
					getStartVars(),
					startThickness,
					undefined
				),
				goo
			);
			turtle.clearCanvas();
			turtle.interpret(stateString, procedureSet);

			adjustCameraToBoundingBox(goo);
		}
//=============================================================================
		function adjustCameraToBoundingBox(goo) {
			// rewrite this
			
			var entity, far, length, mrc, near;
			
			goo.world.process();
			
			var cameraEntity = goo.world.entityManager.getEntityByName('Camera');
			var camScript = cameraEntity.scriptComponent.scripts[0];			
			
			var entities = goo.world.getEntities();
			if (entities.length <= 1) return ;
			
			var overallBoundingVolume;
			for (var i = 0, len = entities.length; i < len; i++) {
				entity = entities[i];
				mrc = entity.meshRendererComponent;
				if (mrc && mrc.worldBound) {
					if (overallBoundingVolume ) {
						overallBoundingVolume.merge(mrc.worldBound);
					} else {
						overallBoundingVolume = mrc.worldBound.clone();
					}
				}
			}
			
			var size;
			if (overallBoundingVolume.radius) {
				size = overallBoundingVolume.radius;
			} else {
				size = Math.max(overallBoundingVolume.xExtent, overallBoundingVolume.yExtent, overallBoundingVolume.zExtent);
			}
			if (size > 0) {
				camScript.lookAtPoint.setv(overallBoundingVolume.center);
				length = size * 2.5;
				if (true || length > camScript.targetSpherical.x) {
					camScript.spherical.x = length;
					camScript.targetSpherical.x = length;
					camScript.zoomSpeed = length * 0.004;
					camScript.dirty = true;
				}
				camScript.maxZoomDistance = length * 2;
				
				near = Math.max(length / 1000, 0.1);
				far = length * 3;

				//camScript.dirty = true; ///
				return cameraEntity.cameraComponent.camera.setFrustumPerspective(null, null, near, far);
			}
		};
	});
});
