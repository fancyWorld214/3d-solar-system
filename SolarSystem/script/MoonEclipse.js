export default class SunEclipse {
    constructor(canvas, engine, scene, camera) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }
    setUp(engine, scene, canvas, camera) {

        var diameterScale = 20;
        var sun_diameter = 1.0 * diameterScale;
        var earth_diameter = 0.2 * diameterScale;
        var moon_diameter = 0.15 * diameterScale;

        var distanceScale = 800;
        var earth_distance = 0.1 * distanceScale;
        var moon_distance = 0.066 * distanceScale;

        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        var sun = BABYLON.Mesh.CreateSphere("Sun", 10, sun_diameter, scene);
        var earth = BABYLON.Mesh.CreateSphere("Earth", 30, earth_diameter, scene);
        var moon = BABYLON.Mesh.CreateSphere("Moon", 20, moon_diameter, scene);

        camera.parent = sun;

        var material1 = new BABYLON.StandardMaterial("default1", scene);
        material1.diffuseTexture = new BABYLON.Texture("assets/earth.jpg", scene);
        material1.specularColor = new BABYLON.Color3(0, 0, 0);
        material1.emissiveColor = new BABYLON.Color3(0, 0, 0);
        material1.diffuseTexture.vScale = -1;
        material1.diffuseTexture.uScale = -1;

        var material2 = new BABYLON.StandardMaterial("default2", scene);
        material2.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
        material2.specularColor = new BABYLON.Color3(0, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0, 0, 0);
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
        light.shadowEnabled = true; //设置阴影可投射

        sun.receiveShadows = true;
        moon.receiveShadows = true;
        earth.receiveShadows = true;
        var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
        //设置为可接收阴影
        shadowGenerator.addShadowCaster(moon);
        shadowGenerator.addShadowCaster(earth);
        shadowGenerator.addShadowCaster(sun);
        shadowGenerator.blurScale = 5;
        //使用过滤器使阴影过渡更平滑
        shadowGenerator.usePoissonSampling = true; // Enable Poisson sampling for smoother shadows
        shadowGenerator.useKernelBlur = true; // Enable kernel blur for smoother shadows


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
        var moonOrbitRadius = earth_distance - moon_distance;
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
            /*var moon_tiltAngle = BABYLON.Tools.ToRadians(-5.15);
            moonSpeed = ((elapsed_t % (einUmlauf)) * 360) / (27.3 * (einUmlauf / 365.24));
            var moonradians = moonSpeed * Math.PI / 180;
            moon.position.x = (Math.cos(moonradians) * moonOrbitRadius) + earth.position.x;
            moon.position.z = (Math.sin(moonradians) * moonOrbitRadius) * Math.cos(-5.15 * Math.PI / 180) + earth.position.z;
            moon.position.y = (Math.sin(moonradians) * moonOrbitRadius) * Math.sin(-5.15 * Math.PI / 180) + earth.position.y;
            moon.rotation.y = radians * 27 + moon_tiltAngle;*/
            var moon_tiltAngle = BABYLON.Tools.ToRadians(-5.15);
            //设置椭圆半长轴和半短轴
            var moonOrbitRadiusX = 30; // semi-major axis length in x-direction
            var moonOrbitRadiusZ = 30; // semi-minor axis length in z-direction

            moonSpeed = ((elapsed_t % (einUmlauf)) * 360) / (27.3 * (einUmlauf / 365.24)) * 0.5;
            var moonradians = moonSpeed * Math.PI / 180;

            moon.position.x = (Math.cos(moonradians) * moonOrbitRadiusX) + earth.position.x;
            moon.position.z = (Math.sin(moonradians) * moonOrbitRadiusZ) + earth.position.z;
            moon.position.y = (Math.sin(moonradians) * moonOrbitRadius) * Math.sin(-5.15 * Math.PI / 180) + earth.position.y;
            moon.rotation.y = moonradians + moon_tiltAngle;
        };

        camera.fov = 0.2;
        //设置相机位置
        function updateCamera() {
            var midpoint = BABYLON.Vector3.Lerp(earth.position, moon.position, 0.2);

            // Set the camera's position to the midpoint
            camera.position = midpoint;
            // Set the camera's target to always look at the Sun
            camera.setTarget(moon.position);
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
