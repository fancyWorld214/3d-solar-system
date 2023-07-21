export default class SunEclipse {
    constructor(canvas, engine, scene, camera) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }
    setUp(engine, scene, canvas, camera) {
        //背景
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        //日月直径和距离，实际均为400倍，这里模拟以20倍进行
        var moon_diameter = 5;
        var sun_diameter = (400 / 14.2) * moon_diameter;
        var moon_distance = 20;
        var sun_distance = 20 * moon_distance;

        var sun = BABYLON.Mesh.CreateSphere("Sun", 20, sun_diameter, scene);
        var moon = BABYLON.Mesh.CreateSphere("Moon", 20, moon_diameter, scene);

        var material2 = new BABYLON.StandardMaterial("default2", scene);
        material2.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
        material2.specularColor = new BABYLON.Color3(0, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        // material2.diffuseTexture.vScale = -1;
        // material2.diffuseTexture.uScale = -1;

        var material3 = new BABYLON.StandardMaterial("default3", scene);
        material3.diffuseTexture = new BABYLON.Texture("assets/sun.jpg", scene);
        material3.specularColor = new BABYLON.Color3(0, 0, 0);
        material3.emissiveColor = new BABYLON.Color3(1, 1, 1);

        moon.material = material2;
        sun.material = material3;

        //摄像机参数
        //位置固定在原点，方向固定向太阳
        camera.fov = 0.5;
        camera.position = new BABYLON.Vector3(0, 0, 0);
        function updateCamera() {

            camera.setTarget(sun.position);
        }

        //地球位置（地心系统）(固定)
        //设置太阳位置（地心系统）(固定)
        sun.position.x = sun_distance;
        sun.position.y = 0.0;
        sun.position.z = 0.0;
        //设置月球初始位置
        moon.position.x = moon_distance;
        moon.position.y = 0;
        moon.position.z = 0;


        var light = new BABYLON.PointLight("dir01", sun.position, scene);
        light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);
        light.intensity = 5.0;

        scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.1);
        //更新月球位置
        var startTime = performance.now(); // 当前时间，毫秒
        var lastTime = startTime;

        //月球轨道为椭圆
        var moonMajorSemi = 1.1 * moon_distance;
        var moonMinorSemi = 0.94 * moonMajorSemi;
        var moonFocusSemi = Math.pow(moonMajorSemi * moonMajorSemi
            - moonMinorSemi * moonMinorSemi, 0.5);

        var min = 100;
        var max = -100;
        //模拟进动
        var omega = 1.1;
        var moonSpeed = 0;
        scene.beforeRender = function () {
            var incremental = false;
            var incremental_buggy = false;

            var time = performance.now(); // 当前时间，毫秒
            var elapsed_t = time - startTime;
            var delta_t = time - lastTime; // 渲染上一帧时间
            lastTime = time; //更新lastTime

            var min2ms = 1000.0 * 60.0; // milliseconds in minutes
            var einUmlauf = 1 * min2ms;

            sun.rotation.y = (elapsed_t * 25) / min2ms * 0.1;

            // Update moon position and rotation
            moonSpeed = ((-elapsed_t % einUmlauf) * 360) / (27.3 * (einUmlauf / 365.24)) * 0.1;
            //console.log(moonSpeed);
            var moonRadians = (moonSpeed * Math.PI) / 180;

            // moon.position.x =
            //     Math.cos(moonRadians) * moonMajorSemi - moonFocusSemi;
            // console.log(moonMajorSemi, moonFocusSemi);
            // moon.position.z =
            //     Math.sin(moonRadians) * moonMinorSemi;
            moon.position.x =
                Math.cos(moonRadians) * Math.cos(omega * moonRadians) * moonMajorSemi
                - Math.sin(omega * moonRadians) * Math.sin(moonRadians) * moonMinorSemi - moonFocusSemi;
            moon.position.y =
                0.05 * moon.position.x * Math.sin(moonRadians);
            moon.position.z =
                Math.cos(moonRadians) * Math.sin(omega * moonRadians) * moonMajorSemi
                + Math.cos(omega * moonRadians) * Math.sin(moonRadians) * moonMinorSemi;
            moon.rotation.y = (elapsed_t * (360 * 27.3)) / min2ms;

            if (moon.position.z < 0.1 && moon.position.z > -0.1 && moon.position.x > 0)
                console.log(moon.position.y);


            // if (moon.position.z < 0.1 && moon.position.z > -0.1) {

            //     if (moon.position.x < min && moon.position.x > 0) min = moon.position.x;
            //     if (moon.position.x > max) max = moon.position.x;
            //     console.log("moon", max, "sun", min);
            // }
        };

        // Register the update function to be called every frame
        scene.registerBeforeRender(updateCamera);

        engine.runRenderLoop(function () {
            scene.render();
        })

    }
    Building() {
        if (!BABYLON.Engine.isSupported()) {
            window.alert("Browser not supported");
        } else {
            // 初始化场景要素
            // 配置场景
            this.setUp(this.engine, this.scene, this.canvas, this.camera);
        }
    }
}