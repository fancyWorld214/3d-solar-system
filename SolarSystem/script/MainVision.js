export default class MainVision {
    constructor(canvas, engine, scene, camera) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }
    setUp(engine, scene, canvas, camera) {

        var diameterScale = 35;
        var sun_diameter = 1.3927 * diameterScale;
        var earth_diameter = 0.12756 * diameterScale;
        var moon_diameter = 5;
        var mars_diameter = 0.6794 * diameterScale;
        var jupiter_diameter = 14.392 * diameterScale;
        var neptune_diameter = 3.883 * diameterScale;

        var distanceScale = 1;
        // var earth_distance = 149.6 * distanceScale;
        var earth_distance = 20;
        var moon_distance = 0.9 * distanceScale;
        var mars_distance = 227.9 * distanceScale;
        var jupiter_distance = 778.6 * distanceScale;
        var neptune_distance = 4495 * distanceScale;


        //Bonusteil:3
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        var sun = BABYLON.Mesh.CreateSphere("Sun", sun_diameter, 0.65, scene);
        var earth = BABYLON.Mesh.CreateSphere("Earth", earth_diameter, 0.3, scene);
        var moon = BABYLON.Mesh.CreateSphere("Moon", moon_diameter, 0.075, scene);


        camera.parent = sun;

        //Bonusteil:2
        var mars = BABYLON.Mesh.CreateSphere("Mars", mars_diameter, 0.25, scene);
        var jupiter = BABYLON.Mesh.CreateSphere("Jupiter", jupiter_diameter, 0.35, scene);
        var neptune = BABYLON.Mesh.CreateSphere("Neptune", neptune_diameter, 0.37, scene);


        var material1 = new BABYLON.StandardMaterial("default1", scene);
        material1.diffuseTexture = new BABYLON.Texture("assets/earth.jpg", scene);
        material1.specularColor = new BABYLON.Color3(0, 0, 0);
        material1.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material1.diffuseTexture.vScale = -1;
        material1.diffuseTexture.uScale = -1;

        var material2 = new BABYLON.StandardMaterial("default2", scene);
        material2.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
        material2.specularColor = new BABYLON.Color3(0, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material1.diffuseTexture.vScale = -1;
        material1.diffuseTexture.uScale = -1;

        var material3 = new BABYLON.StandardMaterial("default3", scene);
        material3.diffuseTexture = new BABYLON.Texture("assets/sun.jpg", scene);
        material3.specularColor = new BABYLON.Color3(0, 0, 0);
        material3.emissiveColor = new BABYLON.Color3(1, 1, 1);

        var material4 = new BABYLON.StandardMaterial("default1", scene);
        material4.diffuseTexture = new BABYLON.Texture("assets/mars.jpg", scene);
        material4.specularColor = new BABYLON.Color3(0, 0, 0);
        material4.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material4.diffuseTexture.vScale = -1;
        material4.diffuseTexture.uScale = -1;

        var material5 = new BABYLON.StandardMaterial("default1", scene);
        material5.diffuseTexture = new BABYLON.Texture("assets/jupiter.jpg", scene);
        material5.specularColor = new BABYLON.Color3(0, 0, 0);
        material5.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material5.diffuseTexture.vScale = -1;
        material5.diffuseTexture.uScale = -1;

        var material6 = new BABYLON.StandardMaterial("default1", scene);
        material6.diffuseTexture = new BABYLON.Texture("assets/neptune.png", scene);
        material6.specularColor = new BABYLON.Color3(0, 0, 0);
        material6.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material6.diffuseTexture.vScale = -1;
        material6.diffuseTexture.uScale = -1;


        earth.material = material1;
        moon.material = material2;
        sun.material = material3;
        mars.material = material4;
        jupiter.material = material5;
        neptune.material = material6;

        var light = new BABYLON.PointLight("dir01", new BABYLON.Vector3(-0.0, -0.0, 0.0), scene);
        light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);
        light.intensity = 1.0;

        scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.1);

        var d = new Date();
        var startTime = d.getTime();
        var lastTime = startTime;

        var sim_year = 1.0;                         // one simulated year in minutes
        var sim_month = sim_year / (365.24 / 27.3);
        var sim_day = sim_year / 365.24;

        var moon_local_pos = new BABYLON.Vector3((-1.0) * moon_distance, 0, 0);

        //console.log(sun.position);

        // Set initial earth position
        earth.position.x = earth_distance;
        earth.position.y = 0.0;
        earth.position.z = 0.0;

        // Set initial moon position
        moon.position.x = earth.position.x - moon_distance;
        moon.position.y = earth.position.y;
        moon.position.z = earth.position.z;


        // Set initial mars position
        mars.position.x = mars_distance
        mars.position.y = earth.position.y;
        mars.position.z = earth.position.z;


        // Set initial jupiter position
        jupiter.position.x = jupiter_distance;
        jupiter.position.y = earth.position.y;
        jupiter.position.z = earth.position.z;

        // Set initial neptune position
        neptune.position.x = neptune_distance;
        neptune.position.y = earth.position.y;
        neptune.position.z = earth.position.z;


        var earthSpeed = 0;
        var moonSpeed = 0;
        var earthOrbitRadius = earth_distance;
        var moonOrbitRadius = moon_distance;
        scene.beforeRender = function () {
            var incremental = false;
            var incremental_buggy = false;

            var d = new Date();
            var time = d.getTime();        // get milliseconds since 1970
            var elapsed_t = time - startTime;   // milliseconds since start
            var delta_t = lastTime - time;    // milliseconds since last frame
            lastTime = time;

            var min2ms = 1000.0 * 60.0;        // milliseconds in minutes
            var einUmlauf = 1 * min2ms;

            // Update earth position and rotation
            earthSpeed = ((elapsed_t % einUmlauf) * 360) / einUmlauf;
            var radians = earthSpeed * Math.PI / 180;
            earth.position.x = Math.cos(radians) * earthOrbitRadius;
            earth.position.z = Math.sin(radians) * earthOrbitRadius;

            earth.rotation.y = ((elapsed_t) * (360 * 365.24)) / min2ms / 1000;


            // Update moon position and rotation
            moonSpeed = ((elapsed_t % (einUmlauf)) * 360) / (27.3 * (einUmlauf / 365.24));
            var moonradians = moonSpeed * Math.PI / 180;
            moon.position.x = (Math.cos(moonradians) * moonOrbitRadius) + earth.position.x;
            moon.position.z = (Math.sin(moonradians) * moonOrbitRadius) + earth.position.z;

            moon.rotation.y = ((elapsed_t) * (360 * 27.3)) / min2ms;

            // Update other planets position and rotation
            mars.position.x = Math.cos(radians * 1.3) * mars_distance;
            mars.position.z = Math.sin(radians * 1.3) * mars_distance;

            jupiter.position.x = Math.cos(radians * 1.2) * jupiter_distance;
            jupiter.position.z = Math.sin(radians * 1.2) * jupiter_distance;

            neptune.position.x = Math.cos(radians * 0.9) * neptune_distance;
            neptune.position.z = Math.sin(radians * 0.9) * neptune_distance;

            //console.log("Earth position: " + moon.position);
            //console.log(BABYLON.Tools.GetFps().toFixed() + " fps");
        };
        camera.fov = 0.5;

        engine.runRenderLoop(function () {
            scene.render();
        }
        );
    }

    setUpCameraMovingPattern(camera, scene) { // Define the movement speed for the camera
        var cameraSpeed = 0.1;
        var rotateSpeed = 0.01;
        // Add event listeners to detect key presses
        window.addEventListener("keydown", function (event) {
            var keyCode = event.keyCode;

            // Move forward (W key)
            if (keyCode === 87) {
                moveCameraForward();
            }

            // Move backward (S key)
            if (keyCode === 83) {
                moveCameraBackward();
            }

            // Move left (A key)
            if (keyCode === 65) {
                moveCameraLeft();
            }

            // Move right (D key)
            if (keyCode === 68) {
                moveCameraRight();
            }

            // Move right (Home key)
            if (keyCode === 36) {
                moveCameraTowardsSun();
            }
        });

        // Helper functions to move the camera
        function moveCameraForward() {
            var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
            var cur_position = camera.position;
            var new_position = new BABYLON.Vector3(cur_position.x + cameraSpeed * direction.x,
                cur_position.y + cameraSpeed * direction.y, cur_position.z + cameraSpeed * direction.z);

            var sun_position = new BABYLON.Vector3(0, 0, 0);
            var new_distance = BABYLON.Vector3.Distance(new_position, sun_position);
            var sun_diameter = 2.5;
            if (new_distance > 0.55 * sun_diameter) {
                camera.position = new_position;
                var new_target = new BABYLON.Vector3(cur_position.x + direction.x,
                    cur_position.y + direction.y, cur_position.z + direction.z);
                camera.setTarget(new_target);
            }

        }

        function moveCameraBackward() {
            var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
            var cur_position = camera.position;
            var new_position = new BABYLON.Vector3(cur_position.x - cameraSpeed * direction.x,
                cur_position.y - cameraSpeed * direction.y, cur_position.z - cameraSpeed * direction.z);

            var sun_position = new BABYLON.Vector3(0, 0, 0);
            var new_distance = BABYLON.Vector3.Distance(new_position, sun_position);
            var sun_diameter = 2.5;
            if (new_distance > 0.55 * sun_diameter) {
                camera.position = new_position;
                var new_target = new BABYLON.Vector3(cur_position.x + direction.x,
                    cur_position.y + direction.y, cur_position.z + direction.z);
                camera.setTarget(new_target);
            }
        }

        function moveCameraLeft() {
            var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
            var sideDirection = BABYLON.Vector3.Cross(direction, camera.upVector);
            var cur_direction = new BABYLON.Vector3(direction.x + rotateSpeed * sideDirection.x,
                direction.y + rotateSpeed * sideDirection.y, direction.z + rotateSpeed * sideDirection.z);
            camera.direction = cur_direction;
            var cur_position = camera.position;
            var new_target = new BABYLON.Vector3(cur_position.x + cur_direction.x,
                cur_position.y + cur_direction.y, cur_position.z + cur_direction.z);
            camera.setTarget(new_target);
            //console.log(camera.getDirection(BABYLON.Axis.Z));
        }

        function moveCameraRight() {
            var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
            var sideDirection = BABYLON.Vector3.Cross(direction, camera.upVector);
            var cur_direction = new BABYLON.Vector3(direction.x - rotateSpeed * sideDirection.x,
                direction.y - rotateSpeed * sideDirection.y, direction.z - rotateSpeed * sideDirection.z);
            camera.direction = cur_direction;
            var cur_position = camera.position;
            var new_target = new BABYLON.Vector3(cur_position.x + cur_direction.x,
                cur_position.y + cur_direction.y, cur_position.z + cur_direction.z);
            camera.setTarget(new_target);
            //console.log(camera.getDirection(BABYLON.Axis.Z));
        }

        function moveCameraTowardsSun() {
            var cur_position = camera.position;
            var direction = new BABYLON.Vector3(-cur_position.x, -cur_position.y, -cur_position.z);
            var new_direction = BABYLON.Vector3.Normalize(direction);
            var new_target = new BABYLON.Vector3(cur_position.x + new_direction.x,
                cur_position.y + new_direction.y, cur_position.z + new_direction.z);
            camera.setTarget(new_target);
        }
    }
    Building() {
        if (!BABYLON.Engine.isSupported()) {
            window.alert('Browser not supported');
        } else {
            // 初始化场景要素
            // 配置场景
            this.setUp(this.engine, this.scene, this.canvas, this.camera);
            this.setUpCameraMovingPattern(this.camera, this.scene);
            // window.addEventListener("resize", function () {
            //     this.engine.resize();
            // });
        }
    }

}











