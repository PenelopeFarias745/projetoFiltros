noseX = 0;
noseY = 0;

lipsX = 0;
lipsY = 0;

numberMustache = "hide";
numberLipstick = "hide";

function preload()
{
    img1 = loadImage('https://i.postimg.cc/PJ5LPgn3/mustache.png');
    img2 = loadImage('https://i.postimg.cc/vTrbKnXJ/lips.png');
}

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
  if(numberMustache == 'show')
  {
    if(results.length > 0)
      {
          console.log(results);
          noseX = results[0].pose.nose.x - 60;
          noseY = results[0].pose.nose.y - 30;
          console.log("nariz x = " + results[0].pose.nose.x);
          console.log("nariz y = " + results[0].pose.nose.y);
      }
  }

  if(numberLipstick == 'show')
    {
      if(results.length > 0)
        {
            console.log(results);
            noseX = results[0].pose.nose.x - 30;
            noseY = results[0].pose.nose.y + 20;
            console.log("nariz x = " + results[0].pose.nose.x);
            console.log("nariz y = " + results[0].pose.nose.y);
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet foi carregado');
}

function mustache()
{
  numberMustache = 'show';
  numberLipstick = 'hide';
  console.log('mustache = ' + numberMustache + ' lipstick = ' + numberLipstick);
}

function lipstick()
{
  numberMustache = 'hide';
  numberLipstick = 'show';
  console.log('mustache = ' + numberMustache + ' lipstick = ' + numberLipstick);
}

function draw()
{
  image(video, 0, 0, 300, 300);

  if(numberMustache == 'show')
  {
    image(img1, noseX, noseY, 130, 100);
  }
  if(numberLipstick == 'show')
  {
    image(img2, noseX, noseY, 60, 30);
  }
}
   
function fotografar()
{
  save('filter.png')
}