$(function(){
$("#regForm input").keyup(function() {

var numValid = 0;
$("#regForm input[required]").each(function() {
    if (this.validity.valid) {
        numValid++;
    }
});

var progress = $("#progress"),
    progressMessage = $("#progress-message");

if (numValid == 0) {
    progress.attr("value", "0");
    progressMessage.text("Fill the below form.");
}
if (numValid == 1) {
    progress.attr("value", "12.50");
}
if (numValid == 2) {
    progress.attr("value", "25");
}
if (numValid == 3) {
    progress.attr("value", "37.50");
}
if (numValid == 4) {
    progress.attr("value", "50");
}
if (numValid == 5) {
    progress.attr("value", "62.50");
}
if (numValid == 6) {
    progress.attr("value", "75");
}
if (numValid == 7) {
    progress.attr("value", "87.50");
}
if (numValid == 8) {
    progress.attr("value", "100");
    progressMessage.text("All required field are completed");
}
  
});
});