import MainVision from "./MainVision.js";
import SunEclipse from "./SunEclipse.js";
if (!BABYLON.Engine.isSupported()) {
    window.alert("Browser not supported");
} else {
    // 初始化场景要素
    var canvas0 = document.getElementById("overallCanvas");
    var canvas1 = document.getElementById("renderCanvas");
    //var canvas2 = document.getElementById("moonCanvas");
    var engine0 = new BABYLON.Engine(canvas0, true);
    var scene0 = new BABYLON.Scene(engine0);
    var engine1 = new BABYLON.Engine(canvas1, true);
    var scene1 = new BABYLON.Scene(engine1);
    //var engine2 = new BABYLON.Engine(canvas2, true);
    //var scene2 = new BABYLON.Scene(engine2);

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

    //var camera2 = new BABYLON.ArcRotateCamera(
    //  "camera2",
    //  0,
    //  0,
    //  10,
    //  BABYLON.Vector3.Zero(),
    //  scene2
    //);
    //camera2.attachControl(canvas2, true);

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
    mainvision.Building();
    suneclipse.Building();
    // 将canvas转换为video
    const video = document.getElementById("video");

    // Create a MediaStream object from the canvas
    const stream = canvas1.captureStream();

    // Create a new MediaRecorder instance for recording video
    const recorder = new MediaRecorder(stream);

    // Create an array to store the recorded video chunks
    var chunks = [];

    // Listen for dataavailable event which is triggered when a video chunk is available
    recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    });

    // Listen for stop event which is triggered when recording has stopped
    recorder.addEventListener("stop", () => { });

    // Start recording the canvas
    recorder.start();

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
    }, 2000);

    //必须要video的metadata加载完成后才能进入画中画
    video.addEventListener("loadedmetadata", () => {
        btn.addEventListener("click", () => {
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

    // setUpCameraMovingPattern(camera0, scene0);

    // Resize
    window.addEventListener("resize", function () {
        engine0.resize();
    });
}
