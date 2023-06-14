bara_time_song= "";
ham_star_song= "";
scoreLeftWrist= 0;
scoreRightWrist= 0;
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
song_baraTime= "";
song_hamStar="";



function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 530);

    fill("#FF0000");
    stroke("#FF0000");
    song_baraTime = bara_time_song.isPlaying();
    console.log(song_baraTime);

    song_hamStar = ham_star_song.isPlaying();
    console.log(song_hamStar);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        ham_star_song.stop();
        if(song_baraTime == false)
        {
            bara_time_song.play();
        }
        else()
        {
            console.log("Song: bara time");
            document.getElementById("song_id").innerHTML = "Song Name: Bara time";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        bara_time_song.stop();
        if(song_hamStar == false)
        {
            song_hamStar.play();
        }
        else()
        {
            console.log("Song: ham star");
            document.getElementById("song_id").innerHTML = "Song Name: Ham star";
        }
    }

}

function preload()
{
    bara_time_song = loadSound("ham_star.mp3");
    ham_star_song = loadSound("bara_time.mp3");
}

function modelLoaded()
{
    console.log('poseNet is initialized yipee!')
}

function gotPoses(results)
{
   if(results.length > 0)
   {
     console.log(results);

     scoreLeftWrist = results[0].pose.keypoints[9].score;
     console.log(scoreLeftWrist);

     scoreRightWrist = results[0].pose.keypoints[10].score;
     console.log(scoreRightWrist);


     leftWristX = results[0].pose.leftWrist.x;
     leftWristY = results[0].pose.leftWrist.y;
     console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

     rightWristX =  results[0].pose.rightWrist.x;
     rightWristY =  results[0].pose.rightWrist.y;
     console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
   }
}
