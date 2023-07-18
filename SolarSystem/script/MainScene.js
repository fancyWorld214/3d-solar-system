import MainVision from "./MainVision.js";
import SunEclipse from "./SunEclipse.js";
import MoonEclipse from "./MoonEclipse.js";
if (!BABYLON.Engine.isSupported()) {
    window.alert("Browser not supported");
} else {
    // 初始化场景要素
    var canvas0 = document.getElementById("overallCanvas");
    var canvas1 = document.getElementById("renderCanvas");
    var canvas2 = document.getElementById("moonCanvas");
    var engine0 = new BABYLON.Engine(canvas0, true);
    var scene0 = new BABYLON.Scene(engine0);
    var engine1 = new BABYLON.Engine(canvas1, true);
    var scene1 = new BABYLON.Scene(engine1);
    var engine2 = new BABYLON.Engine(canvas2, true);
    var scene2 = new BABYLON.Scene(engine2);

    // 配置相机
    var camera1 = new BABYLON.ArcRotateCamera(
        "camera1",
        0,
        0,
        10,
        BABYLON.Vector3.Zero(),
        scene1
    );
    camera1.attachControl(canvas1, true);

    var camera2 = new BABYLON.ArcRotateCamera(
        "camera2",
        0,
        0,
        10,
        BABYLON.Vector3.Zero(),
        scene2
    );
    camera2.attachControl(canvas2, true);

    var camera0 = new BABYLON.ArcRotateCamera(
        "ArcRotateCamera",
        -Math.PI / 4.0,
        0.25 * Math.PI,
        1.5,
        new BABYLON.Vector3(0, 0, 0),
        scene0
    );
    // Attach the camera to the canvas
    camera0.attachControl(canvas0, true);

    // 配置场景
    var mainvision = new MainVision(canvas0, engine0, scene0, camera0);
    var suneclipse = new SunEclipse(canvas1, engine1, scene1, camera1);
    var mooneclipse = new MoonEclipse(canvas2, engine2, scene2, camera2);
    mainvision.Building();
    suneclipse.Building();
    mooneclipse.Building();

    // 将canvas转换为video
    const video = document.getElementById("video");
    const video2 = document.getElementById("video2");

    // Create a MediaStream object from the canvas
    const stream = canvas1.captureStream();
    const stream2 = canvas2.captureStream();

    // Create a new MediaRecorder instance for recording video
    const recorder = new MediaRecorder(stream);
    const recorder2 = new MediaRecorder(stream2);

    // Create an array to store the recorded video chunks
    var chunks = [];
    var chunks2 = [];

    // Listen for dataavailable event which is triggered when a video chunk is available
    recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    });
    recorder2.addEventListener("dataavailable", (event) => {
        chunks2.push(event.data);
    });

    // Listen for stop event which is triggered when recording has stopped
    recorder.addEventListener("stop", () => { });
    recorder2.addEventListener("stop", () => { });

    // Start recording the canvas
    recorder.start();
    recorder2.start();

    // Stop recording after 5 seconds (adjust this according to your needs)
    setInterval(() => {
        // Create a Blob object from the recorded chunks
        const blob = new Blob(chunks, { type: "video/webm" });
        recorder.stop();
        // Set the source of the video element to the recorded video
        const videoURL = URL.createObjectURL(blob);
        video.src = videoURL;
        chunks = [];
        recorder.start();
    }, 50);
    setInterval(() => {
        // Create a Blob object from the recorded chunks
        const blob = new Blob(chunks2, { type: "video/webm" });
        recorder2.stop();
        // Set the source of the video element to the recorded video
        const videoURL = URL.createObjectURL(blob);
        video2.src = videoURL;
        chunks2 = [];
        recorder2.start();
    }, 50);

    //必须要video的metadata加载完成后才能进入画中画
    video.addEventListener("loadedmetadata", () => {
        btn_1.addEventListener("click", () => {
            video
                .requestPictureInPicture()
                .then(() => {
                    // 成功进入画中画模式
                })
                .catch((error) => {
                    // 处理错误
                    console.error("Failed to enter picture-in-picture mode:", error);
                });
        });
    });
    video2.addEventListener("loadedmetadata", () => {
        btn_2.addEventListener("click", () => {
            video2
                .requestPictureInPicture()
                .then(() => {
                    // 成功进入画中画模式
                })
                .catch((error) => {
                    // 处理错误
                    console.error("Failed to enter picture-in-picture mode:", error);
                });
        });
    });

    // setUpCameraMovingPattern(camera0, scene0);

    // Resize
    window.addEventListener("resize", function () {
        engine0.resize();
    });
}
