//obten los datos desde dom
var email = document.getElementById("InputUser");
var password = document.getElementById("InputPassword");
var form = document.getElementById("form-login");
var userName = document.getElementById("InputName");


form.onsubmit = sendDataLogin;

function sendDataLogin(e){
	e.preventDefault();
	
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		var response = this.responseText;
		saveLocalStorage(JSON.parse(response));
		console.log(JSON.parse(response));
		}
		if(this.readyState == 4 && this.status == 406){
			showError();
		}
	}
		var data = {
			email:email.value,
			password: password.value,
		}
	request.open('POST',"https://timberhut-api.herokuapp.com/v1/users/login" ,true);
	request.setRequestHeader("Content-Type","application/json");
	request.send(JSON.stringify(data));

}


function saveLocalStorage(idUser){
		console.log(JSON.parse(idUser));
	    showDialog();
	    localStorage.setItem('id', idUser);
	    

}

function showDialog(){
	let modalText = document.getElementById("exampleModalLabel");
	let btnOk = document.getElementById("btn-ok");
	let show = document.getElementById("show-publication");
	btnOk.onclick = function(){
		window.location.href="./dashboard.html";
	}

	modalText.innerText = "Bienvenido ";
	show.innerText= "Ingresaste con éxito";
	$("#modal").modal();
}

function showError(){
	let modalText = document.getElementById("exampleModalLabel");
	let btnOk = document.getElementById("btn-ok");
	
	btnOk.onclick = function(){
		window.location.href="./login.html";
	}

	modalText.innerText = "Usuario/Contraseña incorrecta ";
	$("#modal").modal();
}