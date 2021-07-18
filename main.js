objects = [];
status = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO)
    video.size(380, 380);
    video.hide();
}

function detect() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById('objects').value;
}

function modelLoaded() {
    console.log('cocossd model has loaded');
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380)

    if (status != "") {
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                object_detector.detect(gotResult);
                document.getElementById('status').innerHTML = "Status: Objects Found";
            } else {
                document.getElementById('status').innerHTML = "Status: Objects Not Found";
            }
        }
    }
}

function gotResult(err, results) {
    if (err) {
        console.log(err);
    } else {
        objects = results;
    }
}