/*https://teachablemachine.withgoogle.com/models/JdVCZJ4w0//*/

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:100
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
Webcam.snap(function(data_uri) {
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

});
}
console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eNFICgidi/model.json',modelLoaded);
function modelLoaded(){
console.log('Model Loaded');
}

function speak(){
var synth=window.speechSynthesis;
speak_data_1="The first prediction is"+prediction_1;
speak_data_2="And the second prediction is"+prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}

function check(){

img=document.getElementById("captured_image");
classifier.classify(img,gotresult);
}
function gotresult(error,results){

if(error){
console.error(error);
}
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak();
if(prediction_1=="nice"){
document.getElementById("update_emoji").innerHTML="&#128076;";
}
if(prediction_1=="Approved"){
document.getElementById("update_emoji").innerHTML="&#128077;";
}
if(prediction_1=="Gun"){
        document.getElementById("update_emoji").innerHTML="&#9755;";
}
if(prediction_2=="nice"){
    document.getElementById("update_emoji2").innerHTML="&#128076;";
}
 if(prediction_2=="Approved"){
document.getElementById("update_emoji2").innerHTML="&#128077;";
}
if(prediction_2=="Gun"){
document.getElementById("update_emoji2").innerHTML="&#9755;";
}
}