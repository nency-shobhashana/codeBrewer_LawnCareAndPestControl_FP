// responsive menu 

function toggleClass(){
  // get the properties of an element
  var element = document.getElementById("responsive-menu");
  
//  check if the element have class list
  if (element.classList) {
    // add active class if true
   element.classList.toggle("active");
  } else {
   var classes = element.className.split(" ");
   var i = classes.indexOf("active");
  }
 }
 function submenu(){
  // get the properties of an element
  var element = document.getElementById("sub-menu");
  
//  check if the element have class list
  if (element.classList) {
    // add active class if true
   element.classList.toggle("sub-menu");
  } else {
   var classes = element.className.split(" ");
   var i = classes.indexOf("sub-menu");
  }
 }

// Collapse in FAq page
var coll = document.getElementsByClassName("que");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.padding = "0px";
      content.style.maxHeight = null;
    } else {
      content.style.padding = "15px";
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

// Tabs for Service page
if(document.getElementById("defaultOpen") != null && document.getElementById("defaultOpen") != undefined){
  document.getElementById("defaultOpen").click();
}
function serviceCare(evt, services) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(services).style.display = "block";
  evt.currentTarget.className += " active";
}

// clear data from form

function cleardata() {
  document.getElementById("regForm").reset();
  calculateProgress();
}


// Initialize and add the map
function initMap() {
  // The location of Canada
  const Canada = { lat: 56.1304, lng: -106.3468 };
  // The map, centered at Canada
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: Canada,
  });
  // The marker, positioned at Canada
  const marker = new google.maps.Marker({
    position: Canada,
    map: map,
  });
}


