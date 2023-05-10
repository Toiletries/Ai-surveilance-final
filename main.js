status=""
objects=[]
function preload(){
    video=createVideo("video.mp4")
}
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video.hide()
}
function start(){
objectDetector=ml5.objectDetector("cocossd",modelLoaded)
document.getElementById("status").innerHTML="status:Object Is Detecting"
}
function modelLoaded(){
    console.log("modelLoaded")
    video.loop()
    video.speed(1)
    video.volume(0)
    status=true
}
function gotResults(error,results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects=results
    }
}
function draw(){
    image(video,0,0,600,500)
    if (status !="") {
        objectDetector.detect(video,gotResults)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status:Object Is Detected"
            document.getElementById("number_of_objects").innerHTML="number_of_objects detected is:"+ objects.length
fill("red")
percent= floor(objects[i].confidence *100)
text(objects[i].label +percent+"%",objects[i].x,objects[i].y)
noFill()
stroke("red")
rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width)
        }
    }
}