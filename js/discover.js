
function getPublication(){
	
	var requestPublication = new XMLHttpRequest(); //creando objeto 
	requestPublication.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responsePublication = this.responseText;
			displayPublication(JSON.parse(responsePublication));
		}
	}
	requestPublication.open('GET','https://timberhut-api.herokuapp.com/v1/publications',true);
	requestPublication.send();
}

function displayPublication(dataPublication){

	//let publication=dataPublication;
	
	console.log(dataPublication);

	var divMain=document.getElementById("info");
		
	for(var publication of dataPublication){
		

		let main=document.createElement("main");
		
		let divPost=document.createElement("div");
		let divContentPost=document.createElement("div");
		let divContentImg=document.createElement("div");
		let img=document.createElement("img");
		let h2=document.createElement("h2");
		let a=document.createElement("a");
		let button=document.createElement("button");

		h2.innerText=publication.name;
		img.src=publication.photo;
		img.id="publication__img";
		a.innerText=publication.link;
		a.setAttribute('href',publication.link);
		button.innerText="Ir a publicación";
		let idPublication = publication.id;
		console.log(publication.id)
		button.onclick=function(){
			localStorage.setItem('idPublication', idPublication);
			window.location.href="./publication.html";
		}
		
		button.classList.add("btn");
		button.classList.add("btn-primary");
		button.id="btnPrimary";
		main.classList.add("informacion");
		divPost.classList.add("post");
		divContentPost.classList.add("content-post");
		divContentImg.classList.add("img-content");
		h2.classList.add("publication__h2--title");


		//main.appendChild(h2Title);
		//main.appendChild(divPost);
		divMain.appendChild(divPost);
		divPost.appendChild(divContentPost);
		divContentPost.appendChild(divContentImg);
		divContentPost.appendChild(h2);
		divContentPost.appendChild(a);
		divContentPost.appendChild(button);
		divContentImg.appendChild(img);


		console.log(publication);
	

	}

}