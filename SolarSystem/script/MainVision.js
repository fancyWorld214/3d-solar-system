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
        var mars_diameter = 0.4* diameterScale;
        var jupiter_diameter = 0.9 * diameterScale;
        var saturn_diameter = 0.85 *diameterScale;
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




        //Bonusteil:2
        var mars = BABYLON.Mesh.CreateSphere("Mars", 40, mars_diameter, scene);
        var jupiter = BABYLON.Mesh.CreateSphere("Jupiter", 50, jupiter_diameter, scene);
        var saturn = BABYLON.Mesh.CreateSphere("Saturn", 50, saturn_diameter, scene);
        var uranus = BABYLON.Mesh.CreateSphere("Uranus", 60, uranus_diameter, scene);
        var neptune = BABYLON.Mesh.CreateSphere("Neptune", 60, neptune_diameter, scene);

        // 创建一个地球轨道
        var earth_torusRadius = earth_distance; // 圆环的半径，根据需要调整
        var mercury_torusRadius = mercury_distance; // 圆环的半径，根据需要调整
        var venus_torusRadius = venus_distance; // 圆环的半径，根据需要调整
        var mars_torusRadius = mars_distance; // 圆环的半径，根据需要调整
        var jupiter_torusRadius = jupiter_distance; // 圆环的半径，根据需要调整
        var saturn_torusRadius = saturn_distance; // 圆环的半径，根据需要调整
        var uranus_torusRadius = uranus_distance; // 圆环的半径，根据需要调整
        var neptune_torusRadius = neptune_distance; // 圆环的半径，根据需要调整
        var torusThickness = 0.1; // 圆环的厚度，根据需要调整
        var torusSegments = 200; // 圆环的分段数，根据需要调整

        // 使用 TorusBuilder 创建圆环轨道
        var earth_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
        diameter: earth_torusRadius * 2,
        thickness: torusThickness,
        tessellation: torusSegments,
        }, scene);

        // 创建一个月球轨道
        var moon_torusRadius = earth_distance-moon_distance; // 圆环的半径，根据需要调整
        var moon_torusThickness = 0.1; // 圆环的厚度，根据需要调整
        var moon_torusSegments = 640; // 圆环的分段数，根据需要调整

        // 使用 TorusBuilder 创建圆环轨道
        var moon_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
        diameter: moon_torusRadius * 2,
        thickness: moon_torusThickness,
        tessellation: moon_torusSegments,
        }, scene);

        // 定义倾斜角度（以弧度为单位）
        var moon_tiltAngle = BABYLON.Tools.ToRadians(6.687); // 倾斜角度为 30 度，根据需要调整

        // 倾斜月球轨道
        moon_torus.rotation.x = moon_tiltAngle;

        // 使用 TorusBuilder 创建圆环轨道
        var mercury_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: mercury_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var venus_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: venus_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var mars_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: mars_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var jupiter_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: jupiter_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var saturn_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: saturn_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var uranus_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: uranus_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
        var neptune_torus = BABYLON.MeshBuilder.CreateTorus("orbit", {
            diameter: neptune_torusRadius * 2,
            thickness: torusThickness,
            tessellation: torusSegments,
            }, scene);
                        
                    
        



        // 设置轨道的材质和颜色
        var torusMaterial = new BABYLON.StandardMaterial("orbitMaterial", scene);
        torusMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1); // 调整颜色
        torusMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // 调整颜色

        earth_torus.material = torusMaterial;
        moon_torus.material = torusMaterial;
        mercury_torus.material = torusMaterial;
        venus_torus.material = torusMaterial;
        mars_torus.material = torusMaterial;
        jupiter_torus.material = torusMaterial;
        saturn_torus.material = torusMaterial;
        uranus_torus.material = torusMaterial;
        neptune_torus.material = torusMaterial;

        // 定义倾斜角度（以弧度为单位）
        var earth_tiltAngle = BABYLON.Tools.ToRadians(-22.5); // 倾斜角度为 22.5 度，根据需要调整

        // 创建一个空的变换矩阵
        var transformMatrix = BABYLON.Matrix.Identity();

        // 将变换矩阵设置为倾斜矩阵
        var tiltMatrix = BABYLON.Matrix.RotationX(earth_tiltAngle);
        transformMatrix = tiltMatrix;

        // 应用变换矩阵到球体
        earth.setPivotMatrix(transformMatrix);

        // 定义自转轴的偏移向量
        var axisOffset = new BABYLON.Vector3(0, 1, 0); // 自转轴的偏移向量，根据需要调整

        // 创建自转轴的变换矩阵
        var rotationAxisMatrix = BABYLON.Matrix.Translation(axisOffset.x, axisOffset.y, axisOffset.z);

        // 应用自转轴的变换矩阵到球体的自转
        earth.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), earth_tiltAngle);
        earth.bakeCurrentTransformIntoVertices();

        // 创建自传轴的辅助线
        var rotationAxisHelper = BABYLON.MeshBuilder.CreateLines("rotationAxisHelper", {
            points: [
            new BABYLON.Vector3(0, -10, 0), // 自转轴的起始点
            new BABYLON.Vector3(0, 10, 0) // 自转轴的终点
            ]
        }, scene);
        
        // 设置自传轴的材质和颜色
        var rotationAxisMaterial = new BABYLON.StandardMaterial("rotationAxisMaterial", scene);
        rotationAxisMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0); // 自传轴的颜色，根据需要调整
        rotationAxisHelper.material = rotationAxisMaterial;
  



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
        var moonOrbitRadius = earth_distance-moon_distance;
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
          
            var rotateScale=365;

            sun.rotation.y = -((elapsed_t) * (360 /24.47)*rotateScale) / min2ms / 1000;

            // Update earth position and rotation
            earthSpeed = ((elapsed_t ) * 360) / einUmlauf;
            var radians = 10*earthSpeed * Math.PI / 180;
            earth.position.x = Math.cos(radians) * earthOrbitRadius;
            earth.position.z = Math.sin(radians) * earthOrbitRadius;
            moon_torus.position = earth.position;


            // 定义倾斜角度（以弧度为单位）
            var earth_tiltAngle = BABYLON.Tools.ToRadians(-22.5); // 倾斜角度为 22.5 度，根据需要调整
            var moon_tiltAngle = BABYLON.Tools.ToRadians(-5.15);

            // 定义自转速度
            var rotationSpeed = 1/1000; // 自转速度，根据需要调整

            // 在每个帧更新时执行的函数
            scene.registerBeforeRender(function() {
            // 获取经过的时间
            var deltaTime = scene.getEngine().getDeltaTime();

            // 计算自转角度增量，考虑倾斜角度
            var rotationAngle = (rotationSpeed * deltaTime / 1000) * (2 * Math.PI); // 自转角度增量
            var tiltedRotationAxis = new BABYLON.Vector3(0, Math.cos(earth_tiltAngle), -Math.sin(earth_tiltAngle)); // 经过倾斜的自转轴

            // 绕倾斜自转轴进行自转
            earth.rotate(tiltedRotationAxis, rotationAngle, BABYLON.Space.LOCAL);
            });


            earth.rotation.y = radians*365;



            // Update moon position and rotation
            moonSpeed = ((elapsed_t % (einUmlauf)) * 360) / (27.3 * (einUmlauf / 365.24));
            var moonradians = moonSpeed * Math.PI / 180;
            moon.position.x = (Math.cos(moonradians) * moonOrbitRadius) + earth.position.x;
            moon.position.z = (Math.sin(moonradians) * moonOrbitRadius)*Math.cos(-5.15* Math.PI / 180) + earth.position.z;
            moon.position.y = (Math.sin(moonradians) * moonOrbitRadius)*Math.sin(-5.15* Math.PI / 180) + earth.position.y;
            moon.rotation.y = radians*27+moon_tiltAngle;

            // Update other planets position and rotation
            mercury.position.x = Math.cos(radians * 365/87) * mercury_distance;
            mercury.position.z = Math.sin(radians * 365/87) * mercury_distance;
            mercury.rotation.y = ((elapsed_t) * (360 /58)*rotateScale) / min2ms / 1000;

            venus.position.x = Math.cos(radians * 365/224) * venus_distance;
            venus.position.z = Math.sin(radians * 365/224) * venus_distance;
            venus.rotation.y = ((elapsed_t) * (360 /243)*rotateScale) / min2ms / 1000;

            mars.position.x = Math.cos(radians * 365/686) * mars_distance;
            mars.position.z = Math.sin(radians * 365/686) * mars_distance;
            mars.rotation.y = ((elapsed_t) * (360 /1)*rotateScale) / min2ms / 1000;

            jupiter.position.x = Math.cos(radians * 365/4332) * jupiter_distance;
            jupiter.position.z = Math.sin(radians * 356/4332) * jupiter_distance;
            jupiter.rotation.y = ((elapsed_t) * (360 /0.41)*rotateScale) / min2ms / 1000;

            saturn.position.x = Math.cos(radians /29.5) * saturn_distance;
            saturn.position.z = Math.sin(radians /29.5) * saturn_distance;
            saturn.rotation.y = ((elapsed_t) * (360 /0.426)*rotateScale) / min2ms / 1000;

            ring.position = new BABYLON.Vector3(0, 0, 0); 
            disc.position = new BABYLON.Vector3(0, 0, 0);

            uranus.position.x = Math.cos(radians /84) * uranus_distance;
            uranus.position.z = Math.sin(radians /84) * uranus_distance;
            uranus.rotation.y = ((elapsed_t) * (360 /0.426)*rotateScale) / min2ms / 1000;

            neptune.position.x = Math.cos(radians /164) * neptune_distance;
            neptune.position.z = Math.sin(radians /164) * neptune_distance;
            neptune.rotation.y = ((elapsed_t) * (360 /0.6713)*rotateScale) / min2ms / 1000;

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

            camera.direction = new BABYLON.Vector3(direction.x + cameraSpeed * sideDirection.x,
                direction.y + cameraSpeed * sideDirection.y, direction.z + cameraSpeed * sideDirection.z);
            var new_target = camera.direction + camera.position;
            console.log("succeed");
            camera.setTarget(new_target);
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











