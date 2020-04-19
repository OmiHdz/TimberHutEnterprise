var idUser = localStorage.getItem('id');
let img = document.getElementById("publication__img");
var formSport = document.getElementById("form");
var nameUser = document.getElementById("exampleModalLabel");
var description = document.getElementById("descriptionUser");
formSport.onsubmit = sendUserSport;

function sendDataUser(){
	let fileInput = document.getElementById("img_profile");
	let imgSource = "";
	var formdata = new FormData();
	formdata.append("description", description.value);
	formdata.append("file", fileInput.files[0], fileInput.files[0].name);

	var requestOptions = {
		method: 'PUT',
  		body: formdata,
  		redirect: 'follow'
	};

	fetch("https://timberhut-api.herokuapp.com/v1/users/" + idUser, requestOptions)
	  .then(response => response.text())
	  .then(result => saveData(JSON.parse(result)))	
	  .catch(error => console.log('error', error));
}

function saveData(dataUser){
	img.src = dataUser.profilePic;
	nameUser = dataUser.userName;
}

function sendDataUserSport(idSport){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 201){
		}
	}
	request.open("POST","https://timberhut-api.herokuapp.com/v1/userSport" ,true);
	request.setRequestHeader("Content-Type","application/json");
	var data = {
		idUser: idUser,
		idSport: idSport
	}
	request.send(JSON.stringify(data));
}

function sendUserSport(e){
	e.preventDefault();
	let idSportsStorage=[];
	for(let i in formSport.sport){
		if(formSport.sport[i].checked){
			sendDataUserSport(formSport.sport[i].value);
		}
	}
	showDialog();
}

function showDialog(){
	let modalText = document.getElementById("exampleModalLabel");
	let btnOk = document.getElementById("btn-ok");
	
	btnOk.onclick = function(){
		window.location.href="./dashboard.html";;
	}

	modalText.innerText = "Bienvenido " + nameUser;
	$("#modal").modal();
}