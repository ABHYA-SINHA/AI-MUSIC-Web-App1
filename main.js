song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
   song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Is Intialized");
}
function draw(){
    image(video, 0, 0,600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if(scorRightWrist>0.2)
    {
    circle(rightWristX,rightWristY,20);
   
    if(rightWristY>0 && rightWristY<=100)
    {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
}
        
    if(scorLeftWrist>0.2)
   {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    leftWristY_divide_1000= remove_decimals/1000;
    volume=leftWristY_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume =" + volume;
   }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.lenght>0)
    {
        console.log(results);
        scorRightWrist= results[0].pose.keypoints[10].score;
        scorLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" +scoreRightWrist +"scoreRightWrist =" +scoreRightWrist);

        console.log("scoreLeftWrist =" + scorLeftWrist);
        leftWristX=results[0].pose.leftWristx;
        leftWristY=results[0].pose.leftWristy;
        console.log("leftWristX =" +leftWristX +"leftWristY =" +leftWristY);

        righttWristX=results[0].pose.rightWristx;
        righttWristY=results[0].pose.righttWristy;
        console.log("rightWristX =" +rightWristX +"rightWristY =" +rightWristY);
    }
}