//var idUser = localStorage.getItem('id');
idUser=1;

loadUserSport();

function loadUserSport(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200) {
		var response = this.responseText;
		saveLocalStorage(JSON.parse(response));
		}	
	}
	request.open("GET", "http://localhost:8080/v1/users/"+idUser+"/sports",true);
	request.send();
}

function saveLocalStorage(userSports){
	let idSports = [];
	for(let i in userSports){
	    idSports.push(userSports[i].idSport);
	    getPublication(userSports[i].idSport);
	}
	localStorage.setItem('idSport', idSports);
}

function getPublication(idSport){
	var requestPublication = new XMLHttpRequest(); //creando objeto 
	requestPublication.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responsePublication = this.responseText;
				displayPublication(JSON.parse(responsePublication));
		}
	}
	requestPublication.open('GET','http://localhost:8080/v1/publications/sport?idSport=' + idSport,true);
	requestPublication.send();
}

function displayPublication(dataPublication){

	//let publication=dataPublication;
	
	console.log(dataPublication);

	var divMain=document.getElementById("publications");
		
	for(var publication of dataPublication){
		
		let divContentPost=document.createElement("div");
		let divContentImg=document.createElement("div");
		let divTextPost=document.createElement("div");
		let img=document.createElement("img");
		let h4=document.createElement("h4");
		let p=document.createElement("p");
		let button=document.createElement("button");


		img.src=publication.photo;
		h4.innerText=publication.name;
		p.innerText=publication.nameSport;
		button.innerText="Ir a publicación";

		button.onclick=function(){
			localStorage.setItem('idPublication', publication.id);
			window.location.href="./publication.html";
		}


		button.classList.add("btn");
		button.classList.add("btn-primary");
		button.id="btnPrimary";
		divContentPost.classList.add("content-post");
		divContentImg.classList.add("img-content");
		h4.classList.add("mt-0");
		p.classList.add("desc");
		p.classList.add("contenido-letra");
		divTextPost.classList.add("text-post");
		//publication.nameSport=publication.nameSport.replace(/ /g,"");
		//divContentPost.classList.add(publication.nameSport);

		divContentImg.appendChild(img);
		divContentPost.appendChild(divContentImg);
		divTextPost.appendChild(h4);
		divTextPost.appendChild(p);
		divContentPost.appendChild(divTextPost);
		divTextPost.appendChild(button);
		divMain.appendChild(divContentPost);
	}

}