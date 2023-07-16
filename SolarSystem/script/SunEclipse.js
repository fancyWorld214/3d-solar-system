export default class SunEclipse {
    constructor(canvas, engine, scene, camera) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }
    setUp(engine, scene, canvas, camera) {
        //diameterScale
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

        earth.material = material1;
        moon.material = material2;
        sun.material = material3;

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

        var earthSpeed = 0;
        var moonSpeed = 0;
        var earthOrbitRadius = earth_distance;
        var moonOrbitRadius = moon_distance;
        scene.beforeRender = function () {
            var incremental = false;
            var incremental_buggy = false;

            var d = new Date();
            var time = d.getTime(); // get milliseconds since 1970
            var elapsed_t = time - startTime; // milliseconds since start
            var delta_t = lastTime - time; // milliseconds since last frame
            lastTime = time;

            var min2ms = 1000.0 * 60.0; // milliseconds in minutes
            var einUmlauf = 1 * min2ms;

            // Update earth position and rotation
            earthSpeed = ((elapsed_t % einUmlauf) * 360) / einUmlauf;
            var radians = (earthSpeed * Math.PI) / 180;
            earth.position.x = Math.cos(radians) * earthOrbitRadius;
            earth.position.z = Math.sin(radians) * earthOrbitRadius;

            earth.rotation.y = (elapsed_t * (360 * 365.24)) / min2ms / 1000;

            // Update moon position and rotation
            moonSpeed =
                ((elapsed_t % einUmlauf) * 360) / (27.3 * (einUmlauf / 365.24));
            var moonradians = (moonSpeed * Math.PI) / 180;
            moon.position.x =
                Math.cos(moonradians) * moonOrbitRadius + earth.position.x;
            moon.position.z =
                Math.sin(moonradians) * moonOrbitRadius + earth.position.z;

            moon.rotation.y = (elapsed_t * (360 * 27.3)) / min2ms;
        };

        camera.fov = 0.5;
        function updateCamera() {
            // Calculate the direction from the Earth to the Sun
            var direction = BABYLON.Vector3.Normalize(
                earth.position.subtract(sun.position)
            );
            //console.log(`earth.position: ${earth.position}`)
            //console.log(`camera: ${camera}`)
            // Set the camera's position relative to the Earth (adjust this value based on your desired camera distance)
            camera.position = earth.position.add(direction.scale(0.8));

            // Set the camera's target to always look at the Sun
            camera.setTarget(sun.position);
        }

        // Register the update function to be called every frame
        scene.registerBeforeRender(updateCamera);

        engine.runRenderLoop(function () {
            scene.render();
        });
    }
    Building() {
        if (!BABYLON.Engine.isSupported()) {
            window.alert("Browser not supported");
        } else {
            // 初始化场景要素
            // 配置场景
            this.setUp(this.engine, this.scene, this.canvas, this.camera);
            //this.setUpCameraMovingPattern(this.camera, this.scene);
            // window.addEventListener("resize", function () {
            //     this.engine.resize();
            // });
        }
    }
}
