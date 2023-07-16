    class MainVision{
        constructor(){
            if (!BABYLON.Engine.isSupported()) {
                window.alert('Browser not supported');
            } else {
                // 初始化场景要素
                var canvas = document.getElementById("overallCanvas");                
                var engine = new BABYLON.Engine(canvas0, true);
                var scene = new BABYLON.Scene(engine0);
                var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 4.0, 0.25 * Math.PI, 1.5, new BABYLON.Vector3(0, 0, 0), scene0);
                // Attach the camera to the canvas
                camera.attachControl(canvas0, true);


                this.canvas = canvas;
                this.engine = engine;
                this.scene = scene;
                this.camera = camera;


            
                // 配置场景
                setUp(engine0, scene0, canvas0, camera0, false, "");
                setUp(engine1, scene1, canvas1, camera1, true, "sun");
            
        }
        setUp(engine, scene, canvas, camera, setUpParent, parent) {

            //diameterScale
            var diameterScale = 35;
            this.diameterScale = diameterScale;
            this.sun_diameter = 1.3927 * this.diameterScale;
            this.earth_diameter = 0.12756 * this.diameterScale;
            this.moon_diameter = 5;
            this.mars_diameter = 0.6794 * this.diameterScale;
            this.jupiter_diameter = 14.392 * this.diameterScale;
            this.neptune_diameter = 3.883 * this.diameterScale;
        
            //diatantScale
            var distanceScale = 1;
            this.distanceScale = distanceScale;
            this.earth_distance = 20;
            this.moon_distance = 0.9 * this.distanceScale;
            this.mars_distance = 227.9 * this.distanceScale;
            this.jupiter_distance = 778.6 * this.distanceScale;
            this.neptune_distance = 4495 * this.distanceScale;
        
        
            //Bonusteil:3
            this.skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
            this.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
            this.skyboxMaterial.backFaceCulling = false;
            this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/nebula", scene);
            this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            this.skybox.material = this.skyboxMaterial;

            this.sun = BABYLON.Mesh.CreateSphere("Sun", 1.3927 * diameterScale, 0.65, scene);
            this.earth = BABYLON.Mesh.CreateSphere("Earth", 0.12756 * diameterScale, 0.3, scene);
            this.moon = BABYLON.Mesh.CreateSphere("Moon", 5, 0.075, scene);
        
            if (setUpParent === true) {
                if (parent === "sun") {
                    camera.parent = sun;
                }
            }
        
            //Bonusteil:2
            this.mars = BABYLON.Mesh.CreateSphere("Mars", mars_diameter, 0.25, scene);
            this.jupiter = BABYLON.Mesh.CreateSphere("Jupiter", jupiter_diameter, 0.35, scene);
            this.neptune = BABYLON.Mesh.CreateSphere("Neptune", neptune_diameter, 0.37, scene);
            
        
            var material1 = new BABYLON.StandardMaterial("default1", scene);
            material1.diffuseTexture = new BABYLON.Texture("assets/earth.jpg", scene);
            material1.specularColor = new BABYLON.Color3(0, 0, 0);
            material1.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            material1.diffuseTexture.vScale = -1;
            material1.diffuseTexture.uScale = -1;
            this.material1 = material1;
        
            var material2 = new BABYLON.StandardMaterial("default2", scene);
            material2.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
            material2.specularColor = new BABYLON.Color3(0, 0, 0);
            material2.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            material1.diffuseTexture.vScale = -1;
            material1.diffuseTexture.uScale = -1;
            this.material2 = material2;

            var material3 = new BABYLON.StandardMaterial("default3", scene);
            material3.diffuseTexture = new BABYLON.Texture("assets/sun.jpg", scene);
            material3.specularColor = new BABYLON.Color3(0, 0, 0);
            material3.emissiveColor = new BABYLON.Color3(1, 1, 1);
            this.material3 = material3;

            var material4 = new BABYLON.StandardMaterial("default1", scene);
            material4.diffuseTexture = new BABYLON.Texture("assets/mars.jpg", scene);
            material4.specularColor = new BABYLON.Color3(0, 0, 0);
            material4.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            material4.diffuseTexture.vScale = -1;
            material4.diffuseTexture.uScale = -1;
            this.material4 = material4;
        
            var material5 = new BABYLON.StandardMaterial("default1", scene);
            material5.diffuseTexture = new BABYLON.Texture("assets/jupiter.jpg", scene);
            material5.specularColor = new BABYLON.Color3(0, 0, 0);
            material5.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            material5.diffuseTexture.vScale = -1;
            material5.diffuseTexture.uScale = -1;
            this.material5 = material5;
        
            var material6 = new BABYLON.StandardMaterial("default1", scene);
            material6.diffuseTexture = new BABYLON.Texture("assets/neptune.png", scene);
            material6.specularColor = new BABYLON.Color3(0, 0, 0);
            material6.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            material6.diffuseTexture.vScale = -1;
            material6.diffuseTexture.uScale = -1;
            this.material6 = material6;
        
        
            this.earth.material = material1;
            this.moon.material = material2;
            this.sun.material = material3;
            this.mars.material = material4;
            this.jupiter.material = material5;
            this.neptune.material = material6;
        
            var light = new BABYLON.PointLight("dir01", new BABYLON.Vector3(-0.0, -0.0, 0.0), scene);
            light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);
            light.intensity = 1.0;
            this.light = light;
            scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.1);
        
            this.startTime = Date.now();
            this.lastTime = this.startTime;

            this.sim_year = 1.0; // one simulated year in minutes
            this.sim_month = this.sim_year / (365.24 / 27.3);
            this.sim_day = this.sim_year / 365.24;

            this.moon_local_pos = new BABYLON.Vector3((-1.0) * moon_distance, 0, 0);
        
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
            if (setUpParent === true && parent === "sun") {
                camera.fov = 0.5;
                function updateCamera() {
                    // Calculate the direction from the Earth to the Sun
                    var direction = BABYLON.Vector3.Normalize(earth.position.subtract(sun.position));
                    //console.log(`earth.position: ${earth.position}`)
                    //console.log(`camera: ${camera}`)
                    // Set the camera's position relative to the Earth (adjust this value based on your desired camera distance)
                    camera.position = earth.position.add(direction.scale(0.8));
        
                    // Set the camera's target to always look at the Sun
                    camera.setTarget(sun.position);
                }
        
                // Register the update function to be called every frame
                scene.registerBeforeRender(updateCamera);
            }
        
        
            engine.runRenderLoop(function () {
                scene.render();
            }
            );
        }
    }










// Check support

    // Kamera für VR mit Device Orientation zum Herumschauen 
    //var camera = new BABYLON.DeviceOrientationCamera("ArcRotateCamera", new BABYLON.Vector3(1, 1, 1), scene);
    //camera.setCameraRigMode(20,{interaxialDistance: 0.0637});




    // Show coordinate system, BabylonJS uses left-handed coordinates!
    // x-axis: red, y-axis: yellow, z-axis: green



    // Function to update the camera's position and target


    //scene.activeCamera.attachControl(canvas);
    // Render loop
    // var renderLoop = function () {
    // Start new frame
    //engine.beginFrame();

    //scene.render();

    // Present
    //engine.endFrame();

    // Register new frame
    //BABYLON.Tools.QueueNewFrame(renderLoop);
    //};
    //BABYLON.Tools.QueueNewFrame(renderLoop);

    //canvas1.requestPictureInPicture();
    // 将canvas转换为video
    const video = document.getElementById('video');

    // Create a MediaStream object from the canvas
    const stream = canvas1.captureStream();

    // Create a new MediaRecorder instance for recording video
    const recorder = new MediaRecorder(stream);

    // Create an array to store the recorded video chunks
    var chunks = [];

    // Listen for dataavailable event which is triggered when a video chunk is available
    recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
    });

    // Listen for stop event which is triggered when recording has stopped
    recorder.addEventListener('stop', () => {

    });

    // Start recording the canvas
    recorder.start();

    // Stop recording after 5 seconds (adjust this according to your needs)
    setInterval(() => {

        // Create a Blob object from the recorded chunks
        const blob = new Blob(chunks, { type: 'video/webm' });
        recorder.stop();
        // Set the source of the video element to the recorded video
        const videoURL = URL.createObjectURL(blob);
        video.src = videoURL;
        chunks = [];
        recorder.start();

    }, 2000);

    //必须要video的metadata加载完成后才能进入画中画
    video.addEventListener('loadedmetadata', () => {
        // 在元数据加载完毕后调用 requestPictureInPicture 方法
        // 必须要有用户动作才能触发画中画，不可以直接用代码开启
        btn.addEventListener('click', () => {
            video.requestPictureInPicture()
                .then(() => {
                    // 成功进入画中画模式
                })
                .catch((error) => {
                    // 处理错误
                    console.error('Failed to enter picture-in-picture mode:', error);
                });
        });
    });

    setUpCameraMovingPattern(camera0, scene0);


    // Resize
    window.addEventListener("resize", function () {
        engine0.resize();
    });
};




function setUpCameraMovingPattern(camera, scene) {
    // Define the movement speed for the camera
    var cameraSpeed = 0.1;

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
    });

    // Helper functions to move the camera
    function moveCameraForward() {
        var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
        var cur_position = camera.position;
        camera.position = new BABYLON.Vector3(cur_position.x + cameraSpeed * direction.x,
            cur_position.y + cameraSpeed * direction.y, cur_position.z + cameraSpeed * direction.z);
    }

    function moveCameraBackward() {
        var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
        var cur_position = camera.position;
        camera.position = new BABYLON.Vector3(cur_position.x - cameraSpeed * direction.x,
            cur_position.y - cameraSpeed * direction.y, cur_position.z - cameraSpeed * direction.z);
    }

    function moveCameraLeft() {
        var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
        var sideDirection = BABYLON.Vector3.Cross(direction, camera.upVector);
        var cur_position = camera.position;
        camera.position = new BABYLON.Vector3(cur_position.x + cameraSpeed * sideDirection.x,
            cur_position.y + cameraSpeed * sideDirection.y, cur_position.z + cameraSpeed * sideDirection.z);
        // camera.position.addInPlace(sideDirection.scaleInPlace(-cameraSpeed));
    }

    function moveCameraRight() {
        var direction = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
        var sideDirection = BABYLON.Vector3.Cross(direction, camera.upVector);
        var cur_position = camera.position;
        camera.position = new BABYLON.Vector3(cur_position.x - cameraSpeed * sideDirection.x,
            cur_position.y - cameraSpeed * sideDirection.y, cur_position.z - cameraSpeed * sideDirection.z);
    }
}