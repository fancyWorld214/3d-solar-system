export default class MainVision {
    constructor(canvas, engine, scene, camera) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }
    setUp(engine, scene, canvas, camera) {

        var diameterScale = 20;
        var sun_diameter = 1.5 * diameterScale;
        var mercury_diameter = 0.3 * diameterScale;
        var venus_diameter = 0.35 * diameterScale;
        var earth_diameter = 0.5 * diameterScale;
        var moon_diameter = 0.15 * diameterScale;
        var mars_diameter = 0.4 * diameterScale;
        var jupiter_diameter = 0.9 * diameterScale;
        var saturn_diameter = 0.85 * diameterScale;
        var uranus_diameter = 0.65 * diameterScale;
        var neptune_diameter = 0.6 * diameterScale;



        var distanceScale = 800;
        var mercury_distance = 0.03 * distanceScale;
        var venus_distance = 0.05 * distanceScale;
        var earth_distance = 0.08 * distanceScale;
        var moon_distance = 0.066 * distanceScale;
        var mars_distance = 0.1 * distanceScale;
        var jupiter_distance = 0.13 * distanceScale;
        var saturn_distance = 0.17 * distanceScale;
        var uranus_distance = 0.21 * distanceScale;
        var neptune_distance = 0.24 * distanceScale;


        //Bonusteil:3
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        var sun = BABYLON.Mesh.CreateSphere("Sun", 10, sun_diameter, scene);
        var mercury = BABYLON.Mesh.CreateSphere("Mercury", 30, mercury_diameter, scene);
        var venus = BABYLON.Mesh.CreateSphere("Venus", 30, venus_diameter, scene);
        var earth = BABYLON.Mesh.CreateSphere("Earth", 30, earth_diameter, scene);
        var moon = BABYLON.Mesh.CreateSphere("Moon", 20, moon_diameter, scene);


        camera.parent = sun;

        //Bonusteil:2
        var mars = BABYLON.Mesh.CreateSphere("Mars", 40, mars_diameter, scene);
        var jupiter = BABYLON.Mesh.CreateSphere("Jupiter", 50, jupiter_diameter, scene);
        var saturn = BABYLON.Mesh.CreateSphere("Saturn", 50, saturn_diameter, scene);
        var uranus = BABYLON.Mesh.CreateSphere("Uranus", 60, uranus_diameter, scene);
        var neptune = BABYLON.Mesh.CreateSphere("Neptune", 60, neptune_diameter, scene);


        var material1 = new BABYLON.StandardMaterial("default1", scene);
        material1.diffuseTexture = new BABYLON.Texture("assets/earth.jpg", scene);
        material1.specularColor = new BABYLON.Color3(0, 0, 0);
        material1.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        material1.diffuseTexture.vScale = -1;
        material1.diffuseTexture.uScale = -1;

        var material2 = new BABYLON.StandardMaterial("default2", scene);
        material2.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
        material2.specularColor = new BABYLON.Color3(0, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        material1.diffuseTexture.vScale = -1;
        material1.diffuseTexture.uScale = -1;

        var material3 = new BABYLON.StandardMaterial("default3", scene);
        material3.diffuseTexture = new BABYLON.Texture("assets/sun.jpg", scene);
        material3.specularColor = new BABYLON.Color3(0, 0, 0);
        material3.emissiveColor = new BABYLON.Color3(1, 1, 1);

        var material4 = new BABYLON.StandardMaterial("default1", scene);
        material4.diffuseTexture = new BABYLON.Texture("assets/mars.jpg", scene);
        material4.specularColor = new BABYLON.Color3(0, 0, 0);
        material4.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
        material4.diffuseTexture.vScale = -1;
        material4.diffuseTexture.uScale = -1;

        var material5 = new BABYLON.StandardMaterial("default1", scene);
        material5.diffuseTexture = new BABYLON.Texture("assets/jupiter.jpg", scene);
        material5.specularColor = new BABYLON.Color3(0, 0, 0);
        material5.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        material5.diffuseTexture.vScale = -1;
        material5.diffuseTexture.uScale = -1;

        var material6 = new BABYLON.StandardMaterial("default1", scene);
        material6.diffuseTexture = new BABYLON.Texture("assets/neptune.png", scene);
        material6.specularColor = new BABYLON.Color3(0, 0, 0);
        material6.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        material6.diffuseTexture.vScale = -1;
        material6.diffuseTexture.uScale = -1;

        var material7 = new BABYLON.StandardMaterial("default1", scene);
        material7.diffuseTexture = new BABYLON.Texture("assets/mercury.jpg", scene);
        material7.specularColor = new BABYLON.Color3(0, 0, 0);
        material7.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material7.diffuseTexture.vScale = -1;
        material7.diffuseTexture.uScale = -1;

        var material8 = new BABYLON.StandardMaterial("default1", scene);
        material8.diffuseTexture = new BABYLON.Texture("assets/venus.jpg", scene);
        material8.specularColor = new BABYLON.Color3(0, 0, 0);
        material8.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material8.diffuseTexture.vScale = -1;
        material8.diffuseTexture.uScale = -1;

        var material9 = new BABYLON.StandardMaterial("default1", scene);
        material9.diffuseTexture = new BABYLON.Texture("assets/uranus.jpg", scene);
        material9.specularColor = new BABYLON.Color3(0, 0, 0);
        material9.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        material9.diffuseTexture.vScale = -1;
        material9.diffuseTexture.uScale = -1;


        // 创建光环材质
        var ringMaterial = new BABYLON.StandardMaterial("RingMaterial", scene);
        ringMaterial.diffuseTexture = new BABYLON.Texture("assets/saturnring.jpg", scene);
        ringMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); // 设置光环颜色
        ringMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // 设置光环高光颜色
        ringMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // 设置光环自发光颜色
        ringMaterial.alpha = 0.2; // 设置光环透明度


        // 创建光环模型
        // 定义同心环的内外半径和厚度
        var innerRadius = 20;
        var outerRadius = 45;
        var thickness = 0.1;
        var tessellation = 64;

        // 创建同心环模型
        var disc = BABYLON.MeshBuilder.CreateDisc("disc", {
            radius: innerRadius, // 外半径
            tessellation: tessellation,
            arc: 2 * Math.PI, // 圆环的完整弧度
            updatable: false
        }, scene);

        var ring = BABYLON.MeshBuilder.CreateDisc("ring", {
            radius: innerRadius, // 内半径
            tessellation: tessellation,
            arc: 2 * Math.PI, // 圆环的完整弧度
            updatable: false
        }, scene);

        ring.material = ringMaterial;
        disc.isInFrustum = function () { // 设置遮罩的裁剪
            var frustumPlanes = scene._frustumPlanes;
            for (var i = 0; i < 6; i++) {
                if (frustumPlanes[i].dotCoordinate(ring.absolutePosition) < 0) {
                    return false;
                }
            }
            return true;
        };

        // 将光环模型旋转90度，使其变为横向
        ring.rotation.x = Math.PI / 2;
        disc.rotation.x = Math.PI / 2;
        disc.parent = saturn;
        ring.parent = saturn; // 将遮罩设置为土星模型的子网格





        var material10 = new BABYLON.StandardMaterial("default1", scene);
        material10.diffuseTexture = new BABYLON.Texture("assets/saturn.jpg", scene);
        material10.specularColor = new BABYLON.Color3(0, 0, 0);
        material10.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        material10.diffuseTexture.vScale = -1;
        material10.diffuseTexture.uScale = -1;




        earth.material = material1;
        moon.material = material2;
        sun.material = material3;
        mars.material = material4;
        jupiter.material = material5;
        neptune.material = material6;
        mercury.material = material7;
        venus.material = material8;
        uranus.material = material9;
        saturn.material = material10;
        ring.material = ringMaterial;


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

        // Set initial mercury position
        mercury.position.x = mercury_distance;
        mercury.position.y = 0.0;
        mercury.position.z = 0.0;

        // Set initial venus position
        venus.position.x = venus_distance;
        venus.position.y = 0.0;
        venus.position.z = 0.0;


        // Set initial earth position
        earth.position.x = earth_distance;
        earth.position.y = 0.0;
        earth.position.z = 0.0;

        // Set initial moon position
        moon.position.x = moon_distance;
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

        // Set initial saturn position
        saturn.position.x = saturn_distance;
        saturn.position.y = earth.position.y;
        saturn.position.z = earth.position.z;

        ring.position = new BABYLON.Vector3(0, 0, 0);

        // Set initial uranus position
        uranus.position.x = uranus_distance;
        uranus.position.y = earth.position.y;
        uranus.position.z = earth.position.z;


        var earthSpeed = 0;
        var moonSpeed = 0;
        var earthOrbitRadius = earth_distance;
        var moonOrbitRadius = earth_distance - moon_distance;
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

            var rotateScale = 365;

            // Update earth position and rotation
            earthSpeed = ((elapsed_t) * 360) / einUmlauf;
            var radians = 10 * earthSpeed * Math.PI / 180;
            earth.position.x = Math.cos(radians) * earthOrbitRadius;
            earth.position.z = Math.sin(radians) * earthOrbitRadius;

            earth.rotation.y = ((elapsed_t) * (360 / 365.24) * rotateScale) / min2ms / 1000;


            // Update moon position and rotation
            moonSpeed = ((elapsed_t % (einUmlauf)) * 360) / (27.3 * (einUmlauf / 365.24));
            var moonradians = moonSpeed * Math.PI / 180;
            moon.position.x = (Math.cos(moonradians) * moonOrbitRadius) + earth.position.x;
            moon.position.z = (Math.sin(moonradians) * moonOrbitRadius) + earth.position.z;
            moon.rotation.y = ((elapsed_t) * (360 / 27.3) * rotateScale) / min2ms;

            // Update other planets position and rotation
            mercury.position.x = Math.cos(radians * 365 / 87) * mercury_distance;
            mercury.position.z = Math.sin(radians * 365 / 87) * mercury_distance;
            mercury.rotation.y = ((elapsed_t) * (360 / 58) * rotateScale) / min2ms / 1000;

            venus.position.x = Math.cos(radians * 365 / 224) * venus_distance;
            venus.position.z = Math.sin(radians * 365 / 224) * venus_distance;
            venus.rotation.y = ((elapsed_t) * (360 / 243) * rotateScale) / min2ms / 1000;

            mars.position.x = Math.cos(radians * 365 / 686) * mars_distance;
            mars.position.z = Math.sin(radians * 365 / 686) * mars_distance;
            mars.rotation.y = ((elapsed_t) * (360 / 1) * rotateScale) / min2ms / 1000;

            jupiter.position.x = Math.cos(radians * 365 / 4332) * jupiter_distance;
            jupiter.position.z = Math.sin(radians * 356 / 4332) * jupiter_distance;
            jupiter.rotation.y = ((elapsed_t) * (360 / 0.41) * rotateScale) / min2ms / 1000;

            saturn.position.x = Math.cos(radians / 29.5) * saturn_distance;
            saturn.position.z = Math.sin(radians / 29.5) * saturn_distance;
            saturn.rotation.y = ((elapsed_t) * (360 / 0.426) * rotateScale) / min2ms / 1000;

            ring.position = new BABYLON.Vector3(0, 0, 0);
            disc.position = new BABYLON.Vector3(0, 0, 0);

            uranus.position.x = Math.cos(radians / 84) * uranus_distance;
            uranus.position.z = Math.sin(radians / 84) * uranus_distance;
            uranus.rotation.y = ((elapsed_t) * (360 / 0.426) * rotateScale) / min2ms / 1000;

            neptune.position.x = Math.cos(radians / 164) * neptune_distance;
            neptune.position.z = Math.sin(radians / 164) * neptune_distance;
            neptune.rotation.y = ((elapsed_t) * (360 / 0.6713) * rotateScale) / min2ms / 1000;

            //console.log("Earth position: " + moon.position);
            //console.log(BABYLON.Tools.GetFps().toFixed() + " fps");
        };
        camera.fov = 0.8;
        camera.position = new BABYLON.Vector3(400, 150, 0);


        engine.runRenderLoop(function () {
            scene.render();
        }
        );
    }

    setUpCameraMovingPattern(camera, scene) { // Define the movement speed for the camera
        var cameraSpeed = 0.1;
        var rotateSpeed = 0.01;
        // Add event listeners to detect key presses

        var keys = {};

        window.addEventListener("keydown", function (event) {
            var keyCode = event.keyCode;

            // Store the pressed key in the 'keys' object
            keys[keyCode] = true;

            // Move forward (W key)
            if (keys[87]) { // W key
                if (keys[16]) {
                    cameraSpeed = 3;
                }
                else {
                    cameraSpeed = 0.5;
                }
                moveCameraForward();
            }

            // Move backward (S key)
            if (keys[83]) { // S key
                if (keys[16]) {
                    cameraSpeed = 3;
                }
                else {
                    cameraSpeed = 0.5;
                }
                moveCameraBackward();
            }

            // Move left (A key)
            if (keys[65]) { // A key
                if (keys[16]) {
                    rotateSpeed = 0.05;
                }
                else {
                    rotateSpeed = 0.01;
                }
                moveCameraLeft();
            }

            // Move right (D key)
            if (keys[68]) { // D key
                if (keys[16]) {
                    rotateSpeed = 0.05;
                }
                else {
                    rotateSpeed = 0.01;
                }
                moveCameraRight();
            }

            // Move towards Sun (Home key)
            if (keys[36]) {
                moveCameraTowardsSun();
            }
        });

        window.addEventListener("keyup", function (event) {
            var keyCode = event.keyCode;

            // Remove the released key from the 'keys' object
            delete keys[keyCode];
        });

        function moveCameraForward() {
            var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
            var cur_position = camera.position;
            var new_position = new BABYLON.Vector3(cur_position.x + cameraSpeed * direction.x,
                cur_position.y + cameraSpeed * direction.y, cur_position.z + cameraSpeed * direction.z);
            console.log(cameraSpeed);
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