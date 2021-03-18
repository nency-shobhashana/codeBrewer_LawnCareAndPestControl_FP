// Thank you message alert
function tyAlert() {
	alert("Thank you for your intrest. we will contact you very soon.")
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

document.getElementById("defaultOpen").click();
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


