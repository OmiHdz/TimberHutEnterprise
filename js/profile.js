var idUser =  localStorage.getItem('id');

getProfile();
function getProfile(){
	var requestProfile = new XMLHttpRequest(); //creando objeto 
	requestProfile.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responseProfile = this.responseText;
			displayProfile(JSON.parse(responseProfile));
		}
	}
	requestProfile.open('GET','https://timberhut-api.herokuapp.com/v1/users/'+ idUser,true);
	requestProfile.send();

}

function displayProfile(dataUser){
	console.log(dataUser);
	let userName = document.getElementById("userName");
	let nameU = document.getElementById("nameU");
	let lastName = document.getElementById("lastName");
	let email = document.getElementById("email");
	let imagen = document.getElementById("img_profile");
	let userSport = document.getElementById("userSport");
	let description = document.getElementById("editar-description");

	userName.innerText = dataUser.userName;
	nameU.innerText = dataUser.name;
	lastName.innerText = dataUser.lastName;
	email.innerText = dataUser.email;
	imagen.src = dataUser.profilePic;
	description.innerText = dataUser.description;

	
	for(sport of dataUser.sport){
		
		let listSport = document.createElement("li");
		listSport.innerText = sport.nameSport;
		userSport.appendChild(listSport);
	}
}
