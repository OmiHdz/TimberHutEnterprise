var userName = document.getElementById("InputName");
var lastName = document.getElementById("InputLastName");
var email = document.getElementById("InputEmail");
var nickName = document.getElementById("InputUser");
var password = document.getElementById("InputPassword");
var form = document.getElementById("form");
	
form.onsubmit = sendDataUser;


function sendDataUser(e){
	e.preventDefault();
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 201){
		var response = this.responseText;
		saveLocalStorage(JSON.parse(response).id);
		}
	}
		var data = {
			name: userName.value,
			lastName: lastName.value,
			userName: nickName.value,
			email: email.value,
			password: password.value,
		}
	request.open('POST',"https://timberhut-api.herokuapp.com/v1/users" ,true);
	request.setRequestHeader("Content-Type","application/json");
	request.send(JSON.stringify(data));
}

function saveLocalStorage(id){
	    localStorage.setItem('id', id);
	    window.location.href="./register2.html";
}