let db;
var currentPage = "";
function init(){
console.log("init called");
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

  // Let us open our database
  const DBOpenRequest = window.indexedDB.open("LawnCare", 1);

  DBOpenRequest.onsuccess = function(event) {

	console.log("DBOpenRequest.onsuccess done");
    // store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;
    var path = window.location.pathname;
    currentPage = path.split("/").pop();
    if(currentPage != "login.html"){
        displayUser()
        loadAppointment()
	}
  };

   DBOpenRequest.onerror = function(event) {
        if(currentPage != "login.html"){
		    window.location.href = "login.html";
		}
  };

  DBOpenRequest.onupgradeneeded = function(event) {
    console.log("onupgradeneeded start");
    let db = event.target.result;

    var objectStore = db.createObjectStore("user", { keyPath: "email" });

    objectStore.createIndex("fname", "fname", { unique: false });
    objectStore.createIndex("lname", "lname", { unique: false });
    objectStore.createIndex("pwd", "pwd", { unique: false });
    objectStore.createIndex("phone", "phone", { unique: false });
    objectStore.createIndex("birthday", "birthday", { unique: false });
    objectStore.createIndex("birthmonth", "birthmonth", { unique: false });
    objectStore.createIndex("birthyear", "birthyear", { unique: false });
    objectStore.createIndex("gender", "gender", { unique: false });
    objectStore.createIndex("address", "address", { unique: false });

    objectStore = db.createObjectStore("appointment", { keyPath: "id", autoIncrement: true });

	objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("service", "service", { unique: false });
    objectStore.createIndex("date", "date", { unique: false });
    objectStore.createIndex("comment", "comment", { unique: false });

    };
	console.log("init done");
}

const signUp = e => {
	let gender = document.getElementById('male').checked ? "Male" : document.getElementById('female').checked ? "Female" : "Not Specified"
	let formData = {
	fname: document.getElementById('fname').value,
	lname: document.getElementById('lname').value,
	email: document.getElementById('registerEmail').value,
	pwd: document.getElementById('registerPassword').value,
	phone: document.getElementById('phone').value,
    birthday: document.getElementById('birthday').value,
    birthmonth: document.getElementById('birthmonth').value,
    birthyear: document.getElementById('birthyear').value,
    gender: gender,
    address: document.getElementById('address').value + ", " + document.getElementById('city').value + ", " + document.getElementById('province').value,
     }

	let transaction = db.transaction(["user"], "readwrite");
	console.log("transaction start");
	transaction.oncomplete = function() {
		cleardata();
		console.log("transaction done");
	};

    let objectStore = transaction.objectStore("user");

    // Make a request to add our newItem object to the object store
    objectStore.add(formData);
    console.log("objectStore add done");
}

const login = e => {
	let email = document.getElementById('email').value;
	let pwd = document.getElementById('password').value;

	let objectStore = db.transaction('user').objectStore("user");

	objectStore.openCursor().onsuccess = function(event) {
	  let cursor = event.target.result;
		// if there is still another cursor to go, keep runing this code
		if(cursor) {
		  if(cursor.value.email == email && cursor.value.pwd == pwd){
			localStorage.setItem('lawCareCurrentUser', email);
			window.location.href = "myaccount.html";
		  }
		  cursor.continue();
		// if there are no more cursor items to iterate through, say so, and exit the function
		} else {
		  console.log("user not found");
		}
	  }
}

window.onload = init

const bookAppointment = () => {
	let formData = {
	email: localStorage.getItem('lawCareCurrentUser'),
	service: document.getElementById('service').value,
	date: document.getElementById('appt_date').value,
    comment: document.getElementById('comment').value,
     }

	let transaction = db.transaction(["appointment"], "readwrite");
	transaction.oncomplete = function() {
		loadAppointment();
		console.log("transaction done");
	};

    let objectStore = transaction.objectStore("appointment");

    // Make a request to add our newItem object to the object store
    objectStore.add(formData);
    console.log("objectStore add done");
}
const loadAppointment = () => {
	let email = localStorage.getItem('lawCareCurrentUser');
	let objectStore = db.transaction('appointment').objectStore("appointment");
	let bookedApptList = document.getElementById('bookedApptList');
	bookedApptList.innerHTML = ""

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	objectStore.openCursor().onsuccess = function(event) {
	  let cursor = event.target.result;
		// if there is still another cursor to go, keep runing this code

		if(cursor) {
		  if(cursor.value.email == email){
			let bookedApptBlock = document.createElement("div");
			bookedApptBlock.className = "bookedAppt-block";
			let canCancel = cursor.value.date > today
			bookedApptBlock.innerHTML = '<div><b>Service Name:</b> '+cursor.value.service+'</div> '+
						'<div><b>Appoinment date:</b> '+cursor.value.date+'</div>'+
						'<div><b>Deatil:</b> '+cursor.value.comment+'</div>';

			if(canCancel){
				bookedApptBlock.innerHTML = bookedApptBlock.innerHTML + '<input type="button" value="Cancel Appointment" onclick="cancelAppointment('+cursor.value.id+')"></button>'
			}
			bookedApptList.appendChild(bookedApptBlock)
		  }
		  cursor.continue();
		// if there are no more cursor items to iterate through, say so, and exit the function
		} else if(bookedApptList.innerHTML == ""){
			bookedApptList.innerHTML = "<div><b>No Appointment found.</b></div>"
		  console.log("no record found");
		}
	  }
}

const cancelAppointment = id => {
	let transaction = db.transaction(["appointment"], "readwrite");
    let objectStore = transaction.objectStore("appointment");
    let request = objectStore.delete(id);

    transaction.oncomplete = () => { loadAppointment(); };
}
const displayUser = e => {
	let email = localStorage.getItem('lawCareCurrentUser');
	let objectStore = db.transaction('user').objectStore("user");

	objectStore.openCursor().onsuccess = function(event) {
	  let cursor = event.target.result;
		// if there is still another cursor to go, keep runing this code
		if(cursor) {
		  if(cursor.value.email == email){
			document.getElementById('fname').textContent = cursor.value.fname
			document.getElementById('welcomfname').textContent = cursor.value.fname
			document.getElementById('lname').textContent = cursor.value.lname
			document.getElementById('phone').textContent = cursor.value.phone
			document.getElementById('gender').textContent = cursor.value.gender
			document.getElementById('email').textContent = cursor.value.email
			return
		  }
		  cursor.continue();
		// if there are no more cursor items to iterate through, say so, and exit the function
		} else {
		  console.log("user not found");
		  window.location.href = "login.html";
		}
	  }
}

const logout = () =>{
localStorage.setItem('lawCareCurrentUser', '');
window.location.href = "login.html";
}